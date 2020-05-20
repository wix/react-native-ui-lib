import React, { PureComponent } from 'react';
import { TextProps, TextStyle } from 'react-native';
import { BaseComponentInjectedProps, ForwardRefInjectedProps, MarginModifiers, TypographyModifiers, ColorsModifiers } from '../../commons/new';
export declare type TextPropTypes = TextProps & TypographyModifiers & ColorsModifiers & MarginModifiers & {
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
};
declare type PropsTypes = BaseComponentInjectedProps & ForwardRefInjectedProps & TextPropTypes;
/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendslink: https://facebook.github.io/react-native/docs/text.html
 * @modifiers: margins, color, typography
 */
declare class Text extends PureComponent<PropsTypes> {
    static displayName: string;
    private TextContainer;
    getTextPartsByHighlight(targetString?: string, highlightString?: string): string[];
    renderText(children: any): any;
    render(): JSX.Element;
}
export { Text };
declare const _default: React.ComponentType<TextPropTypes>;
export default _default;
