import React, { PureComponent } from 'react';
import { TextProps as RNTextProps, TextStyle } from 'react-native';
import { BaseComponentInjectedProps, ForwardRefInjectedProps, MarginModifiers, TypographyModifiers, ColorsModifiers } from '../../commons/new';
export declare type TextProps = RNTextProps & TypographyModifiers & ColorsModifiers & MarginModifiers & {
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
    textAlign?: string;
};
export declare type TextPropTypes = TextProps;
declare type PropsTypes = BaseComponentInjectedProps & ForwardRefInjectedProps & TextProps;
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
declare const _default: React.ComponentClass<(RNTextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
    /**
     * color of the text
     */
    color?: string | undefined;
    /**
     * whether to center the text (using textAlign)
     */
    center?: boolean | undefined;
    /**
     * whether to change the text to uppercase
     */
    uppercase?: boolean | undefined;
    /**
     * Substring to highlight
     */
    highlightString?: string | undefined;
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle | undefined;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean | undefined;
    textAlign?: string | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}) | (RNTextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
    /**
     * color of the text
     */
    color?: string | undefined;
    /**
     * whether to center the text (using textAlign)
     */
    center?: boolean | undefined;
    /**
     * whether to change the text to uppercase
     */
    uppercase?: boolean | undefined;
    /**
     * Substring to highlight
     */
    highlightString?: string | undefined;
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle | undefined;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean | undefined;
    textAlign?: string | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}) | (RNTextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
    /**
     * color of the text
     */
    color?: string | undefined;
    /**
     * whether to center the text (using textAlign)
     */
    center?: boolean | undefined;
    /**
     * whether to change the text to uppercase
     */
    uppercase?: boolean | undefined;
    /**
     * Substring to highlight
     */
    highlightString?: string | undefined;
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle | undefined;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean | undefined;
    textAlign?: string | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}) | (RNTextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
    /**
     * color of the text
     */
    color?: string | undefined;
    /**
     * whether to center the text (using textAlign)
     */
    center?: boolean | undefined;
    /**
     * whether to change the text to uppercase
     */
    uppercase?: boolean | undefined;
    /**
     * Substring to highlight
     */
    highlightString?: string | undefined;
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle | undefined;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean | undefined;
    textAlign?: string | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}), any>;
export default _default;
