import React, {PureComponent} from 'react';
import {Text as RNText, StyleSheet, TextProps, TextStyle, Animated} from 'react-native';
import {
  asBaseComponent,
  forwardRef,
  BaseComponentInjectedProps,
  ForwardRefInjectedProps,
  MarginModifiers,
  TypographyModifiers,
  ColorsModifiers
} from '../../commons/new';
import {Colors} from '../../style';
import _ from 'lodash';


export type TextPropTypes = TextProps & TypographyModifiers & ColorsModifiers & MarginModifiers & {
  /**
   * color of the text
   */
  color?: string;
  /**
   * whether to center the text (using textAlign)
   */
  center?: boolean;
  /**
   * whether to change the text to uppercase
   */
  uppercase?: boolean;
  /**
   * Substring to highlight
   */
  highlightString?: string;
  /**
   * Custom highlight style for highlight string
   */
  highlightStyle?: TextStyle;
  /**
   * Use Animated.Text as a container
   */
  animated?: boolean;

  ref?: any;
  textAlign?: string;
}

type PropsTypes = BaseComponentInjectedProps & ForwardRefInjectedProps & TextPropTypes;

/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendslink: https://facebook.github.io/react-native/docs/text.html
 * @modifiers: margins, color, typography
 */
class Text extends PureComponent<PropsTypes> {
  static displayName = 'Text';
  private TextContainer: React.ClassType<any, any, any> = this.props.animated
    ? Animated.createAnimatedComponent(RNText)
    : RNText;

  // setNativeProps(nativeProps) {
  //   this._root.setNativeProps(nativeProps); // eslint-disable-line
  // }

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

  renderText(children: any): any {
    const {highlightString, highlightStyle} = this.props;

    if (!_.isEmpty(highlightString)) {
      if (_.isArray(children)) {
        return _.map(children, (child) => {
          return this.renderText(child);
        });
      }

      if (_.isString(children)) {
        const textParts = this.getTextPartsByHighlight(children, highlightString);
        return _.map(textParts, (text, index) => {
          const shouldHighlight = _.lowerCase(text) === _.lowerCase(highlightString);
          return (
            <RNText key={index} style={shouldHighlight ? [styles.highlight, highlightStyle] : styles.notHighlight}>
              {text}
            </RNText>
          );
        });
      }
    }
    return children;
  }

  render() {
    const {modifiers, style, center, uppercase, children, forwardedRef, ...others} = this.props;
    const color = this.props.color || modifiers.color;
    const {margins, typography, backgroundColor, flexStyle} = modifiers;
    const textStyle = [
      styles.container,
      typography,
      color && {color},
      backgroundColor && {backgroundColor},
      flexStyle,
      margins,
      center && styles.centered,
      uppercase && styles.uppercase,
      style
    ];

    const TextContainer = this.TextContainer;

    return (
      <TextContainer {...others} style={textStyle} ref={forwardedRef}>
        {this.renderText(children)}
      </TextContainer>
    );
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

export {Text}; // For tests

export default asBaseComponent<TextPropTypes>(forwardRef(Text));
