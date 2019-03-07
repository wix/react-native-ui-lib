import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated, TouchableOpacity, TextInput as RNTextInput} from 'react-native';
import {Colors, Typography} from '../../style';
import {Constants} from '../../helpers';
import BaseInput from './BaseInput';
import {Modal} from '../../screensComponents';
import TextArea from './TextArea';
import View from '../view';
import Image from '../image';
import Text from '../text';


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

/**
 * @description: A wrapper for Text Input component with extra functionality like floating placeholder
 * @extends: TextInput
 * @extendslink: https://facebook.github.io/react-native/docs/textinput.html
 * @modifiers: Typography
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
     * should float the placeholer when focused (instead of when typing)
     */
    floatOnFocus: PropTypes.bool,
    /**
     * should the errors be displayed at the top
     */
    useTopErrors: PropTypes.bool,
    /**
     * Icon asset source for showing on the right side, appropriate for dropdown icon and such
     */
    rightIconSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  };

  static defaultProps = {
    placeholderTextColor: DEFAULT_COLOR_BY_STATE.default,
    enableErrors: true
  };

  constructor(props) {
    super(props);

    this.updateFloatingPlaceholderState = this.updateFloatingPlaceholderState.bind(this);
    this.toggleExpandableModal = this.toggleExpandableModal.bind(this);

    this.state = {
      value: props.value,
      floatingPlaceholderState: new Animated.Value(this.shouldFloatPlacholder(props.value) ? 1 : 0),
      showExpandableModal: false
    };

    this.generatePropsWarnings(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({value: nextProps.value}, this.updateFloatingPlaceholderState);
    }
  }

  /** Actions */
  generatePropsWarnings(props) {
    if (props.maxLength === 0) {
      console.warn('Setting maxLength to zero will block typing in this input');
    }
    if (props.showCharacterCounter && !props.maxLength) {
      console.warn("In order to use showCharacterCount please pass 'maxLength' prop");
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
      this.state.floatingPlaceholderState.setValue(this.shouldFloatPlacholder() ? 1 : 0);
    } else {
      Animated.spring(this.state.floatingPlaceholderState, {
        toValue: this.shouldFloatPlacholder() ? 1 : 0,
        duration: 150,
      }).start();
    }
  }

  getPlaceholderText() {
    // HACK: passing whitespace instead of undefined. Issue fixed in RN56
    const {placeholder, helperText} = this.props;
    const text = this.shouldFakePlaceholder() ?
      (this.shouldShowHelperText() ? helperText : ' ') :
      (this.shouldShowTopError() && this.shouldShowHelperText() ? helperText : placeholder);
    return text;
  }

  getStateColor(colorProp, isUnderline) {
    const {focused} = this.state;
    const {error, disabledColor} = this.getThemeProps();
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

  shouldFloatPlacholder(text) {
    return this.hasText(text) || this.shouldShowHelperText() || this.shouldFloatOnFocus();
  }

  shouldFakePlaceholder() {
    const {floatingPlaceholder, centered} = this.getThemeProps();
    return Boolean(floatingPlaceholder && !centered && !this.shouldShowTopError());
  }

  shouldShowError() {
    const {enableErrors, error} = this.getThemeProps();
    return enableErrors && error;
  }

  shouldShowTopError() {
    const {useTopErrors} = this.getThemeProps();
    return this.shouldShowError() && useTopErrors;
  }

  /** Renders */
  renderPlaceholder() {
    const {floatingPlaceholderState} = this.state;
    const {
      centered,
      expandable,
      placeholder,
      placeholderTextColor,
      floatingPlaceholderColor,
      multiline
    } = this.getThemeProps();
    const typography = this.getTypography();
    const placeholderColor = this.getStateColor(placeholderTextColor);


    if (this.shouldFakePlaceholder()) {
      return (
        <Animated.Text
          style={[
            this.styles.floatingPlaceholder,
            this.styles.placeholder,
            typography,
            centered && this.styles.placeholderCentered,
            !centered && {
              top: floatingPlaceholderState.interpolate({
                inputRange: [0, 1],
                outputRange: [multiline ? 30 : 28, multiline ? (Constants.isAndroid ? 0 : 5) : 0]
              }),
              fontSize: floatingPlaceholderState.interpolate({
                inputRange: [0, 1],
                outputRange: [typography.fontSize, LABEL_TYPOGRAPHY.fontSize]
              }),
              color: floatingPlaceholderState.interpolate({
                inputRange: [0, 1],
                outputRange: [placeholderColor, this.getStateColor(floatingPlaceholderColor)]
              }),
              lineHeight: this.shouldFloatPlacholder()
                ? LABEL_TYPOGRAPHY.lineHeight
                : typography.lineHeight
            },
          ]}
          numberOfLines={1}
          onPress={() => expandable && this.toggleExpandableModal(true)}
          suppressHighlighting
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
      return (
        <Text
          style={[{color}, this.styles.topLabel, this.styles.label, titleStyle]}
        >
          {title}
        </Text>
      );
    }
  }

  renderCharCounter() {
    const {focused} = this.state;
    const {maxLength, showCharacterCounter, disabledColor} = this.getThemeProps();

    if (maxLength && showCharacterCounter) {
      const counter = this.getCharCount();
      const textColor = this.isCounterLimit() && focused ? DEFAULT_COLOR_BY_STATE.error : DEFAULT_COLOR_BY_STATE.default;
      const color = (this.isDisabled() && disabledColor) ? disabledColor : textColor;

      return (
        <Text
          style={[{color}, this.styles.bottomLabel, this.styles.label]}
        >
          {counter} / {maxLength}
        </Text>
      );
    }
  }

  renderError(visible) {
    const {enableErrors, error, useTopErrors} = this.getThemeProps();
    const positionStyle = useTopErrors ? this.styles.topLabel : this.styles.bottomLabel;

    if (visible && enableErrors) {
      return (
        <Text style={[this.styles.errorMessage, this.styles.label, positionStyle]}>
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
            ref={(textarea) => {
              this.expandableInput = textarea;
            }}
            {...this.props}
            value={this.state.value}
          />
        </View>
      </Modal>
    );
  }

  renderExpandableInput() {
    const {value} = this.state;
    const {
      style, 
      floatingPlaceholder, 
      placeholder, 
      hideUnderline, 
      renderExpandableInput, 
      rightIconSource
    } = this.getThemeProps();
    const typography = this.getTypography();
    const {lineHeight, ...typographyStyle} = typography;

    const color = this.getStateColor(this.props.color || this.extractColorValue());
    const inputStyle = [
      this.styles.input,
      hideUnderline && this.styles.inputWithoutUnderline,
      {...typographyStyle},
      {minHeight: lineHeight + (Constants.isAndroid ? 6 : 0)},
      color && {color},
      style
    ];

    if (_.isFunction(renderExpandableInput)) {
      return renderExpandableInput(this.getThemeProps());
    }

    const shouldShowPlaceholder = _.isEmpty(value) && !floatingPlaceholder;

    return (
      <TouchableOpacity
        style={this.styles.expandableInput}
        activeOpacity={1}
        onPress={() => !this.isDisabled() && this.toggleExpandableModal(true)}
      >
        <Text
          style={[
            inputStyle,
            shouldShowPlaceholder && this.styles.placeholder
          ]}
          numberOfLines={3}
        >
          {shouldShowPlaceholder ? placeholder : value}
        </Text>
        {rightIconSource && 
          <Image pointerEvents="none" source={rightIconSource} style={{marginBottom: hideUnderline ? 0 : 7}}/>}
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
      centered,
      multiline,
      hideUnderline,
      numberOfLines,
      helperText,
      ...others
    } = this.getThemeProps();
    const typography = this.getTypography();
    const {lineHeight, ...typographyStyle} = typography;
    const color = this.getStateColor(this.props.color || this.extractColorValue());
    const inputStyle = [
      this.styles.input,
      hideUnderline && this.styles.inputWithoutUnderline,
      {...typographyStyle},
      color && {color},
      style
    ];
    const placeholderText = this.getPlaceholderText();
    const placeholderColor = this.getStateColor(placeholderTextColor);

    return (
      <RNTextInput
        {...others}
        value={value}
        placeholder={placeholderText}
        placeholderTextColor={placeholderColor}
        underlineColorAndroid="transparent"
        style={inputStyle}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onKeyPress={this.onKeyPress}
        onChangeText={this.onChangeText}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        ref={(input) => {
          this.input = input;
        }}
      />
    );
  }

  render() {
    const {expandable, containerStyle, underlineColor, useTopErrors, hideUnderline} = this.getThemeProps();
    const underlineStateColor = this.getStateColor(underlineColor, true);

    return (
      <View style={[this.styles.container, containerStyle]} collapsable={false}>
        <View>
          {this.shouldShowTopError() ? this.renderError(useTopErrors) : this.renderTitle()}
        </View>
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
          {expandable && this.renderExpandableModal()}
        </View>
        <View row>
          <View flex>
            {this.renderError(!useTopErrors)}
          </View>
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
  }

  onKeyPress = (event) => {
    this.lastKey = event.nativeEvent.key;
    _.invoke(this.props, 'onKeyPress', event);
  }

  onChangeText = (text) => {
    // when character count exceeds maxLength text will be empty string.
    // HACK: To avoid setting state value to '' we check the source of that deletion
    if (text === '' && this.lastKey && this.lastKey !== 'Backspace') {
      return;
    }

    const {transformer} = this.props;
    let transformedText = text;
    if (_.isFunction(transformer)) {
      transformedText = transformer(text);
    }

    _.invoke(this.props, 'onChangeText', transformedText);
    this.setState({value: transformedText}, this.updateFloatingPlaceholderState);
  }

  onFocus = (...args) => {
    _.invoke(this.props, 'onFocus', ...args);
    this.setState({focused: true}, this.updateFloatingPlaceholderState);
  }

  onBlur = (...args) => {
    _.invoke(this.props, 'onBlur', ...args);
    this.setState({focused: false}, this.updateFloatingPlaceholderState);
  }
}

function createStyles({placeholderTextColor, centered, multiline}) {
  return StyleSheet.create({
    container: {
    },
    innerContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: Colors.dark70,
      justifyContent: centered ? 'center' : undefined,
      flexGrow: 1
    },
    innerContainerWithoutUnderline: {
      borderBottomWidth: 0
    },
    input: {
      flexGrow: 1,
      marginBottom: Constants.isIOS ? 10 : 5,
      padding: 0,
      textAlign: centered ? 'center' : undefined,
      backgroundColor: 'transparent'
    },
    expandableInput: {
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1
    },
    inputWithoutUnderline: {
      marginBottom: undefined
    },
    floatingPlaceholder: {
      position: 'absolute',
      width: '100%',
      backgroundColor: 'transparent'
    },
    placeholder: {
      color: placeholderTextColor
    },
    placeholderCentered: {
      left: 0,
      right: 0,
      textAlign: 'center'
    },
    errorMessage: {
      color: Colors.red30,
      textAlign: centered ? 'center' : undefined
    },
    expandableModalContent: {
      flex: 1,
      paddingTop: 15,
      paddingHorizontal: 20
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
    }
  });
}
