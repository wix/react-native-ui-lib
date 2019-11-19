import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated, TextInput as RNTextInput} from 'react-native';
import {Constants} from '../../helpers';
import {Colors, Typography} from '../../style';
import BaseInput from './BaseInput';
import {Modal} from '../../screensComponents';
import TextArea from './TextArea';
import View from '../view';
import Image from '../image';
import Text from '../text';
import TouchableOpacity from '../touchableOpacity';

const DEFAULT_COLOR_BY_STATE = {
  default: Colors.dark40,
  focus: Colors.blue30,
  error: Colors.red30
};
const DEFAULT_UNDERLINE_COLOR_BY_STATE = {
  default: Colors.dark70,
  focus: Colors.blue30,
  error: Colors.red30
};
const LABEL_TYPOGRAPHY = Typography.text80;
const ICON_SIZE = 24;
const ICON_RIGHT_PADDING = 3;
const ICON_LEFT_PADDING = 6;

/**
 * @description: A wrapper for TextInput component with extra functionality like floating placeholder
 * @modifiers: Typography
 * @extends: TextInput
 * @extendslink: https://facebook.github.io/react-native/docs/textinput.html
 * @gif: https://media.giphy.com/media/xULW8su8Cs5Z9Fq4PS/giphy.gif, https://media.giphy.com/media/3ohc1dhDcLS9FvWLJu/giphy.gif, https://media.giphy.com/media/oNUSOxnHdMP5ZnKYsh/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/InputsScreen.js
 */
export default class TextField extends BaseInput {
  static displayName = 'TextField';

  static propTypes = {
    ...RNTextInput.propTypes,
    ...BaseInput.propTypes,
    /**
     * should placeholder have floating behavior
     */
    floatingPlaceholder: PropTypes.bool,
    /**
     * floating placeholder color as a string or object of states, ex. {default: 'black', error: 'red', focus: 'blue'}
     */
    floatingPlaceholderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * This text will appear as a placeholder when the textInput becomes focused, only when passing floatingPlaceholder
     * as well (NOT for expandable textInputs)
     */
    helperText: PropTypes.string,
    /**
     * hide text input underline, by default false
     */
    hideUnderline: PropTypes.bool,
    /**
     * underline color as a string or object of states, ex. {default: 'black', error: 'red', focus: 'blue'}
     */
    underlineColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * the color of all text when the input is disabled (if undefined will not apply color)
     */
    disabledColor: PropTypes.string,
    /**
     * should text input be align to center
     */
    centered: PropTypes.bool,
    /**
     * input error message, should be empty if no error exists
     */
    error: PropTypes.string,
    /**
     * should the input component support error messages
     */
    enableErrors: PropTypes.bool,
    /**
     * should the input expand to another text area modal
     */
    expandable: PropTypes.bool,
    /**
     * Render custom expandable input (requires expandable to be true)
     */
    renderExpandableInput: PropTypes.func,
    /**
     * allow custom rendering of expandable content when clicking on the input (useful for pickers)
     * accept props and state as params, ex. (props, state) => {...}
     * use toggleExpandableModal(false) method to toggle off the expandable content
     */
    renderExpandable: PropTypes.func,
    /**
     * Callback for the modal toggle. Pass with renderExpandable to control the modal toggle
     */
    onToggleExpandableModal: PropTypes.func,
    /**
     * The picker modal top bar props
     */
    topBarProps: PropTypes.shape(Modal.TopBar.propTypes),
    /**
     * transform function executed on value and return transformed value
     */
    transformer: PropTypes.func,
    /**
     * Fixed title that will displayed above the input (note: floatingPlaceholder MUST be 'false')
     */
    title: PropTypes.string,
    /**
     * The title's color as a string or object of states, ex. {default: 'black', error: 'red', focus: 'blue'}
     */
    titleColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * Additional styles for the title (not including 'color')
     */
    titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * should the input display a character counter (only when passing 'maxLength')
     */
    showCharacterCounter: PropTypes.bool,
    /**
     * should float the placeholder when focused (instead of when typing)
     */
    floatOnFocus: PropTypes.bool,
    /**
     * should the errors be displayed at the top
     */
    useTopErrors: PropTypes.bool,
    /**
     * Icon asset source for showing on the right side, appropriate for dropdown icon and such
     */
    rightIconSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Props for the right button {iconSource, onPress, style}
     */
    rightButtonProps: PropTypes.shape({
      iconSource: PropTypes.number,
      iconColor: PropTypes.string,
      onPress: PropTypes.func,
      style: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    })
  };

  static defaultProps = {
    placeholderTextColor: DEFAULT_COLOR_BY_STATE.default,
    enableErrors: true,
    validateOnBlur: true
  };

  constructor(props) {
    super(props);

    this.updateFloatingPlaceholderState = this.updateFloatingPlaceholderState.bind(this);
    this.toggleExpandableModal = this.toggleExpandableModal.bind(this);

    this.state = {
      ...this.state,
      value: props.value, // for floatingPlaceholder functionality
      floatingPlaceholderState: new Animated.Value(this.shouldFloatPlaceholder(props.value) ? 1 : 0),
      showExpandableModal: false
    };

    this.generatePropsWarnings(props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({value: nextProps.value}, this.updateFloatingPlaceholderState);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value || prevProps.focused !== this.state.focused) {
      this.updateFloatingPlaceholderState();
    }
  }

  /** Actions */
  generatePropsWarnings(props) {
    if (props.maxLength === 0) {
      console.warn('Setting maxLength to zero will block typing in this input');
    }
    if (props.showCharacterCounter && !props.maxLength) {
      console.warn('In order to use showCharacterCount please pass \'maxLength\' prop');
    }
  }

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  toggleExpandableModal(value) {
    this.setState({showExpandableModal: value});
    _.invoke(this.props, 'onToggleExpandableModal', value);
  }

  updateFloatingPlaceholderState(withoutAnimation) {
    if (withoutAnimation) {
      this.state.floatingPlaceholderState.setValue(this.shouldFloatPlaceholder() ? 1 : 0);
    } else {
      Animated.spring(this.state.floatingPlaceholderState, {
        toValue: this.shouldFloatPlaceholder() ? 1 : 0,
        duration: 150
      }).start();
    }
  }

  getPlaceholderText() {
    // HACK: passing whitespace instead of undefined. Issue fixed in RN56
    const {placeholder, helperText} = this.props;
    const text = this.shouldFakePlaceholder()
      ? this.shouldShowHelperText()
        ? helperText
        : ' '
      : this.shouldShowTopError() && this.shouldShowHelperText()
        ? helperText
        : placeholder;
    return text;
  }

  getStateColor(colorProp, isUnderline) {
    const {focused} = this.state;
    const {disabledColor} = this.getThemeProps();
    const error = this.getErrorMessage();
    const colorByState = _.cloneDeep(isUnderline ? DEFAULT_UNDERLINE_COLOR_BY_STATE : DEFAULT_COLOR_BY_STATE);

    if (this.isDisabled() && disabledColor) {
      return disabledColor;
    }

    if (colorProp) {
      if (_.isString(colorProp)) {
        // use given color for any state
        return colorProp;
      } else if (_.isObject(colorProp)) {
        // set given colors by states
        _.merge(colorByState, colorProp);
      }
    }

    // return the right color for the current state
    let color = colorByState.default;
    if (error && isUnderline) {
      color = colorByState.error;
    } else if (focused) {
      color = colorByState.focus;
    }
    return color;
  }

  getCharCount() {
    const {value} = this.state;
    if (value) {
      return value.length;
    }
    return 0;
  }

  getTopPaddings() {
    const {floatingPlaceholder} = this.getThemeProps();
    return floatingPlaceholder ? (this.shouldShowTopError() ? undefined : 25) : undefined;
  }

  isDisabled() {
    return this.props.editable === false;
  }

  isCounterLimit() {
    const {maxLength} = this.getThemeProps();
    const counter = this.getCharCount();
    return counter === 0 ? false : maxLength <= counter;
  }

  hasText(value) {
    return !_.isEmpty(value || this.state.value);
  }

  shouldShowHelperText() {
    const {focused} = this.state;
    const {helperText} = this.props;
    return focused && helperText;
  }

  shouldFloatOnFocus() {
    const {focused} = this.state;
    const {floatOnFocus} = this.getThemeProps();
    return focused && floatOnFocus;
  }

  shouldFloatPlaceholder(text) {
    return this.hasText(text) || this.shouldShowHelperText() || this.shouldFloatOnFocus();
  }

  shouldFakePlaceholder() {
    const {floatingPlaceholder, centered} = this.getThemeProps();
    return Boolean(floatingPlaceholder && !centered && !this.shouldShowTopError());
  }

  shouldShowError() {
    const {enableErrors} = this.getThemeProps();
    const error = this.getErrorMessage();

    return enableErrors && error;
  }

  shouldShowTopError() {
    const {useTopErrors} = this.getThemeProps();
    return this.shouldShowError() && useTopErrors;
  }

  shouldDisplayRightButton() {
    const {rightButtonProps, expandable} = this.getThemeProps();
    return !expandable && rightButtonProps && rightButtonProps.iconSource;
  }

  onPressRightButton = () => {
    _.invoke(this.props, 'rightButtonProps.onPress');
  };

  /** Renders */
  renderPlaceholder() {
    const {floatingPlaceholderState} = this.state;
    const {expandable, placeholder, placeholderTextColor, floatingPlaceholderColor, multiline} = this.getThemeProps();
    const typography = this.getTypography();
    const placeholderColor = this.getStateColor(placeholderTextColor);

    if (this.shouldFakePlaceholder()) {
      return (
        <Animated.Text
          style={[
            this.styles.floatingPlaceholder,
            this.styles.placeholder,
            typography,
            {
              top: floatingPlaceholderState.interpolate({
                inputRange: [0, 1],
                outputRange: multiline && Constants.isIOS ? [30, 5] : [25, 0]
              }),
              fontSize: floatingPlaceholderState.interpolate({
                inputRange: [0, 1],
                outputRange: [typography.fontSize, LABEL_TYPOGRAPHY.fontSize]
              }),
              color: floatingPlaceholderState.interpolate({
                inputRange: [0, 1],
                outputRange: [placeholderColor, this.getStateColor(floatingPlaceholderColor)]
              }),
              lineHeight: this.shouldFloatPlaceholder() ? LABEL_TYPOGRAPHY.lineHeight : typography.lineHeight
            }
          ]}
          numberOfLines={1}
          onPress={() => expandable && this.toggleExpandableModal(true)}
          suppressHighlighting
          accessible={false}
        >
          {placeholder}
        </Animated.Text>
      );
    }
  }

  renderTitle() {
    const {floatingPlaceholder, title, titleColor, titleStyle} = this.getThemeProps();
    const color = this.getStateColor(titleColor);

    if (!floatingPlaceholder && title) {
      return <Text style={[{color}, this.styles.topLabel, this.styles.label, titleStyle]}>{title}</Text>;
    }
  }

  renderCharCounter() {
    const {focused} = this.state;
    const {maxLength, showCharacterCounter, disabledColor} = this.getThemeProps();

    if (maxLength && showCharacterCounter) {
      const counter = this.getCharCount();
      const textColor =
        this.isCounterLimit() && focused ? DEFAULT_COLOR_BY_STATE.error : DEFAULT_COLOR_BY_STATE.default;
      const color = this.isDisabled() && disabledColor ? disabledColor : textColor;

      return (
        <Text
          style={[{color}, this.styles.bottomLabel, this.styles.label]}
          accessibilityLabel={`${counter} out of ${maxLength} max characters`}
        >
          {counter} / {maxLength}
        </Text>
      );
    }
  }

  renderError(visible) {
    const {enableErrors, useTopErrors} = this.getThemeProps();
    const positionStyle = useTopErrors ? this.styles.topLabel : this.styles.bottomLabel;
    const error = this.getErrorMessage();

    if (visible && enableErrors) {
      return (
        <Text style={[this.styles.errorMessage, this.styles.label, positionStyle]} accessible={!_.isEmpty(error)}>
          {error}
        </Text>
      );
    }
  }

  renderExpandableModal() {
    const {renderExpandable, topBarProps} = this.getThemeProps();
    const {showExpandableModal} = this.state;

    if (_.isFunction(renderExpandable) && showExpandableModal) {
      return renderExpandable(this.getThemeProps(), this.state);
    }

    const textInputProps = TextField.extractOwnProps(this.props, 'error');

    return (
      <Modal
        animationType={'slide'}
        visible={showExpandableModal}
        onRequestClose={() => this.toggleExpandableModal(false)}
      >
        <Modal.TopBar
          {...topBarProps}
          onCancel={() => this.toggleExpandableModal(false)}
          onDone={this.onDoneEditingExpandableInput}
        />
        <View style={this.styles.expandableModalContent}>
          <TextArea
            ref={textarea => {
              this.expandableInput = textarea;
            }}
            {...textInputProps}
            value={this.state.value}
          />
        </View>
      </Modal>
    );
  }

  renderExpandableInput() {
    const {renderExpandableInput, testID} = this.getThemeProps();

    if (_.isFunction(renderExpandableInput)) {
      return renderExpandableInput(this.getThemeProps());
    }

    return (
      <TouchableOpacity
        style={this.styles.expandableInput}
        activeOpacity={1}
        onPress={() => !this.isDisabled() && this.toggleExpandableModal(true)}
        testID={`${testID}.expandable`}
        {...this.extractAccessibilityProps()}
      >
        {this.renderTextInput()}
      </TouchableOpacity>
    );
  }

  renderTextInput() {
    const {value} = this.state; // value set on state for floatingPlaceholder functionality
    const {
      style,
      placeholder,
      placeholderTextColor,
      floatingPlaceholder,
      multiline,
      hideUnderline,
      numberOfLines,
      expandable,
      rightIconSource,
      ...others
    } = this.getThemeProps();
    const typography = this.getTypography();
    const {lineHeight, ...typographyStyle} = typography;
    // color priority is: user's color prop, then modifiers, then theme props.
    const color = this.getStateColor(this.props.color || this.extractColorValue() || this.getThemeProps().color);
    const hasRightElement = this.shouldDisplayRightButton() || rightIconSource;
    const inputStyle = [
      hasRightElement && this.styles.rightElement,
      this.styles.input,
      hideUnderline && this.styles.inputWithoutUnderline,
      {...typographyStyle},
      Constants.isAndroid && {lineHeight},
      expandable && {maxHeight: lineHeight * (Constants.isAndroid ? 3 : 3.3)},
      Constants.isRTL && {minHeight: lineHeight + 3},
      color && {color},
      style
    ];
    const placeholderText = this.getPlaceholderText();
    const placeholderColor = this.getStateColor(placeholderTextColor);
    const shouldUseMultiline = multiline ? multiline : expandable;
    const isEditable = !this.isDisabled() && !expandable;

    return (
      <RNTextInput
        accessibilityLabel={floatingPlaceholder ? placeholder : undefined}
        {...others}
        accessibilityStates={this.isDisabled() ? ['disabled'] : undefined}
        value={value}
        placeholder={placeholderText}
        placeholderTextColor={placeholderColor}
        underlineColorAndroid="transparent"
        style={inputStyle}
        multiline={shouldUseMultiline}
        numberOfLines={numberOfLines}
        onKeyPress={this.onKeyPress}
        onChangeText={this.onChangeText}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        ref={input => {
          this.input = input;
        }}
        editable={isEditable}
        pointerEvents={expandable ? 'none' : undefined}
      />
    );
  }

  renderRightButton() {
    if (this.shouldDisplayRightButton()) {
      const {rightButtonProps} = this.getThemeProps();
      const {style, iconSource, iconColor} = rightButtonProps;

      return (
        <TouchableOpacity style={[this.styles.rightButton, style]} onPress={this.onPressRightButton}>
          <Image
            pointerEvents="none"
            source={iconSource}
            resizeMode={'contain'}
            style={[this.styles.rightButtonImage, {tintColor: iconColor || Colors.blue30}]}
          />
        </TouchableOpacity>
      );
    }
  }

  renderRightIcon() {
    const {rightIconSource} = this.getThemeProps();

    if (rightIconSource) {
      return (
        <View style={this.styles.rightIcon} pointerEvents="none">
          <Image source={rightIconSource} resizeMode={'center'} style={this.styles.rightButtonImage}/>
        </View>
      );
    }
  }

  render() {
    const {margins} = this.state;
    const {expandable, containerStyle, underlineColor, useTopErrors, hideUnderline} = this.getThemeProps();
    const underlineStateColor = this.getStateColor(underlineColor, true);

    return (
      <View style={[this.styles.container, margins, containerStyle]} collapsable={false}>
        {this.shouldShowTopError() ? this.renderError(useTopErrors) : this.renderTitle()}

        <View
          style={[
            this.styles.innerContainer,
            hideUnderline && this.styles.innerContainerWithoutUnderline,
            {borderColor: underlineStateColor},
            {paddingTop: this.getTopPaddings()}
          ]}
        >
          {this.renderPlaceholder()}
          {expandable ? this.renderExpandableInput() : this.renderTextInput()}
          {this.renderRightButton()}
          {this.renderRightIcon()}
          {expandable && this.renderExpandableModal()}
        </View>

        <View row>
          <View flex>{this.renderError(!useTopErrors)}</View>
          {this.renderCharCounter()}
        </View>
      </View>
    );
  }

  /** Events */
  onDoneEditingExpandableInput = () => {
    const expandableInputValue = _.get(this.expandableInput, 'state.value');
    this.setState({value: expandableInputValue});
    this.state.floatingPlaceholderState.setValue(expandableInputValue ? 1 : 0);
    _.invoke(this.props, 'onChangeText', expandableInputValue);
    this.toggleExpandableModal(false);
  };

  onKeyPress = event => {
    this.lastKey = event.nativeEvent.key;
    _.invoke(this.props, 'onKeyPress', event);
  };

  onChangeText = text => {
    // when character count exceeds maxLength text will be empty string.
    // HACK: To avoid setting state value to '' we check the source of that deletion
    if (text === '' && this.lastKey && this.lastKey !== 'Backspace') {
      return;
    }

    const {transformer, validateOnChange} = this.props;
    let transformedText = text;
    if (_.isFunction(transformer)) {
      transformedText = transformer(text);
    }

    _.invoke(this.props, 'onChangeText', transformedText);
    this.setState({value: transformedText}, () => {
      if (validateOnChange) {
        setImmediate(this.validate);
      }
    });
  };
}

function createStyles({placeholderTextColor, centered, multiline, expandable}) {
  const inputTextAlign = Constants.isRTL ? 'right' : 'left';

  return StyleSheet.create({
    container: {},
    innerContainer: {
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: centered ? 'center' : undefined,
      borderBottomWidth: 1,
      borderColor: Colors.dark70
    },
    innerContainerWithoutUnderline: {
      borderBottomWidth: 0
    },
    input: {
      flexGrow: 1,
      textAlign: centered ? 'center' : inputTextAlign,
      backgroundColor: 'transparent',
      marginBottom: Constants.isIOS ? 10 : 5,
      padding: 0, // for Android
      textAlignVertical: 'top', // for Android (not working)
      borderColor: 'transparent', // borderColor+borderWidth is a fix for collapsing issue on Android
      borderWidth: 1
    },
    expandableInput: {
      flexGrow: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    inputWithoutUnderline: {
      marginBottom: undefined
    },
    expandableModalContent: {
      flex: 1,
      paddingTop: 15,
      paddingHorizontal: 20
    },
    floatingPlaceholder: {
      position: 'absolute',
      width: '100%',
      backgroundColor: 'transparent'
    },
    placeholder: {
      color: placeholderTextColor,
      textAlign: 'left'
    },
    errorMessage: {
      color: Colors.red30,
      textAlign: centered ? 'center' : undefined
    },
    topLabel: {
      marginBottom: Constants.isIOS ? (multiline ? 1 : 6) : 7
    },
    bottomLabel: {
      marginTop: 1
    },
    label: {
      ...LABEL_TYPOGRAPHY,
      height: LABEL_TYPOGRAPHY.lineHeight
    },
    rightElement: {
      paddingRight: ICON_SIZE + ICON_RIGHT_PADDING + ICON_LEFT_PADDING
    },
    rightIcon: {
      position: 'absolute',
      right: ICON_RIGHT_PADDING,
      alignSelf: 'flex-end',
      paddingBottom: expandable ? 14 : 8
    },
    rightButton: {
      position: 'absolute',
      right: ICON_RIGHT_PADDING,
      alignSelf: 'center'
    },
    rightButtonImage: {
      width: ICON_SIZE,
      height: ICON_SIZE
    }
  });
}
