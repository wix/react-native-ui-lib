import React, {PropTypes} from 'react';
import {View, TextInput as RNTextInput, StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';
import {Colors, Typography} from '../../style';
import Text from '../text';

export default class TextInput extends BaseComponent {

  static displayName = 'Text';
  static propTypes = {
    ...RNTextInput.propTypes,
    ...BaseComponent.propTypes,
    color: PropTypes.string,
    containerStyle: PropTypes.object,
    testId: PropTypes.string,
  };

  static defaultProps = {
    placeholderTextColor: Colors.dark60,
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getTypography() {
    return this.extractTypographyValue() || Typography.text70;
  }

  renderPlaceholder() {
    const {floatingPlaceholder} = this.props;
    const typography = this.getTypography();
    if (floatingPlaceholder) {
      return (
        <Text style={[this.styles.placeholder, typography]}>asdsad</Text>
      );
    }

    return null;
  }

  render() {
    const color = this.props.color || this.extractColorValue();
    const typography = this.getTypography();
    const {style, containerStyle, placeholder, floatingPlaceholder, ...others} = this.props;
    const inputStyle = [this.styles.input, style, typography, {height: typography.lineHeight}, color && {color}];

    return (
      <View style={[this.styles.container, containerStyle]}>
        {this.renderPlaceholder()}
        <RNTextInput
          {...others}
          placeholder={floatingPlaceholder ? undefined : placeholder}
          underlineColorAndroid="transparent"
          style={inputStyle}
        />
      </View>
    );
  }
}

function createStyles({placeholderTextColor}) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: Colors.dark80,
    },
    input: {
      flex: 1,
      marginBottom: 10,
      padding: 0,
    },
    placeholder: {
      position: 'absolute',
      color: placeholderTextColor,
    },
  });
}
