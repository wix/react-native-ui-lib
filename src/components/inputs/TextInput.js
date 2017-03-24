import React, {PropTypes} from 'react';
import {View, TextInput as RNTextInput, StyleSheet} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {Colors, Typography} from '../../style';
import {Constants} from '../../helpers';
import Text from '../text';

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

    const typography = this.getTypography();
    this.state = {
      inputWidth: typography.fontSize * 2,
      widthExtendBreaks: [],
      value: '',
    };
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getTypography() {
    return this.extractTypographyValue() || Typography.text70;
  }

  renderPlaceholder() {
    const {floatingPlaceholder, centered, placeholder} = this.props;
    const typography = this.getTypography();
    if (floatingPlaceholder || centered) {
      return (
        <Text
          style={[
            this.styles.placeholder,
            centered && this.styles.placeholderCentered,
            typography]}
        >
          {placeholder}
        </Text>
      );
    }

    return null;
  }

  render() {
    const color = this.props.color || this.extractColorValue();
    const typography = this.getTypography();
    const {style, containerStyle, placeholder, floatingPlaceholder, centered, ...others} = this.props;
    const {inputWidth} = this.state;
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
          placeholder={(floatingPlaceholder || centered) ? undefined : placeholder}
          underlineColorAndroid="transparent"
          style={inputStyle}

          multiline={centered}
          onChangeText={this.onChangeText}
          onContentSizeChange={this.onContentSizeChange}
        />
      </View>
    );
  }

  onChangeText(text) {
    this.setState({
      value: text,
    });

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
