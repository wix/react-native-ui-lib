import React, {PureComponent} from 'react';
import {Text as RNText, StyleSheet, TextProps as RNTextProps, TextStyle, Animated, StyleProp} from 'react-native';
import _ from 'lodash';
import {
  asBaseComponent,
  forwardRef,
  BaseComponentInjectedProps,
  ForwardRefInjectedProps,
  MarginModifiers,
  TypographyModifiers,
  ColorsModifiers
} from '../../commons/new';
import {Colors} from 'style';
import {TextUtils} from 'utils';

export type TextProps = RNTextProps &
  TypographyModifiers &
  ColorsModifiers &
  MarginModifiers & {
    /**
     * color of the text
     */
    color?: string;
    /**
     * Whether to center the text (using textAlign)
     */
    center?: boolean;
    /**
     * Whether to change the text to uppercase
     */
    uppercase?: boolean;
    /**
     * Whether to add an underline
     */
    underline?: boolean;
    /**
     * Substring to highlight
     */
    highlightString?: string | string[];
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean;
    textAlign?: string;
    style?: StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>;
  };
export type TextPropTypes = TextProps; //TODO: remove after ComponentPropTypes deprecation;

type PropsTypes = BaseComponentInjectedProps & ForwardRefInjectedProps & TextProps;

/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendsLink: https://reactnative.dev/docs/text
 * @modifiers: margins, color, typography
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextScreen.tsx
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Modifiers.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Transformation.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Highlights.png?raw=true
 */
class Text extends PureComponent<PropsTypes> {
  static displayName = 'Text';
  private TextContainer: React.ClassType<any, any, any> = this.props.animated
    ? Animated.createAnimatedComponent(RNText)
    : RNText;

  // setNativeProps(nativeProps) {
  //   this._root.setNativeProps(nativeProps); // eslint-disable-line
  // }

  renderText(children: any): any {
    const {highlightString, highlightStyle} = this.props;

    if (!_.isEmpty(highlightString)) {
      if (_.isArray(children)) {
        return _.map(children, child => {
          return this.renderText(child);
        });
      }

      if (_.isString(children)) {
        const textParts = highlightString && TextUtils.getPartsByHighlight(children, highlightString);
        return (
          textParts &&
          _.map(textParts, (text, index) => {
            return (
              <RNText
                key={index}
                style={text.shouldHighlight ? [styles.highlight, highlightStyle] : styles.notHighlight}
              >
                {text.string}
              </RNText>
            );
          })
        );
      }
    }
    return children;
  }

  render() {
    const {modifiers, style, center, uppercase, underline, children, forwardedRef, ...others} = this.props;
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
      underline && styles.underline,
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
    textAlign: 'left',
    color: Colors.$textDefault
  },
  centered: {
    textAlign: 'center'
  },
  uppercase: {
    textTransform: 'uppercase'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  highlight: {
    color: Colors.grey30
  },
  notHighlight: {
    color: undefined
  }
});

export {Text}; // For tests

export default asBaseComponent<TextProps>(forwardRef<PropsTypes>(Text));
