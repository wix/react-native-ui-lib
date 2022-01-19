import _ from 'lodash';
import React, {Component} from 'react';
import {NativeModules, StyleSheet, ViewStyle, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData, findNodeHandle, ScrollView, ScrollViewProps, TextInputProps as RNTextInputProps} from 'react-native';
import {Colors, BorderRadiuses, ThemeManager, Typography, Spacings} from '../../style';
import Assets from '../../assets';
import {LogService} from '../../services';
import {Constants, asBaseComponent, BaseComponentInjectedProps, TypographyModifiers} from '../../commons/new';
// @ts-expect-error
import {TextField} from '../inputs';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import Text from '../text';
import Chip, {ChipProps} from '../chip';
import Icon from '../icon';
import {getValidationBasedColor, getCounterTextColor, getCounterText, getChipDismissColor, isDisabled} from './Presenter';
import {TextFieldProps} from '../../../typings/components/Inputs';

// TODO: support updating tags externally
// TODO: support char array as tag creators (like comma)
// TODO: add notes to Docs about the Android fix for onKeyPress

type ChipType = string | boolean | any;
export type ChipsInputChipProps = ChipProps & {invalid?: boolean}

export type ChipsInputProps = TypographyModifiers & TextFieldProps & {
  /**
  * DEPRECATED: use chips instead. list of tags. can be string boolean or custom object when implementing getLabel
  */
  tags?: ChipType[];
  /**
  * list of tags. can be string boolean or custom object when implementing getLabel
  */
  chips?: ChipsInputChipProps[];
  /** 
   * Style your chips
   */
  defaultChipProps?: ChipsInputChipProps;
  /**
   * callback for extracting the label out of the tag item
   */
  getLabel?: (tag: ChipType) => any;
  /**
   * DEPRECATED: use chips instead. callback for custom rendering tag item
   */
  renderTag?: (tag: ChipType, index: number, shouldMarkTag: boolean, label: string) => React.ReactElement;
  /**
   * callback for onChangeTags event
   */
  onChangeTags?: () => void;
  /**
   * DEPRECATED: use chips instead. callback for creating new tag out of input value (good for composing tag object)
   */
  onCreateTag?: (value: any) => void;
  /**
   * DEPRECATED: use chips instead. callback for when pressing a tag in the following format (tagIndex, markedTagIndex) => {...}
   */
  onTagPress?: (index: number, toRemove?: number) => void;
  /**
   * validation message error appears when tag isn't validate
   */
  validationErrorMessage?: string;
  /**
   * if true, tags *removal* Ux won't be available
   */
  disableTagRemoval?: boolean;
  /**
   * if true, tags *adding* Ux (i.e. by 'submitting' the input text) won't be available
   */
  disableTagAdding?: boolean;
  /**
   * custom styling for the component container
   */
  containerStyle?: ViewStyle;
  /**
   * custom styling for the tag item
   */
  tagStyle?: ViewStyle;
  /**
   * custom styling for the text input
   */
  inputStyle?: RNTextInputProps['style'];
  /**
   * should hide input underline
   */
  hideUnderline?: boolean;
  /**
   *  Maximum numbers of chips 
   */
  maxLength?: number;
  /** 
   * Chips with maxHeigh is inside a scrollView 
   */
  scrollViewProps?: ScrollViewProps;
  /** 
   * Chips inside a ScrollView 
   */
  maxHeight?: number;
  /**
   * Custom element before the chips, for example 'search' icon, 'To:' label etc' 
   */
  leftElement?: JSX.Element | JSX.Element[];

  value?: any;

  selectionColor?: string | number;
}

type State = {
  value: any;
  chips: Array<ChipType>;
  chipIndexToRemove?: number;
  initialChips?: Array<ChipType>;
  isFocused: boolean;
}

const GUTTER_SPACING = 8;

type OwnProps = ChipsInputProps & BaseComponentInjectedProps;

/**
 * @description: Chips input component
 * @modifiers: Typography
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ChipsInput/ChipsInput.gif?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ChipsInputScreen.tsx
 * @extends: TextField
 */
class ChipsInput extends Component<OwnProps, State> {
  static displayName = 'ChipsInput';

  static onChangeTagsActions = {
    ADDED: 'added',
    REMOVED: 'removed'
  };
  
  input = React.createRef<TextInput>();
  scrollRef = React.createRef<ScrollView>();

  constructor(props: OwnProps) {
    super(props);

    this.state = {
      value: props.value,
      chips: _.cloneDeep(props.tags || props.chips) || [],
      chipIndexToRemove: undefined,
      initialChips: props.tags || props.chips,
      isFocused: this.input.current?.isFocused() || false
    };

    LogService.componentDeprecationWarn({oldComponent: 'ChipsInput', newComponent: 'Incubator.ChipsInput'});
  }

  componentDidMount() {
    if (Constants.isAndroid) {
      const textInputHandle = findNodeHandle(this.input.current);
      if (textInputHandle && NativeModules.TextInputDelKeyHandler) {
        NativeModules.TextInputDelKeyHandler.register(textInputHandle);
      }
    }
  }

  static getDerivedStateFromProps(nextProps: Readonly<OwnProps>, prevState: State) {
    const {tags, chips} = nextProps;
    if (tags && tags !== prevState.initialChips || chips && chips !== prevState.initialChips) {
      return {
        initialChips: nextProps.tags || nextProps.chips,
        chips: nextProps.tags || nextProps.chips
      };
    }
    return null;
  }

  addTag = () => {
    const {onCreateTag, disableTagAdding, maxLength, chips: chipsProps} = this.props;
    const {value, chips} = this.state;
    
    if (this.scrollRef?.current?.scrollToEnd) {
      this.scrollRef?.current?.scrollToEnd();
    }

    if (disableTagAdding) {
      return;
    }
    if (_.isNil(value) || _.isEmpty(value.trim())) {
      return;
    }

    if (maxLength && this.state.chips.length >= maxLength) {
      this.setState({value: ''});
      return;
    }

    const newChip = _.isFunction(onCreateTag) ? onCreateTag(value) : chipsProps ? {label: value} : value;
    const newChips = [...chips, newChip];

    this.setState({
      value: '',
      chips: newChips
    });

    _.invoke(this.props, 'onChangeTags', newChips, ChipsInput.onChangeTagsActions.ADDED, newChip);
    this.clear();
  }

  removeMarkedTag() {
    const {chips, chipIndexToRemove} = this.state;

    if (!_.isUndefined(chipIndexToRemove)) {
      const removedTag = chips[chipIndexToRemove];

      chips.splice(chipIndexToRemove, 1);
      this.setState({
        chips,
        chipIndexToRemove: undefined
      });

      _.invoke(this.props, 'onChangeTags', chips, ChipsInput.onChangeTagsActions.REMOVED, removedTag);
    }
  }

  markTagIndex = (chipIndex: number) => {
    this.setState({chipIndexToRemove: chipIndex});
  }

  onChangeText = _.debounce((value) => {
    this.setState({value, chipIndexToRemove: undefined});
    _.invoke(this.props, 'onChangeText', value);
  }, 0);

  onTagPress(index: number) {
    const {onTagPress} = this.props;
    const {chipIndexToRemove} = this.state;

    // custom press handler
    if (onTagPress) {
      onTagPress(index, chipIndexToRemove);
      return;
    }

    // default press handler
    if (chipIndexToRemove === index) {
      this.removeMarkedTag();
    } else {
      this.markTagIndex(index);
    }
  }

  isLastTagMarked() {
    const {chips, chipIndexToRemove} = this.state;
    const tagsCount = _.size(chips);
    const isLastTagMarked = chipIndexToRemove === tagsCount - 1;

    return isLastTagMarked;
  }

  removeTag = () => {
    const {value, chips, chipIndexToRemove} = this.state;
    const tagsCount = _.size(chips);
    const hasNoValue = _.isEmpty(value);
    const hasTags = tagsCount > 0;

    const {disableTagRemoval} = this.props;
    if (disableTagRemoval) {
      return;
    }
    
    if (hasNoValue && hasTags && _.isUndefined(chipIndexToRemove)) {
      this.setState({
        chipIndexToRemove: tagsCount - 1
      });
    } else if (!_.isUndefined(chipIndexToRemove)) {
      this.removeMarkedTag();
    }
  }

  onKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    _.invoke(this.props, 'onKeyPress', event);

    const keyCode = _.get(event, 'nativeEvent.key');
    const pressedBackspace = keyCode === Constants.backspaceKey;

    if (pressedBackspace) {
      this.removeTag();
    }
  }

  getLabel = (item: ChipType) => {
    const {getLabel} = this.props;

    if (getLabel) {
      return getLabel(item);
    }
    if (_.isString(item)) {
      return item;
    }
    return _.get(item, 'label');
  }

  onFocus = () => {
    this.setState({isFocused: true});
  }

  onBlur = () => {
    this.setState({isFocused: false});
  }

  renderLabel(tag: ChipType, shouldMarkTag: boolean) {	
    const {typography} = this.props.modifiers;
    const label = this.getLabel(tag);

    return (
      <View row centerV>
        {shouldMarkTag && (
          <Icon
            style={[styles.removeIcon, tag.invalid && styles.basicTagStyle && styles.invalidTagRemoveIcon]}
            source={Assets.icons.x}
          />)
        }
        <Text
          style={[tag.invalid ? (shouldMarkTag ? styles.errorMessageWhileMarked : styles.errorMessage)
            : styles.tagLabel, typography]} accessibilityLabel={`${label} tag`}
        >
          {!tag.invalid && shouldMarkTag ? 'Remove' : label}
        </Text>
      </View>
    );
  }

  renderTag = (tag: ChipType, index: number) => {
    const {tagStyle, renderTag} = this.props;
    const {chipIndexToRemove} = this.state;
    const shouldMarkTag = chipIndexToRemove === index;
    const markedTagStyle = tag.invalid ? styles.invalidMarkedTag : styles.tagMarked;
    const defaultTagStyle = tag.invalid ? styles.invalidTag : styles.tag;

    if (_.isFunction(renderTag)) {
      return renderTag(tag, index, shouldMarkTag, this.getLabel(tag));
    }

    return (
      <View key={index} style={[defaultTagStyle, tagStyle, basicTagStyle, shouldMarkTag && markedTagStyle]}>
        {this.renderLabel(tag, shouldMarkTag)}
      </View>
    );
  }

  renderTagWrapper = (tag: ChipType, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={1}
        onPress={() => this.onTagPress(index)}
        accessibilityHint={!this.props.disableTagRemoval ? 'tap twice for remove tag mode' : undefined}
      >
        {this.renderTag(tag, index)}
      </TouchableOpacity>
    );
  }

  renderNewChip = () => {
    const {defaultChipProps} = this.props;
    const {chipIndexToRemove, chips} = this.state;
    const disabled = isDisabled(this.props);

    return _.map(chips, (chip, index) => {
      const selected = chipIndexToRemove === index;
      const dismissColor = getChipDismissColor(chip, selected, defaultChipProps);
      return (
        <View center flexS marginT-2 marginB-2>
          <Chip
            key={index}
            containerStyle={[styles.tag, chip.invalid && styles.invalidTag]}
            labelStyle={[
              styles.tagLabel,
              chip.invalid && styles.errorMessage,
              selected && !!chip.invalid && styles.errorMessageWhileMarked
            ]}
            {...chip}
            {...defaultChipProps}
            disabled={disabled}
            marginR-s2
            marginT-2
            left={Assets.icons.x}
            onPress={_ => this.onTagPress(index)}
            onDismiss={selected ? () => this.onTagPress(index) : undefined}
            dismissColor={dismissColor}
            dismissIcon={Assets.icons.xSmall}
            dismissIconStyle={styles.dismissIconStyle}
          />
        </View>
      );
    });
  }

  renderTitleText = () => {
    const {title, defaultChipProps} = this.props;
    const color = this.state.isFocused ? getValidationBasedColor(this.state.chips, defaultChipProps) : Colors.grey30;
    return title && (
      <Text text70L color={color}>{title}</Text>
    );
  };

  renderChips = () => {
    const {disableTagRemoval, chips: chipsProps} = this.props;
    const {chips} = this.state;
    const renderFunction = disableTagRemoval ? this.renderTag : this.renderTagWrapper;

    if (chipsProps) {
      return this.renderNewChip();
    } else {
      // The old way of creating the 'Chip' internally 
      return _.map(chips, (tag, index) => {
        return (
          <View>
            {renderFunction(tag, index)}
          </View>
        );
      });
    }
  }

  renderCharCounter() {
    const {maxLength} = this.props;
    const counter = this.state.chips.length;
    

    if (maxLength) {
      const color = getCounterTextColor(this.state.chips, this.props);
      const counterText = getCounterText(counter, maxLength);

      return (
        <Text
          color={color}
          style={styles.label}
          accessibilityLabel={`${counter} out of ${maxLength} max chips`}
        >
          {counterText}
        </Text>
      );
    }
  }

  renderUnderline = () => {
    const {isFocused, chips} = this.state;
    const {defaultChipProps} = this.props;
    const color = getValidationBasedColor(chips, defaultChipProps);
    return <View height={1} marginT-10 backgroundColor={isFocused ? color : Colors.grey50}/>;
  }

  renderTextInput() {
    const {inputStyle, selectionColor, title, ...others} = this.props;
    const {value} = this.state;
    const isLastTagMarked = this.isLastTagMarked();

    return (
      <View style={styles.inputWrapper}>
        <TextField
          ref={this.input}
          text80
          blurOnSubmit={false}
          {...others}
          maxLength={undefined}
          title={this.props.chips ? undefined : title}
          value={value}
          onSubmitEditing={this.addTag}
          onChangeText={this.onChangeText}
          onKeyPress={this.onKeyPress}
          enableErrors={false}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          hideUnderline
          selectionColor={isLastTagMarked ? 'transparent' : selectionColor}
          style={[inputStyle, styles.alignTextCenter]}
          containerStyle={{flexGrow: 0}}
          collapsable={false}
          accessibilityHint={
            !this.props.disableTagRemoval ? 'press keyboard delete button to remove last tag' : undefined
          }
        />
      </View>
    );
  }

  renderChipsContainer = () => {
    const {maxHeight, scrollViewProps} = this.props;
    const Container = maxHeight ? ScrollView : View;
    return (
      <Container
        ref={this.scrollRef}
        showsVerticalScrollIndicator={false}
        style={!maxHeight && styles.tagsList}
        contentContainerStyle={styles.tagsList}
        {...scrollViewProps}
      >
        {this.renderChips()}
        {this.renderTextInput()}
      </Container>
    );
  }
  
  render() {
    const {containerStyle, hideUnderline, validationErrorMessage, leftElement, maxHeight, chips} = this.props;
    const {chipIndexToRemove} = this.state;

    return (
      <View style={[!hideUnderline && styles.withUnderline, containerStyle]}>
        {!!chips && this.renderTitleText()}
        <View style={[styles.tagListContainer, {maxHeight}]}>
          {leftElement}
          {this.renderChipsContainer()}
        </View>
        {!hideUnderline && this.renderUnderline()}
        {this.renderCharCounter()}
        {validationErrorMessage ?
          (
            <View>
              <Text style={[styles.errorMessage, !!chipIndexToRemove && styles.errorMessageWhileMarked]}>
                {validationErrorMessage}
              </Text>
            </View>
          ) : null}
      </View>
    );
  }

  blur() {
    this.input.current?.blur();
  }

  focus() {
    this.input.current?.focus();
  }

  clear() {
    this.input.current?.clear();
  }
}

export {ChipsInput}; // For tests
export default asBaseComponent<ChipsInputProps, typeof ChipsInput>(ChipsInput);


const basicTagStyle = {
  borderRadius: BorderRadiuses.br100,
  paddingVertical: 4.5,
  paddingHorizontal: 12,
  marginRight: GUTTER_SPACING,
  marginVertical: GUTTER_SPACING / 2
};

const styles = StyleSheet.create({
  withUnderline: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor
  },
  tagsList: {
    minHeight: 38,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tagListContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  inputWrapper: {
    flexGrow: 1,
    minWidth: 120,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  tag: {
    borderWidth: 0,
    paddingVertical: 5,
    backgroundColor: Colors.primary
  },
  invalidTag: {
    borderWidth: 1,
    borderColor: Colors.red30,
    backgroundColor: 'transparent'
  },
  basicTagStyle: {
    ...basicTagStyle
  },
  invalidMarkedTag: {
    borderColor: Colors.red10
  },
  tagMarked: {
    backgroundColor: Colors.grey10
  },
  dismissIconStyle: {
    width: 10, 
    height: 10, 
    marginRight: Spacings.s1
  },
  removeIcon: {
    tintColor: Colors.white,
    width: 10,
    height: 10,
    marginRight: 6
  },
  invalidTagRemoveIcon: {
    tintColor: Colors.red10
  },
  tagLabel: {
    ...Typography.text80,
    color: Colors.white
  },
  errorMessage: {
    ...Typography.text80,
    color: Colors.red30
  },
  errorMessageWhileMarked: {
    color: Colors.red10
  },
  label: {
    marginTop: Spacings.s1,
    alignSelf: 'flex-end',
    height: Typography.text80?.lineHeight,
    ...Typography.text80
  },
  alignTextCenter: {
    textAlignVertical: 'center'
  }
});
