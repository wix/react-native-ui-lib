import React from 'react';
import PropTypes from 'prop-types';
import {TextInput as RNTextInput, StyleSheet, Animated} from 'react-native';
import _ from 'lodash';
import BaseInput from './BaseInput';
import Text from '../text';
import {Colors, Typography} from '../../style';
import {Constants} from '../../helpers';
import {Modal} from '../../screensComponents';
import TextArea from './TextArea';
import View from '../view';


const DEFAULT_COLOR_BY_STATE = {
  default: Colors.dark40,
  focus: Colors.blue30,
  error: Colors.red30,
};
const DEFAULT_UNDERLINE_COLOR_BY_STATE = {
  default: Colors.dark70,
  focus: Colors.blue30,
  error: Colors.red30,
};


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
     * allow custom rendering of expandable content when clicking on the input (useful for pickers)
     * accept props and state as params, ex. (props, state) => {...}
     * use toggleExpandableModal(false) method to toggle off the expandable content
     */
    renderExpandable: PropTypes.func,
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
  };

  static defaultProps = {
    placeholderTextColor: DEFAULT_COLOR_BY_STATE.default,
    enableErrors: true,
  };

  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onDoneEditingExpandableInput = this.onDoneEditingExpandableInput.bind(this);
    this.updateFloatingPlaceholderState = this.updateFloatingPlaceholderState.bind(this);
    this.toggleExpandableModal = this.toggleExpandableModal.bind(this);
    this.shouldShowHelperText = this.shouldShowHelperText.bind(this);

    this.state = {
      value: props.value,
      floatingPlaceholderState: new Animated.Value(
        this.hasText(props.value) || this.shouldShowHelperText() ? 1 : 0,
      ),
      showExpandableModal: false,
    };

    this.generatePropsWarnings(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState(
        {
          value: nextProps.value,
        },
        this.updateFloatingPlaceholderState,
      );
    }
  }

  componentDidMount() {
    this.getHeight();
  }

  generatePropsWarnings(props) {
    if (props.maxLength === 0) {
      console.warn('Setting maxLength to zero will block typing in this input');
    }
    if (props.showCharacterCounter && !props.maxLength) {
      console.warn("In order to use showCharacterCount please pass 'maxLength' prop");
    }
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getStateColor(colorProp, isUnderline) {
    const {focused} = this.state;
    const {error} = this.props;
    const colorByState = _.cloneDeep(isUnderline ? DEFAULT_UNDERLINE_COLOR_BY_STATE : DEFAULT_COLOR_BY_STATE);

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
    return _.size(value);
  }

  isCounterLimit() {
    const {maxLength} = this.props;
    const counter = this.getCharCount();
    return counter === 0 ? false : maxLength === counter;
  }

  hasText(value) {
    return !_.isEmpty(value || this.state.value);
  }

  shouldShowHelperText() {
    const {focused} = this.state;
    const {helperText} = this.props;
    return focused && helperText;
  }

  shouldFakePlaceholder() {
    const {floatingPlaceholder, centered} = this.props;
    return Boolean(floatingPlaceholder && !centered);
  }

  getHeight() {
    const {multiline} = this.props;
    if (!multiline) {
      const typography = this.getTypography();
      return typography.lineHeight;
    }
    return this.getLinesHeightLimit();
  }

  // numberOfLines support for both platforms
  getLinesHeightLimit() {
    const {multiline, numberOfLines} = this.props;
    if (multiline && numberOfLines) {
      const typography = this.getTypography();
      return typography.lineHeight * numberOfLines;
    }
  }

  renderPlaceholder() {
    const {floatingPlaceholderState} = this.state;
    const {
      centered,
      expandable,
      placeholder,
      placeholderTextColor,
      floatingPlaceholderColor,
      multiline,
    } = this.props;
    const typography = this.getTypography();
    const floatingTypography = Typography.text90;

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
                outputRange: [multiline ? 30 : 28, multiline ? 7 : 0],
              }),
              fontSize: floatingPlaceholderState.interpolate({
                inputRange: [0, 1],
                outputRange: [typography.fontSize, floatingTypography.fontSize],
              }),
              color: floatingPlaceholderState.interpolate({
                inputRange: [0, 1],
                outputRange: [placeholderTextColor, this.getStateColor(floatingPlaceholderColor)],
              }),
              lineHeight: this.hasText() || this.shouldShowHelperText()
                ? floatingTypography.lineHeight
                : typography.lineHeight,
            },
          ]}
          onPress={() => expandable && this.toggleExpandableModal(true)}
        >
          {placeholder}
        </Animated.Text>
      );
    }
  }

  renderTitle() {
    const {floatingPlaceholder, title, titleColor, titleStyle} = this.props;
    const color = this.getStateColor(titleColor);

    if (!floatingPlaceholder && title) {
      return (
        <Text
          style={[{color}, this.styles.title, titleStyle]}
        >
          {title}
        </Text>
      );
    }
  }

  renderCharCounter() {
    const {focused} = this.state;
    const {maxLength, showCharacterCounter} = this.props;
    if (maxLength && showCharacterCounter) {
      const counter = this.getCharCount();
      const color = this.isCounterLimit() && focused ? DEFAULT_COLOR_BY_STATE.error : DEFAULT_COLOR_BY_STATE.default;
      return (
        <Text
          style={[{color}, this.styles.charCounter]}
        >
          {counter} / {maxLength}
        </Text>
      );
    }
  }

  renderError() {
    const {enableErrors, error} = this.props;
    if (enableErrors) {
      return (
        <Text style={this.styles.errorMessage}>
          {error}
        </Text>
      );
    }
  }

  renderExpandableModal() {
    const {renderExpandable} = this.props;
    const {showExpandableModal} = this.state;

    if (_.isFunction(renderExpandable) && showExpandableModal) {
      return renderExpandable(this.props, this.state);
    }

    return (
      <Modal
        animationType={'slide'}
        visible={showExpandableModal}
        onRequestClose={() => this.toggleExpandableModal(false)}
      >
        <Modal.TopBar
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
    const {style, floatingPlaceholder, placeholder} = this.props;
    const {value} = this.state;
    const typography = this.getTypography();
    const color = this.props.color || this.extractColorValue();
    const minHeight = typography.lineHeight;
    const shouldShowPlaceholder = _.isEmpty(value) && !floatingPlaceholder;
    const inputStyle = [
      this.styles.input,
      typography,
      color && {color},
      style,
    ];

    return (
      <Text
        style={[
          {minHeight},
          inputStyle,
          shouldShowPlaceholder && this.styles.placeholder,
        ]}
        numberOfLines={3}
        onPress={() => this.toggleExpandableModal(true)}
      >
        {shouldShowPlaceholder ? placeholder : value}
      </Text>
    );
  }

  renderTextInput() {
    const {value} = this.state;
    const color = this.props.color || this.extractColorValue();
    const typography = this.getTypography();
    const {
      style,
      placeholder,
      floatingPlaceholder,
      centered,
      multiline,
      numberOfLines,
      helperText,
      ...others
    } = this.props;
    const inputStyle = [
      this.styles.input,
      typography,
      color && {color},
      // with the right flex on the tree hierarchy we might not need this
      // {height: this.getHeight()},
      style,
    ];
    const placeholderText = this.shouldFakePlaceholder() ?
      (this.shouldShowHelperText() ? helperText : undefined) : placeholder;

    return (
      <RNTextInput
        {...others}
        value={value}
        placeholder={placeholderText}
        underlineColorAndroid="transparent"
        style={inputStyle}
        multiline={multiline}
        numberOfLines={numberOfLines}
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
    const {expandable, containerStyle, underlineColor} = this.props;
    const underlineStateColor = this.getStateColor(underlineColor, true);

    return (
      <View style={[this.styles.container, containerStyle]} collapsable={false}>
        {this.renderTitle()}
        <View style={[this.styles.innerContainer, {borderColor: underlineStateColor}]}>
          {this.renderPlaceholder()}
          {expandable ? this.renderExpandableInput() : this.renderTextInput()}
          {this.renderExpandableModal()}
        </View>
        <View row>
          <View flex>
            {this.renderError()}
          </View>
          {this.renderCharCounter()}
        </View>
      </View>
    );
  }

  toggleExpandableModal(value) {
    this.setState({showExpandableModal: value});
  }

  updateFloatingPlaceholderState(withoutAnimation) {
    if (withoutAnimation) {
      this.state.floatingPlaceholderState.setValue(this.hasText() || this.shouldShowHelperText() ? 1 : 0);
    } else {
      Animated.spring(this.state.floatingPlaceholderState, {
        toValue: this.hasText() || this.shouldShowHelperText() ? 1 : 0,
        duration: 150,
      }).start();
    }
  }

  onDoneEditingExpandableInput() {
    const expandableInputValue = _.get(this.expandableInput, 'state.value');
    this.setState({
      value: expandableInputValue,
    });
    this.state.floatingPlaceholderState.setValue(expandableInputValue ? 1 : 0);
    _.invoke(this.props, 'onChangeText', expandableInputValue);
    this.toggleExpandableModal(false);
  }

  onChangeText(text) {
    const {transformer} = this.props;
    let transformedText = text;

    if (_.isFunction(transformer)) {
      transformedText = transformer(text);
    }

    _.invoke(this.props, 'onChangeText', transformedText);

    this.setState(
      {
        value: transformedText,
      },
      this.updateFloatingPlaceholderState,
    );
  }

  onFocus(...args) {
    _.invoke(this.props, 'onFocus', ...args);
    this.setState({focused: true}, this.updateFloatingPlaceholderState);
  }

  onBlur(...args) {
    _.invoke(this.props, 'onBlur', ...args);
    this.setState({focused: false}, this.updateFloatingPlaceholderState);
  }
}

function createStyles({
  placeholderTextColor,
  hideUnderline,
  centered,
  floatingPlaceholder,
}) {
  return StyleSheet.create({
    container: {
    },
    innerContainer: {
      flexDirection: 'row',
      borderBottomWidth: hideUnderline ? 0 : 1,
      borderColor: Colors.dark70,
      justifyContent: centered ? 'center' : undefined,
      paddingTop: floatingPlaceholder ? 25 : undefined,
      flexGrow: 1,
    },
    focusedUnderline: {
      borderColor: Colors.blue30,
    },
    errorUnderline: {
      borderColor: Colors.red30,
    },
    input: {
      flexGrow: 1,
      marginBottom: hideUnderline ? undefined : (Constants.isIOS ? 10 : 5),
      padding: 0,
      textAlign: centered ? 'center' : undefined,
      backgroundColor: 'transparent',

      // backgroundColor: 'red'
    },
    floatingPlaceholder: {
      position: 'absolute',
    },
    placeholder: {
      color: placeholderTextColor,
    },
    placeholderCentered: {
      left: 0,
      right: 0,
      textAlign: 'center',
    },
    errorMessage: {
      color: Colors.red30,
      textAlign: centered ? 'center' : undefined,
      ...Typography.text90,
      // height: Typography.text90.lineHeight,
      marginTop: 1,
    },
    expandableModalContent: {
      flex: 1,
      paddingTop: 15,
      paddingHorizontal: 20,
    },
    title: {
      top: 0,
      ...Typography.text90,
      height: Typography.text90.lineHeight,
      marginBottom: Constants.isIOS ? 5 : 4,
    },
    charCounter: {
      ...Typography.text90,
      height: Typography.text90.lineHeight,
      marginTop: 1,
    },
  });
}
