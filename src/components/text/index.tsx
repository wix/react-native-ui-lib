import React, {useMemo} from 'react';
import {Text as RNText, StyleSheet, TextProps as RNTextProps, TextStyle, Animated, StyleProp} from 'react-native';
import _ from 'lodash';
import {MarginModifiers, TypographyModifiers, ColorsModifiers} from '../../commons/new';
import {Colors} from 'style';
import {TextUtils} from 'utils';
import {useModifiers, useThemeProps} from 'hooks';

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

const AnimatedText = Animated.createAnimatedComponent(RNText);

/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendsLink: https://reactnative.dev/docs/text
 * @modifiers: margins, color, typography
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextScreen.tsx
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Modifiers.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Transformation.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Highlights.png?raw=true
 */
const Text = (props: TextProps, ref: any) => {
  const themeProps = useThemeProps(props, 'Text');
  const {
    animated,
    children,
    highlightString,
    highlightStyle,
    style,
    center,
    uppercase,
    underline,
    color: propsColor,
    ...others
  } = themeProps;
  const {
    margins,
    typography,
    backgroundColor,
    flexStyle,
    color: modifiersColor
  } = useModifiers(others, {
    typography: true,
    color: true,
    backgroundColor: true,
    margins: true,
    position: true,
    flex: true
  });

  const renderText = (children: any): any => {
    if (!_.isEmpty(highlightString)) {
      if (_.isArray(children)) {
        return _.map(children, (child: any) => {
          return renderText(child);
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
  };

  const TextComponents = animated ? AnimatedText : RNText;

  const textStyle = useMemo(() => {
    const color = propsColor || modifiersColor;
    return [
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
  }, [
    propsColor,
    modifiersColor,
    typography,
    backgroundColor,
    flexStyle,
    margins,
    center,
    uppercase,
    underline,
    style
  ]);

  return (
    <TextComponents {...others} style={textStyle} ref={ref}>
      {renderText(children)}
    </TextComponents>
  );
};

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

export default React.forwardRef<RNText, TextProps>(Text);
