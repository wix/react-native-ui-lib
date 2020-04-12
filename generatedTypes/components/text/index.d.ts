import React, { PureComponent } from 'react';
import { TextProps, TextStyle } from 'react-native';
import { BaseComponentInjectedProps, ForwardRefInjectedProps } from '../../commons/new';
import { MarginModifiers, TypographyModifiers, ColorsModifiers } from '../../../typings/modifiers';
interface TextPropTypes extends TextProps {
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
declare type PropsTypes = BaseComponentInjectedProps & TextPropTypes & ForwardRefInjectedProps & MarginModifiers & TypographyModifiers & ColorsModifiers;
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
declare const _default: React.ComponentType<Pick<Pick<PropsTypes, "black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80" | "margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV" | "text10" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text20B" | "text30" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text60B" | "text65" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL" | "center" | "style" | "testID" | "ref" | "body" | "main" | "title" | "modifiers" | "titleHuge" | "titleBig" | "subheading" | "numeric" | "mainBold" | "mainBlack" | "bodyBold" | "bodySmall" | "bodySmallBold" | "subtext" | "color" | "uppercase" | "highlightString" | "highlightStyle" | "animated" | "textAlign" | "allowFontScaling" | "ellipsizeMode" | "lineBreakMode" | "numberOfLines" | "onLayout" | "onPress" | "onLongPress" | "nativeID" | "maxFontSizeMultiplier" | "adjustsFontSizeToFit" | "minimumFontScale" | "suppressHighlighting" | "selectable" | "selectionColor" | "textBreakStrategy" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityStates" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors">, "black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80" | "margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV" | "text10" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text20B" | "text30" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text60B" | "text65" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL" | "center" | "style" | "testID" | "ref" | "body" | "main" | "title" | "titleHuge" | "titleBig" | "subheading" | "numeric" | "mainBold" | "mainBlack" | "bodyBold" | "bodySmall" | "bodySmallBold" | "subtext" | "color" | "uppercase" | "highlightString" | "highlightStyle" | "animated" | "textAlign" | "allowFontScaling" | "ellipsizeMode" | "lineBreakMode" | "numberOfLines" | "onLayout" | "onPress" | "onLongPress" | "nativeID" | "maxFontSizeMultiplier" | "adjustsFontSizeToFit" | "minimumFontScale" | "suppressHighlighting" | "selectable" | "selectionColor" | "textBreakStrategy" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityStates" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors">>;
export default _default;
