// TODO: hideUnderline should be true by default
// TODO: enableErrors should be false by default
// TODO: enableErrors should derived from errorMessage prop
// TODO: use forwardRef to allow access to inner TextInput API
// TODO: add trailing/leading icon props
// TODO: support margin modifiers
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated, TextInput as RNTextInput, Image as RNImage} from 'react-native';
import {Constants} from '../../helpers';
import {Colors, Typography, Spacings} from '../../style';
import BaseInput from '../baseInput';
import Modal from '../modal';
import TextArea from '../textArea';
import View from '../view';
import Image from '../image';
import Text from '../text';
import TouchableOpacity from '../touchableOpacity';

const COLOR_BY_STATE = {
  default: Colors.grey10,
  focus: Colors.grey10,
  error: Colors.grey10,
  disabled: Colors.grey50
};
const UNDERLINE_COLOR_BY_STATE = {
  default: Colors.grey50,
  focus: Colors.primary,
  error: Colors.red30
};
const PLACEHOLDER_COLOR_BY_STATE = {
  default: Colors.grey30,
  focus: Colors.primary
};
const CHAR_COUNTER_COLOR_BY_STATE = {
  default: Colors.grey30,
  error: Colors.red30
};

const LABEL_TYPOGRAPHY = Typography.text80;
const ICON_SIZE = 24;
const ICON_LEFT_PADDING = 6;
const FLOATING_PLACEHOLDER_SCALE = 0.875;

/**
 * @description: A wrapper for TextInput component with extra functionality like floating placeholder and validations (This is an uncontrolled component)
 * @modifiers: Typography
 * @extends: TextInput
 * @extendslink: https://facebook.github.io/react-native/docs/textinput
 * @gif: https://media.giphy.com/media/xULW8su8Cs5Z9Fq4PS/giphy.gif, https://media.giphy.com/media/3ohc1dhDcLS9FvWLJu/giphy.gif, https://media.giphy.com/media/oNUSOxnHdMP5ZnKYsh/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextFieldScreen/BasicTextFieldScreen.js
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
     * floating placeholder color as a string or object of states, ex. {default: 'black', error: 'red', focus: 'blue', disabled: 'grey'}
     */
    floatingPlaceholderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * Custom style for floating placeholder
     */
    floatingPlaceholderStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
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
     * underline color as a string or object of states, ex. {default: 'black', error: 'red', focus: 'blue', disabled: 'grey'}
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
     * input error message's text color
     */
    errorColor: PropTypes.string,
    /**
     * should the input expand to another text area modal
     */
    expandable: PropTypes.bool,
    /**
     * Render custom expandable input (requires expandable to be true)
     */
    renderExpandableInput: PropTypes.elementType,
    /**
     * allow custom rendering of expandable content when clicking on the input (useful for pickers)
     * accept props and state as params, ex. (props, state) => {...}
     * use toggleExpandableModal(false) method to toggle off the expandable content
     */
    renderExpandable: PropTypes.elementType,
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
     * Pass to render a prefix text as part of the input (doesn't work with floatingPlaceholder)
     */
    prefix: PropTypes.string,
    /**
     * The prefix style
     */
    prefixStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Fixed title that will displayed above the input (note: floatingPlaceholder MUST be 'false')
     */
    title: PropTypes.string,
    /**
     * The title's color as a string or object of states, ex. {default: 'black', error: 'red', focus: 'blue', disabled: 'grey'}
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
     * Pass to style the right icon source
     */
    rightIconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Props for the right button {iconSource, onPress, style}
     */
    rightButtonProps: PropTypes.shape({
      iconSource: RNImage.propTypes.source,
      iconColor: PropTypes.string,
      onPress: PropTypes.func,
      style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
      accessibilityLabel: PropTypes.string
    }),
    /**
     * Pass to render a leading icon to the TextInput value. Accepts Image props (doesn't work with floatingPlaceholder)
     */
    leadingIcon: PropTypes.shape(Image.propTypes)
  };

  static defaultProps = {
    enableErrors: true,
    validateOnBlur: true
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      value: props.value, // for floatingPlaceholder functionality
      floatingPlaceholderState: new Animated.Value(this.shouldFloatPlaceholder(props.value) ? 1 : 0),
      showExpandableModal: false,
      floatingPlaceholderTranslate: 0,
      charCountColor: CHAR_COUNTER_COLOR_BY_STATE.default
    };

    this.generatePropsWarnings(props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({value: nextProps.value}, () => {
        this.updateFloatingPlaceholderState();
        if (nextProps.validateOnChange) {
          this.validate();
        }
      });
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (_.isEmpty(prevState.value) !== _.isEmpty(this.state.value) || prevState.focused !== this.state.focused) {
      this.updateFloatingPlaceholderState();
    }
  }

  onPlaceholderLayout = (event) => {
    const {width} = event.nativeEvent.layout;
    const translate = width / 2 - (width * FLOATING_PLACEHOLDER_SCALE) / 2;
    this.setState({floatingPlaceholderTranslate: translate / FLOATING_PLACEHOLDER_SCALE});
  };

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
    this.styles = createStyles(this.getThemeProps(), this.getTopPaddings());
  }

  getAccessibilityInfo() {
    const {floatingPlaceholder, placeholder} = this.getThemeProps();
    const accessibilityState = this.isDisabled() ? {disabled: true} : undefined;
    let accessibilityLabel = floatingPlaceholder ? this.props.accessibilityLabel || placeholder : '';

    if (this.isRequiredField()) {
      accessibilityLabel = `${accessibilityLabel}. Mandatory`;
    }

    return {
      accessibilityLabel,
      // on Android accessibilityStates cause issues with expandable input
      accessibilityState: Constants.isIOS ? accessibilityState : undefined
    };
  }

  toggleExpandableModal = (value) => {
    this.setState({showExpandableModal: value});
    _.invoke(this.props, 'onToggleExpandableModal', value);
  }

  updateFloatingPlaceholderState = withoutAnimation => {
    if (withoutAnimation) {
      this.state.floatingPlaceholderState.setValue(this.shouldFloatPlaceholder() ? 1 : 0);
    } else {
      Animated.spring(this.state.floatingPlaceholderState, {
        toValue: this.shouldFloatPlaceholder() ? 1 : 0,
        duration: 150,
        useNativeDriver: true
      }).start();
    }
  };

  getPlaceholderText() {
    // HACK: passing whitespace instead of undefined. Issue fixed in RN56
    const {placeholder, helperText} = this.props;
    const text = this.shouldFakePlaceholder()
      ? this.shouldShowHelperText()
        ? helperText
        : ' '
      : this.shouldShowTopError() && this.shouldShowHelperText()
        ? helperText
        : this.getRequiredPlaceholder(placeholder);
    return text;
  }

  getStateColor(colorProp = {}) {
    const {focused} = this.state;
    const error = this.getErrorMessage();
    const {disabledColor} = this.getThemeProps();

    if (_.isString(colorProp)) {
      return colorProp || Colors.dark10;
    } else if (_.isPlainObject(colorProp)) {
      const mergedColorState = {...COLOR_BY_STATE, ...colorProp};

      if (this.isDisabled()) {
        return disabledColor || mergedColorState.disabled;
      } else if (error) {
        return mergedColorState.error;
      } else if (focused) {
        return mergedColorState.focus;
      } else {
        return mergedColorState.default;
      }
    }

    return colorProp || Colors.dark10;
  }

  getCharCount() {
    const {value} = this.state;
    if (value) {
      return value.length;
    }
    return 0;
  }

  setCharCountColor(key) {
    this.maxReached = key === Constants.backspaceKey ? false : this.isCounterLimit();
    const color = this.state.focused && this.maxReached ?
      CHAR_COUNTER_COLOR_BY_STATE.error : CHAR_COUNTER_COLOR_BY_STATE.default;

    if (color !== this.state.charCountColor) {
      this.setState({charCountColor: color});
    }
  }

  getCharCountColor() {
    const {charCountColor} = this.state;
    const {disabledColor} = this.getThemeProps();

    return this.isDisabled() && disabledColor ? disabledColor : charCountColor;
  }

  getTopPaddings() {
    return this.shouldFakePlaceholder() ? (this.shouldShowTopError() ? undefined : 25) : undefined;
  }

  getTopErrorsPosition() {
    return !this.props.title && this.shouldShowTopError() ? {top: Constants.isIOS ? -25 : -27} : undefined;
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
    const {floatingPlaceholder, centered, leadingIcon, prefix} = this.getThemeProps();

    return !leadingIcon && !prefix && Boolean(floatingPlaceholder && !centered && !this.shouldShowTopError());
  }

  shouldShowError() {
    const {enableErrors} = this.getThemeProps();
    const error = this.getErrorMessage();

    return enableErrors && error;
  }

  getErrorMessage() {
    return (this.props && this.props.error) ? this.props.error : this.state && this.state.error;
  }

  shouldShowTopError() {
    const {useTopErrors} = this.getThemeProps();
    return this.shouldShowError() && useTopErrors;
  }

  shouldDisplayRightButton() {
    const {rightButtonProps, expandable} = this.getThemeProps();
    return !expandable && rightButtonProps && rightButtonProps.iconSource;
  }

  shouldRenderTitle() {
    const {floatingPlaceholder, title} = this.getThemeProps();
    return !floatingPlaceholder && title;
  }

  onPressRightButton = () => {
    _.invoke(this.props, 'rightButtonProps.onPress');
  };

  /** Renders */
  renderPlaceholder() {
    const {floatingPlaceholderState, floatingPlaceholderTranslate} = this.state;
    const {placeholder, placeholderTextColor, floatingPlaceholderColor, floatingPlaceholderStyle} = this.getThemeProps();
    const typography = this.getTypography();
    const placeholderColor = this.getStateColor(placeholderTextColor || PLACEHOLDER_COLOR_BY_STATE.default);

    if (this.shouldFakePlaceholder()) {
      return (
        <View absF left>
          <Animated.Text
            pointerEvents="none"
            numberOfLines={1}
            suppressHighlighting
            accessible={false}
            onLayout={this.onPlaceholderLayout}
            style={[
              this.styles.placeholder,
              this.getTopErrorsPosition(),
              typography,
              // TODO: we need to exclude completely any dependency on line height
              // in this component since it always breaks alignments
              {lineHeight: undefined},
              {
                transform: [
                  {
                    scale: floatingPlaceholderState.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, FLOATING_PLACEHOLDER_SCALE]
                    })
                  },
                  {
                    translateY: floatingPlaceholderState.interpolate({
                      inputRange: [0, 1],
                      outputRange: [25, 0]
                    })
                  },
                  {
                    translateX: floatingPlaceholderState.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -floatingPlaceholderTranslate]
                    })
                  }
                ],
                color: this.shouldFloatPlaceholder()
                  ? this.getStateColor(floatingPlaceholderColor || PLACEHOLDER_COLOR_BY_STATE)
                  : placeholderColor
              },
              floatingPlaceholderStyle
            ]}
          >
            {this.getRequiredPlaceholder(placeholder)}
          </Animated.Text>
        </View>
      );
    }
  }

  renderPrefix() {
    const {prefix, prefixStyle} = this.props;
    if (prefix) {
      const typography = this.getTypography();
      return <Text style={[this.styles.prefix, typography, {lineHeight: undefined}, prefixStyle]}>{prefix}</Text>;
    }
  }

  renderTitle() {
    const {title, titleColor, titleStyle} = this.getThemeProps();
    const color = this.getStateColor(titleColor || PLACEHOLDER_COLOR_BY_STATE);

    if (this.shouldRenderTitle()) {
      return <Text style={[{color}, this.styles.topLabel, this.styles.label, titleStyle]}>{title}</Text>;
    }
  }

  renderCharCounter() {
    const {maxLength, showCharacterCounter} = this.getThemeProps();

    if (maxLength && showCharacterCounter) {
      const counter = this.getCharCount();
      const color = this.getCharCountColor();

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
    const {enableErrors, useTopErrors, errorColor} = this.getThemeProps();
    const textColor = errorColor ? {color: errorColor} : undefined;
    const positionStyle = useTopErrors ? this.styles.topLabel : this.styles.bottomLabel;
    const error = this.getErrorMessage();

    if (visible && enableErrors) {
      return (
        <Text
          style={[this.styles.errorMessage, this.styles.label, positionStyle, textColor]}
          accessible={!_.isEmpty(error) && !useTopErrors}
        >
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

    const textInputProps = TextField.extractOwnProps(this.props, ['error', 'testID']);

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
      return renderExpandableInput(this.getThemeProps(), this.toggleExpandableModal);
    }

    return (
      <TouchableOpacity
        style={this.styles.expandableInput}
        activeOpacity={1}
        onPress={() => !this.isDisabled() && this.toggleExpandableModal(true)}
        testID={`${testID}.expandable`}
        // {...this.extractAccessibilityProps()}
        {...this.getAccessibilityInfo()}
      >
        {this.renderTextInput()}
      </TouchableOpacity>
    );
  }

  renderTextInput() {
    const {value} = this.state; // value set on state for floatingPlaceholder functionality
    const {
      style,
      placeholderTextColor,
      multiline,
      // hideUnderline,
      numberOfLines,
      expandable,
      rightIconSource,
      color,
      ...others
    } = this.getThemeProps();

    const typography = this.getTypography();
    const {lineHeight, ...typographyStyle} = typography;
    const textColor = this.getStateColor(color || this.extractColorValue());
    const hasRightElement = this.shouldDisplayRightButton() || rightIconSource;
    const shouldUseMultiline = multiline/*  || expandable */;

    const inputStyle = [
      hasRightElement && this.styles.rightElement,
      this.styles.input,
      // hideUnderline && this.styles.inputWithoutUnderline,
      {...typographyStyle},
      // Constants.isAndroid && {lineHeight},
      expandable && {maxHeight: lineHeight * (Constants.isAndroid ? 3 : 3.3)},
      Constants.isRTL && {minHeight: lineHeight + 3},
      Constants.isIOS && shouldUseMultiline && {paddingTop: 0}, // fix for iOS topPadding in multiline TextInput
      {color: textColor},
      style
    ];

    const placeholderText = this.getPlaceholderText();
    const placeholderColor = this.getStateColor(placeholderTextColor || PLACEHOLDER_COLOR_BY_STATE.default);
    const isEditable = !this.isDisabled() && !expandable;

    return (
      <RNTextInput
        {...this.getAccessibilityInfo()}
        pointerEvents={expandable ? 'none' : undefined}
        {...others}
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
      />
    );
  }

  renderRightButton() {
    if (this.shouldDisplayRightButton()) {
      const {rightButtonProps} = this.getThemeProps();
      const {style, iconSource, iconColor, accessibilityLabel, ...others} = rightButtonProps;

      return (
        <TouchableOpacity
          {...others} accessibilityLabel={accessibilityLabel}
          style={[this.styles.rightButton, this.getTopErrorsPosition(), style]} onPress={this.onPressRightButton}
        >
          <Image
            pointerEvents="none"
            source={iconSource}
            resizeMode={'contain'}
            style={[this.styles.rightButtonImage, {tintColor: iconColor || Colors.primary}]}
          />
        </TouchableOpacity>
      );
    }
  }

  renderRightIcon() {
    const {rightIconSource, rightIconStyle} = this.getThemeProps();

    if (rightIconSource) {
      return (
        <View style={[this.styles.rightButton, this.getTopErrorsPosition()]} pointerEvents="none">
          <Image source={rightIconSource} resizeMode={'center'} style={[this.styles.rightButtonImage, rightIconStyle]}/>
        </View>
      );
    }
  }

  render() {
    const {expandable, containerStyle, underlineColor, useTopErrors, hideUnderline, leadingIcon} = this.getThemeProps();
    const underlineStateColor = this.getStateColor(underlineColor || UNDERLINE_COLOR_BY_STATE);

    return (
      <View style={[this.styles.container, containerStyle]} collapsable={false}>
        {this.shouldShowTopError() ? this.renderError(useTopErrors) : this.renderTitle()}

        <View
          style={[
            this.styles.innerContainer,
            hideUnderline && this.styles.innerContainerWithoutUnderline,
            {borderColor: underlineStateColor},
            {paddingTop: this.getTopPaddings()}
          ]}
        >
          {leadingIcon && <Image {...leadingIcon} style={[this.styles.leadingIcon, leadingIcon.style]}/>}
          {this.renderPrefix()}
          {this.renderPlaceholder()}
          {expandable ? this.renderExpandableInput() : this.renderTextInput()}
          {this.renderRightButton()}
          {this.renderRightIcon()}
          {expandable && this.renderExpandableModal()}
        </View>

        {!_.isUndefined(this.getErrorMessage()) && useTopErrors && (
          <View
            style={this.styles.accessibilityDummyErrorMessage}
            accessible
            accessibilityLabel={this.getErrorMessage()}
          />
        )}

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
    this.setCharCountColor(this.lastKey);
    _.invoke(this.props, 'onKeyPress', event);
  };

  onChangeText = text => {
    // when character count exceeds maxLength text will be empty string.
    // HACK: To avoid setting state value to '' we check the source of that deletion
    if (text === '' && this.lastKey && this.lastKey !== Constants.backspaceKey) {
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

function createStyles({centered, multiline}, rightItemTopPadding = 0) {
  const itemTopPadding = Constants.isIOS ? (rightItemTopPadding - 3) : (rightItemTopPadding - 1);

  return StyleSheet.create({
    container: {
    },
    innerContainer: {
      // flexGrow: 1, // create bugs with lineHeight
      flexDirection: 'row',
      justifyContent: centered ? 'center' : undefined,
      borderBottomWidth: 1,
      borderColor: Colors.dark70,
      paddingBottom: Constants.isIOS ? 10 : 5
    },
    innerContainerWithoutUnderline: {
      borderBottomWidth: 0,
      paddingBottom: 0
    },
    input: {
      flexGrow: 1,
      textAlign: centered ? 'center' : undefined,
      backgroundColor: 'transparent',
      // marginBottom: Constants.isIOS ? 10 : 5,
      padding: 0, // for Android
      // textAlignVertical: 'top', // for Android
      borderColor: 'transparent', // borderColor & borderWidth is a fix for collapsing issue on Android
      borderWidth: Constants.isAndroid ? 1 : undefined // for Android
    },
    expandableInput: {
      flexGrow: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    // inputWithoutUnderline: {
    //   marginBottom: undefined
    // },
    expandableModalContent: {
      flex: 1,
      paddingTop: 15,
      paddingHorizontal: 20
    },
    prefix: {
      color: Colors.grey30,
      marginRight: Spacings.s1,
      textAlignVertical: 'center'
    },
    placeholder: {
      textAlign: 'left'
    },
    errorMessage: {
      color: Colors.red30,
      textAlign: centered ? 'center' : undefined
    },
    topLabel: {
      marginBottom: Constants.isIOS ? (multiline ? 1 : 5) : 7
    },
    bottomLabel: {
      marginTop: 9
    },
    label: {
      ...LABEL_TYPOGRAPHY,
      height: LABEL_TYPOGRAPHY.lineHeight
    },
    rightElement: {
      paddingRight: ICON_SIZE + ICON_LEFT_PADDING
    },
    rightButton: {
      position: 'absolute',
      right: 0,
      alignSelf: 'flex-start',
      paddingTop: itemTopPadding
    },
    rightButtonImage: {
      width: ICON_SIZE,
      height: ICON_SIZE
    },
    leadingIcon: {
      alignSelf: 'center'
    },
    accessibilityDummyErrorMessage: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 1,
      height: 1
    }
  });
}
