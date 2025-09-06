import React, { PureComponent } from 'react';
import { TextProps as RNTextProps, TextStyle, Animated, StyleProp } from 'react-native';
import { BaseComponentInjectedProps, ForwardRefInjectedProps, MarginModifiers, TypographyModifiers, ColorsModifiers, FlexModifiers } from '../../commons/new';
import { RecorderProps } from '../../typings/recorderTypes';
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
export type TextProps = Omit<RNTextProps, 'style'> & TypographyModifiers & ColorsModifiers & MarginModifiers & FlexModifiers & RecorderProps & {
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
export type TextPropTypes = TextProps;
type PropsTypes = BaseComponentInjectedProps & ForwardRefInjectedProps & TextProps;
/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendsLink: https://reactnative.dev/docs/text
 * @modifiers: margins, color, typography
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextScreen.tsx
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Modifiers.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Transformation.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Highlights.png?raw=true
 */
declare class Text extends PureComponent<PropsTypes> {
    static displayName: string;
    private TextContainer;
    renderText(children: any): any;
    render(): React.JSX.Element;
}
export { Text };
declare const _default: React.ForwardRefExoticComponent<((Omit<RNTextProps, "style"> & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"transparent" | "black" | "white" | "dark" | "$backgroundDefault" | "$backgroundElevated" | "$backgroundElevatedLight" | "$backgroundNeutralHeavy" | "$backgroundNeutralIdle" | "$backgroundNeutralMedium" | "$backgroundNeutral" | "$backgroundNeutralLight" | "$backgroundPrimaryHeavy" | "$backgroundPrimaryMedium" | "$backgroundPrimaryLight" | "$backgroundGeneralHeavy" | "$backgroundGeneralMedium" | "$backgroundGeneralLight" | "$backgroundSuccessHeavy" | "$backgroundSuccessLight" | "$backgroundWarningHeavy" | "$backgroundWarningLight" | "$backgroundMajorLight" | "$backgroundMajorHeavy" | "$backgroundDangerHeavy" | "$backgroundDangerLight" | "$backgroundDisabled" | "$backgroundDark" | "$backgroundDarkElevated" | "$backgroundDarkActive" | "$backgroundInverted" | "$textDisabled" | "$textDefault" | "$textNeutralHeavy" | "$textNeutral" | "$textNeutralLight" | "$textDefaultLight" | "$textPrimary" | "$textGeneral" | "$textSuccess" | "$textSuccessLight" | "$textMajor" | "$textDanger" | "$textDangerLight" | "$iconDefault" | "$iconNeutral" | "$iconDefaultLight" | "$iconPrimary" | "$iconPrimaryLight" | "$iconGeneral" | "$iconGeneralLight" | "$iconSuccess" | "$iconSuccessLight" | "$iconMajor" | "$iconDanger" | "$iconDangerLight" | "$iconDisabled" | "$outlineDefault" | "$outlineDisabled" | "$outlineDisabledHeavy" | "$outlineNeutral" | "$outlineNeutralHeavy" | "$outlinePrimary" | "$outlinePrimaryMedium" | "$outlineGeneral" | "$outlineWarning" | "$outlineDanger" | "$outlineInverted" | "$black" | "$white" | "grey1" | "grey5" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue1" | "blue5" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green1" | "green5" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow1" | "yellow5" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange1" | "orange5" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red1" | "red5" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple1" | "purple5" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet1" | "violet5" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & RecorderProps & {
    /**
     * color of the text
     */
    color?: string | undefined;
    /**
     * Whether to center the text (using textAlign)
     */
    center?: boolean | undefined;
    /**
     * Whether to change the text to uppercase
     */
    uppercase?: boolean | undefined;
    /**
     * Whether to add an underline
     */
    underline?: boolean | undefined;
    /**
     * Substring to highlight. Can be a simple string or a HighlightStringProps object, or an array of the above
     */
    highlightString?: HighlightString | HighlightString[] | undefined;
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle | undefined;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean | undefined;
    textAlign?: string | undefined;
    style?: StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>;
}) | Omit<Omit<RNTextProps, "style"> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & RecorderProps & {
    /**
     * color of the text
     */
    color?: string | undefined;
    /**
     * Whether to center the text (using textAlign)
     */
    center?: boolean | undefined;
    /**
     * Whether to change the text to uppercase
     */
    uppercase?: boolean | undefined;
    /**
     * Whether to add an underline
     */
    underline?: boolean | undefined;
    /**
     * Substring to highlight. Can be a simple string or a HighlightStringProps object, or an array of the above
     */
    highlightString?: HighlightString | HighlightString[] | undefined;
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle | undefined;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean | undefined;
    textAlign?: string | undefined;
    style?: StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>;
}, "ref"> | Omit<Omit<RNTextProps, "style"> & import("../../commons/modifiers").CustomModifier & Partial<Record<"transparent" | "black" | "white" | "dark" | "$backgroundDefault" | "$backgroundElevated" | "$backgroundElevatedLight" | "$backgroundNeutralHeavy" | "$backgroundNeutralIdle" | "$backgroundNeutralMedium" | "$backgroundNeutral" | "$backgroundNeutralLight" | "$backgroundPrimaryHeavy" | "$backgroundPrimaryMedium" | "$backgroundPrimaryLight" | "$backgroundGeneralHeavy" | "$backgroundGeneralMedium" | "$backgroundGeneralLight" | "$backgroundSuccessHeavy" | "$backgroundSuccessLight" | "$backgroundWarningHeavy" | "$backgroundWarningLight" | "$backgroundMajorLight" | "$backgroundMajorHeavy" | "$backgroundDangerHeavy" | "$backgroundDangerLight" | "$backgroundDisabled" | "$backgroundDark" | "$backgroundDarkElevated" | "$backgroundDarkActive" | "$backgroundInverted" | "$textDisabled" | "$textDefault" | "$textNeutralHeavy" | "$textNeutral" | "$textNeutralLight" | "$textDefaultLight" | "$textPrimary" | "$textGeneral" | "$textSuccess" | "$textSuccessLight" | "$textMajor" | "$textDanger" | "$textDangerLight" | "$iconDefault" | "$iconNeutral" | "$iconDefaultLight" | "$iconPrimary" | "$iconPrimaryLight" | "$iconGeneral" | "$iconGeneralLight" | "$iconSuccess" | "$iconSuccessLight" | "$iconMajor" | "$iconDanger" | "$iconDangerLight" | "$iconDisabled" | "$outlineDefault" | "$outlineDisabled" | "$outlineDisabledHeavy" | "$outlineNeutral" | "$outlineNeutralHeavy" | "$outlinePrimary" | "$outlinePrimaryMedium" | "$outlineGeneral" | "$outlineWarning" | "$outlineDanger" | "$outlineInverted" | "$black" | "$white" | "grey1" | "grey5" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue1" | "blue5" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green1" | "green5" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow1" | "yellow5" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange1" | "orange5" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red1" | "red5" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple1" | "purple5" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet1" | "violet5" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & RecorderProps & {
    /**
     * color of the text
     */
    color?: string | undefined;
    /**
     * Whether to center the text (using textAlign)
     */
    center?: boolean | undefined;
    /**
     * Whether to change the text to uppercase
     */
    uppercase?: boolean | undefined;
    /**
     * Whether to add an underline
     */
    underline?: boolean | undefined;
    /**
     * Substring to highlight. Can be a simple string or a HighlightStringProps object, or an array of the above
     */
    highlightString?: HighlightString | HighlightString[] | undefined;
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle | undefined;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean | undefined;
    textAlign?: string | undefined;
    style?: StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>;
}, "ref"> | Omit<Omit<RNTextProps, "style"> & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & RecorderProps & {
    /**
     * color of the text
     */
    color?: string | undefined;
    /**
     * Whether to center the text (using textAlign)
     */
    center?: boolean | undefined;
    /**
     * Whether to change the text to uppercase
     */
    uppercase?: boolean | undefined;
    /**
     * Whether to add an underline
     */
    underline?: boolean | undefined;
    /**
     * Substring to highlight. Can be a simple string or a HighlightStringProps object, or an array of the above
     */
    highlightString?: HighlightString | HighlightString[] | undefined;
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle | undefined;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean | undefined;
    textAlign?: string | undefined;
    style?: StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>;
}, "ref">) & React.RefAttributes<any>>;
export default _default;
