import React, {PropTypes} from 'react';
import {View, TextInput as RNTextInput, StyleSheet, Animated} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {Colors, Typography} from '../../style';

export default class TextInput extends BaseComponent {

  static displayName = 'Text';
  static propTypes = {
    ...RNTextInput.propTypes,
    ...BaseComponent.propTypes,
    color: PropTypes.string,
    hideUnderline: PropTypes.bool,
    centered: PropTypes.bool,
    containerStyle: PropTypes.object,
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

    return (
      <View style={[this.styles.container, containerStyle]}>
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
        />

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
    input: {
      flex: centered ? undefined : 1,
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
  });
}
