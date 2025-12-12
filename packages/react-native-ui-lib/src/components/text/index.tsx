import _ from 'lodash';
import React, {PureComponent} from 'react';
import {
  Text as RNText,
  StyleSheet,
  TextProps as RNTextProps,
  TextStyle,
  Animated,
  StyleProp
} from 'react-native';
import {
  asBaseComponent,
  forwardRef,
  BaseComponentInjectedProps,
  ForwardRefInjectedProps,
  MarginModifiers,
  TypographyModifiers,
  ColorsModifiers,
  FlexModifiers,
  Constants
} from '../../commons/new';
import {RecorderProps} from '../../typings/recorderTypes';
import {Colors} from 'style';
import {TextUtils} from 'utils';

enum writingDirectionTypes {
  RTL = 'rtl',
  LTR = 'ltr'
}

export interface HighlightStringProps {
  /**
   * Substring to highlight
   */
  string: string;
  /**
   * Callback for when a highlighted substring is pressed
   */
  onPress?: () => void;
  /**
   * Custom highlight style for this specific highlighted substring. If not provided, the general `highlightStyle` prop style will be used
   */
  style?: TextStyle;
  testID?: string;
}

export type HighlightString = string | HighlightStringProps;

export type TextProps = Omit<RNTextProps, 'style'> &
  TypographyModifiers &
  ColorsModifiers &
  MarginModifiers &
  FlexModifiers &
  RecorderProps & {
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
     * Substring to highlight. Can be a simple string or a HighlightStringProps object, or an array of the above
     */
    highlightString?: HighlightString | HighlightString[];
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
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/src/screens/componentScreens/TextScreen.tsx
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/showcase/Text/Modifiers.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/showcase/Text/Transformation.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/showcase/Text/Highlights.png?raw=true
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
                style={text.shouldHighlight ? text.style ?? [styles.highlight, highlightStyle] : styles.notHighlight}
                onPress={text.onPress}
                testID={text.testID}
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
    const {
      // (!) extract flex prop to avoid passing them on Android
      // TODO: extract alignment (top, right, ...) props till we manage to exclude them from typings
      /* eslint-disable */
      flex,
      // @ts-ignore
      left,
      // @ts-ignore
      top,
      // @ts-ignore
      right,
      // @ts-ignore
      bottom,
      /* eslint-enable */
      modifiers,
      style,
      center,
      uppercase,
      underline,
      children,
      forwardedRef,
      recorderTag,
      ...others
    } = this.props;
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
      <TextContainer fsTagName={recorderTag} {...others} style={textStyle} ref={forwardedRef}>
        {this.renderText(children)}
      </TextContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    color: Colors.$textDefault,
    ...(Constants.isIOS
      ? {
        textAlign: 'left',
        writingDirection: Constants.isRTL ? writingDirectionTypes.RTL : writingDirectionTypes.LTR
      }
      : undefined)
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

const modifiersOptions = {
  color: true,
  margins: true,
  typography: true,
  backgroundColor: true,
  flex: true
};

export default asBaseComponent<TextProps>(forwardRef<PropsTypes>(Text), {modifiersOptions});
