import PropTypes from 'prop-types';
import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import {PureBaseComponent} from '../../commons';
import {Colors} from '../../style';
import _ from 'lodash';

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
    uppercase: PropTypes.bool,
    /**
     * Substring to highlight
     */
    highlightString: PropTypes.string,
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
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

  getTextPartsByHighlight(targetString = '', highlightString = '') {
    if (_.isEmpty(highlightString.trim())) {
      return [targetString];
    }

    const textParts = [];
    let highlightIndex;

    do {
      highlightIndex = _.lowerCase(targetString).indexOf(_.lowerCase(highlightString));
      if (highlightIndex !== -1) {
        if (highlightIndex > 0) {
          textParts.push(targetString.substring(0, highlightIndex));
        }
        textParts.push(targetString.substr(highlightIndex, highlightString.length));
        targetString = targetString.substr(highlightIndex + highlightString.length);
      } else {
        textParts.push(targetString);
      }
    } while (highlightIndex !== -1);

    return textParts;
  }

  renderText(children) {
    const {highlightString, highlightStyle} = this.props;

    if (!_.isEmpty(highlightString)) {
      if (_.isArray(children)) {
        return _.map(children, child => {
          return this.renderText(child);
        });
      }

      if (_.isString(children)) {
        const textParts = this.getTextPartsByHighlight(children, highlightString);
        return _.map(textParts, (text, index) => {
          const shouldHighlight = _.lowerCase(text) === _.lowerCase(highlightString);
          return (
            <Text
              key={index}
              style={shouldHighlight ? [this.styles.highlight, highlightStyle] : this.styles.notHighlight}
            >
              {text}
            </Text>
          );
        });
      }
    }
    return children;
  }

  render() {
    const color = this.getThemeProps().color || this.extractColorValue();
    const typography = this.extractTypographyValue();
    const {style, center, uppercase, children, ...others} = this.getThemeProps();
    const {margins} = this.state;
    const textStyle = [
      this.styles.container,
      typography,
      color && {color},
      margins,
      center && this.styles.centered,
      uppercase && this.styles.uppercase,
      style
    ];

    return (
      <RNText {...others} style={textStyle} ref={this.setRef}>
        {this.renderText(children)}
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
    },
    centered: {
      textAlign: 'center'
    },
    uppercase: {
      textTransform: 'uppercase'
    },
    highlight: {
      color: Colors.grey30
    },
    notHighlight: {
      color: undefined
    }
  });
}
