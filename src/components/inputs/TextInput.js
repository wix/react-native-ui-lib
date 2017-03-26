import React, {PropTypes} from 'react';
import {View, TextInput as RNTextInput, StyleSheet, Animated} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import Text from '../text';
import {Colors, Typography} from '../../style';
import {Constants} from '../../helpers';

export default class TextInput extends BaseComponent {

  static displayName = 'TextInput';
  static propTypes = {
    ...RNTextInput.propTypes,
    ...BaseComponent.propTypes,
    color: PropTypes.string,
    hideUnderline: PropTypes.bool,
    centered: PropTypes.bool,
    containerStyle: PropTypes.object,
    error: PropTypes.string,
    testId: PropTypes.string,
  };

  static defaultProps = {
    placeholderTextColor: Colors.dark60,
  }

  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.animatedFloatingPlaceholder = this.animatedFloatingPlaceholder.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);

    const typography = this.getTypography();
    this.state = {
      inputWidth: typography.fontSize * 2,
      widthExtendBreaks: [],
      value: props.value,
      floatingPlaceholderState: new Animated.Value(props.value ? 1 : 0),
    };
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getTypography() {
    return this.extractTypographyValue() || Typography.text70;
  }

  getUnderlineStyle() {
    const {focused} = this.state;
    const {error} = this.props;
    if (error) {
      return this.styles.errorUnderline;
    } else if (focused) {
      return this.styles.focusedUnderline;
    }

    return null;
  }

  hasText() {
    const {value} = this.state;
    return value && value.length > 0;
  }

  renderPlaceholder() {
    const {floatingPlaceholderState} = this.state;
    const {floatingPlaceholder, centered, placeholder} = this.props;
    const typography = this.getTypography();

    if (!floatingPlaceholder && !centered) {
      return null;
    }

    if (centered && this.hasText()) {
      return null;
    }

    return (
      <Animated.Text
        style={[
          this.styles.placeholder,
          typography,
          centered && this.styles.placeholderCentered,
          !centered && {
            top: floatingPlaceholderState.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
            fontSize: floatingPlaceholderState.interpolate({
              inputRange: [0, 1],
              outputRange: [typography.fontSize, Typography.text80.fontSize],
            }),
            lineHeight: this.hasText() ? Typography.text80.lineHeight : typography.lineHeight,
          },
        ]}
      >
        {placeholder}
      </Animated.Text>
    );
  }

  renderError() {
    const {error} = this.props;
    if (error) {
      return (
        <Text style={this.styles.errorMessage}>{error}</Text>
      );
    }

    return null;
  }

  render() {
    const color = this.props.color || this.extractColorValue();
    const typography = this.getTypography();
    const {style, containerStyle, placeholder, floatingPlaceholder, centered, multiline, ...others} = this.props;
    const {inputWidth, value} = this.state;
    const inputStyle = [
      this.styles.input,
      style,
      typography,
      {height: typography.lineHeight},
      color && {color},
      centered && {width: inputWidth},
    ];

    const underlineStyle = this.getUnderlineStyle();

    return (
      <View style={[this.styles.container, underlineStyle, containerStyle]}>
        {this.renderPlaceholder()}
        <RNTextInput
          {...others}
          value={value}
          placeholder={(floatingPlaceholder || centered) ? undefined : placeholder}
          underlineColorAndroid="transparent"
          style={inputStyle}
          multiline={centered || multiline}

          onChangeText={this.onChangeText}
          onContentSizeChange={this.onContentSizeChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {this.renderError()}
      </View>
    );
  }

  animatedFloatingPlaceholder() {
    Animated.spring(
      this.state.floatingPlaceholderState,
      {
        toValue: this.hasText() ? 1 : 0,
        duration: 150,
      },
    ).start();
  }

  onFocus(...args) {
    _.invoke(this.props, 'onFocus', ...args);
    this.setState({focused: true});
  }

  onBlur(...args) {
    _.invoke(this.props, 'onBlur', ...args);
    this.setState({focused: false});
  }

  onChangeText(text) {
    _.invoke(this.props, 'onChangeText', text);

    this.setState({
      value: text,
    }, this.animatedFloatingPlaceholder);

    const {widthExtendBreaks, width} = this.state;
    if (text.length < _.last(widthExtendBreaks)) {
      const typography = this.getTypography();
      this.setState({
        inputWidth: width - typography.fontSize,
        widthExtendBreaks: widthExtendBreaks.slice(-1),
      });
    }
  }

  onContentSizeChange(event) {
    const typography = this.getTypography();
    const initialHeight = typography.lineHeight + 10;
    const {width, height} = event.nativeEvent.contentSize;
    const {widthExtendBreaks, value} = this.state;
    if (height > initialHeight) {
      this.setState({
        inputWidth: width + typography.fontSize,
        widthExtendBreaks: widthExtendBreaks.concat(value.length),
      });
    }
  }
}

function createStyles({placeholderTextColor, hideUnderline, centered}) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderBottomWidth: hideUnderline ? 0 : 1,
      borderColor: Colors.dark80,
      justifyContent: centered ? 'center' : undefined,
      paddingTop: 20,
    },
    focusedUnderline: {
      borderColor: Colors.blue30,
    },
    errorUnderline: {
      borderColor: Colors.red30,
    },
    input: {
      flex: (centered && Constants.isIOS) ? undefined : 1,
      marginBottom: 10,
      padding: 0,
      textAlign: centered ? 'center' : undefined,
      minWidth: 40,
    },
    placeholder: {
      position: 'absolute',
      color: placeholderTextColor,
    },
    placeholderCentered: {
      left: 0,
      right: 0,
      textAlign: 'center',
    },
    errorMessage: {
      color: Colors.red30,
      ...Typography.text90,
      position: 'absolute',
      left: 0,
      bottom: -(Typography.text90.lineHeight + 2),
    },
  });
}
