import PropTypes from 'prop-types';
import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import {PureBaseComponent} from '../../commons';

/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendslink: https://facebook.github.io/react-native/docs/text.html
 * @modifiers: margins, color, typography
 */
export default class Text extends PureBaseComponent {
  static displayName = 'Text';
  static propTypes = {
    ...RNText.propTypes,
    // ...PureBaseComponent.propTypes,
    /**
     * color of the text
     */
    color: PropTypes.string,
    /**
     * whether to center the text (using textAlign)
     */
    center: PropTypes.bool,
    /**
     * whether to change the text to uppercase
     */
    uppercase: PropTypes.bool
  };

  // static defaultProps = {
  //   color: Colors.dark10,
  // }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps); // eslint-disable-line
  }

  render() {
    const color = this.getThemeProps().color || this.extractColorValue();
    const typography = this.extractTypographyValue();
    const {style, center, uppercase, ...others} = this.getThemeProps();
    const {margins} = this.state;
    const textStyle = [
      this.styles.container,
      typography,
      color && {color},
      margins,
      center && {textAlign: 'center'},
      style
    ];
    const children = uppercase ? this.transformToUppercase(this.props.children) : this.props.children;

    return (
      <RNText {...others} style={textStyle} ref={this.setRef}>
        {children}
      </RNText>
    );
  }

  transformToUppercase(items) {
    if (typeof items === 'string') {
      return items.toUpperCase();
    }
    return items;
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      textAlign: 'left'
    }
  });
}
