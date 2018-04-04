import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {BaseComponent} from '../../commons';

/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendslink: https://facebook.github.io/react-native/docs/text.html
 * @modifiers: margins, color, typography
 */
export default class Text extends BaseComponent {
  static displayName = 'Text';
  static propTypes = {
    ...RNText.propTypes,
    ...BaseComponent.propTypes,
    /**
     * color of the text
     */
    color: PropTypes.string,
    /**
     * whether to center the text (using textAlign)
     */
    center: PropTypes.bool,
    testID: PropTypes.string,
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
    const color = this.props.color || this.extractColorValue();
    const typography = this.extractTypographyValue();
    const {style, center, ...others} = this.getThemeProps();
    const {margins} = this.state;
    const textStyle = [
      this.styles.container,
      typography,
      color && {color},
      margins,
      center && {textAlign: 'center'},
      style,
    ];
    return (
      <RNText {...others} style={textStyle} ref={r => (this.text = r)}>
        {this.props.children}
      </RNText>
    );
  }

  measure(...args) {
    this.text.measure(...args);
  }

  measureInWindow(...args) {
    this.text.measureInWindow(...args);
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
  });
}
