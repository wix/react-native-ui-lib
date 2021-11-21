import React, { PureComponent } from 'react';
import { TextProps as RNTextProps, TextStyle, Animated, StyleProp } from 'react-native';
import { BaseComponentInjectedProps, ForwardRefInjectedProps, MarginModifiers, TypographyModifiers, ColorsModifiers } from '../../commons/new';
export declare type TextProps = RNTextProps & TypographyModifiers & ColorsModifiers & MarginModifiers & {
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
export declare type TextPropTypes = TextProps;
declare type PropsTypes = BaseComponentInjectedProps & ForwardRefInjectedProps & TextProps;
/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendsLink: https://reactnative.dev/docs/text
 * @modifiers: margins, color, typography
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextScreen.js
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Modifiers.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Transformation.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Highlights.png?raw=true
 */
declare class Text extends PureComponent<PropsTypes> {
    static displayName: string;
    private TextContainer;
    renderText(children: any): any;
    render(): JSX.Element;
}
export { Text };
declare const _default: React.ComponentClass<TextProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
