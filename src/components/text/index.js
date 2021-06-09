import _pt from "prop-types";
import React, { PureComponent } from 'react';
import { Text as RNText, StyleSheet, Animated } from 'react-native';
import _ from 'lodash';
import { asBaseComponent, forwardRef } from "../../commons/new";
import { Colors } from "../../style";

/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendsLink: https://facebook.github.io/react-native/docs/text.html
 * @modifiers: margins, color, typography
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextScreen.js
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Modifiers.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Transformation.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Highlights.png?raw=true
 */
class Text extends PureComponent {
  static propTypes = {
    /**
       * color of the text
       */
    color: _pt.string,

    /**
       * whether to center the text (using textAlign)
       */
    center: _pt.bool,

    /**
       * whether to change the text to uppercase
       */
    uppercase: _pt.bool,

    /**
       * Substring to highlight
       */
    highlightString: _pt.string,

    /**
       * Use Animated.Text as a container
       */
    animated: _pt.bool,
    textAlign: _pt.string
  };
  static displayName = 'Text';
  TextContainer = this.props.animated ? Animated.createAnimatedComponent(RNText) : RNText; // setNativeProps(nativeProps) {
  //   this._root.setNativeProps(nativeProps); // eslint-disable-line
  // }

  getTextPartsByHighlight(targetString = '', highlightString = '') {
    if (_.isEmpty(highlightString.trim())) {
      return [targetString];
    }

    const textParts = [];
    let highlightIndex;

    do {
      highlightIndex = targetString.toLowerCase().indexOf(highlightString.toLowerCase());

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
    const {
      highlightString,
      highlightStyle
    } = this.props;

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

          return <RNText key={index} style={shouldHighlight ? [styles.highlight, highlightStyle] : styles.notHighlight}>
              {text}
            </RNText>;
        });
      }
    }

    return children;
  }

  render() {
    const {
      modifiers,
      style,
      center,
      uppercase,
      children,
      forwardedRef,
      ...others
    } = this.props;
    const color = this.props.color || modifiers.color;
    const {
      margins,
      typography,
      backgroundColor,
      flexStyle
    } = modifiers;
    const textStyle = [styles.container, typography, color && {
      color
    }, backgroundColor && {
      backgroundColor
    }, flexStyle, margins, center && styles.centered, uppercase && styles.uppercase, style];
    const TextContainer = this.TextContainer;
    return <TextContainer {...others} style={textStyle} ref={forwardedRef}>
        {this.renderText(children)}
      </TextContainer>;
  }

}

const styles = StyleSheet.create({
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
export { Text }; // For tests

export default asBaseComponent(forwardRef(Text));