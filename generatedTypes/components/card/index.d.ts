import React from 'react';
import { ViewStyle } from 'react-native';
import { ViewPropTypes } from '../view';
import { TouchableOpacityProps } from '../touchableOpacity';
import { CardSectionProps } from './CardSection';
export { CardSectionProps };
export declare type CardPropTypes = ViewPropTypes & TouchableOpacityProps & {
    /**
     * card custom width
     */
    width?: number | string;
    /**
     * card custom height
     */
    height?: number | string;
    /**
     * should inner card flow direction be horizontal
     */
    row?: boolean;
    /**
     * card border radius (will be passed to inner Card.Image component)
     */
    borderRadius?: number;
    /**
     * action for when pressing the card
     */
    onPress?: () => void;
    /**
     * whether the card should have shadow or not
     */
    enableShadow?: boolean;
    /**
     * elevation value (Android only)
     */
    elevation?: number;
    /**
     * enable blur effect (iOS only)
     */
    enableBlur?: boolean;
    /**
     * blur option for blur effect according to @react-native-community/blur lib (make sure enableBlur is on)
     */
    blurOptions?: object;
    /**
     * Additional styles for the top container
     */
    containerStyle?: ViewStyle;
    /**
     * Adds visual indication that the card is selected
     */
    selected?: boolean;
    /**
     * Custom options for styling the selection indication
     */
    selectionOptions?: {
        icon?: number;
        iconColor?: string;
        color?: string;
        borderWidth?: number;
        indicatorSize?: number;
        hideIndicator?: boolean;
    };
};
declare const _default: React.ComponentClass<ViewPropTypes & import("react-native").TouchableOpacityProps & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
    backgroundColor?: string | undefined;
    throttleTime?: number | undefined;
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    } | undefined;
    activeBackgroundColor?: string | undefined;
    useNative?: boolean | undefined;
    ref?: any;
} & {
    /**
     * card custom width
     */
    width?: string | number | undefined;
    /**
     * card custom height
     */
    height?: string | number | undefined;
    /**
     * should inner card flow direction be horizontal
     */
    row?: boolean | undefined;
    /**
     * card border radius (will be passed to inner Card.Image component)
     */
    borderRadius?: number | undefined;
    /**
     * action for when pressing the card
     */
    onPress?: (() => void) | undefined;
    /**
     * whether the card should have shadow or not
     */
    enableShadow?: boolean | undefined;
    /**
     * elevation value (Android only)
     */
    elevation?: number | undefined;
    /**
     * enable blur effect (iOS only)
     */
    enableBlur?: boolean | undefined;
    /**
     * blur option for blur effect according to @react-native-community/blur lib (make sure enableBlur is on)
     */
    blurOptions?: object | undefined;
    /**
     * Additional styles for the top container
     */
    containerStyle?: ViewStyle | undefined;
    /**
     * Adds visual indication that the card is selected
     */
    selected?: boolean | undefined;
    /**
     * Custom options for styling the selection indication
     */
    selectionOptions?: {
        icon?: number | undefined;
        iconColor?: string | undefined;
        color?: string | undefined;
        borderWidth?: number | undefined;
        indicatorSize?: number | undefined;
        hideIndicator?: boolean | undefined;
    } | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any> & {
    Image: React.ComponentType<import("./CardImage").CardImageProps>;
    Section: React.ComponentClass<ViewPropTypes & {
        content?: ((import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
            color?: string | undefined;
            center?: boolean | undefined;
            uppercase?: boolean | undefined;
            highlightString?: string | undefined;
            highlightStyle?: import("react-native").TextStyle | undefined;
            animated?: boolean | undefined;
            textAlign?: string | undefined;
        } & {
            text?: string | undefined;
        }) | (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
            color?: string | undefined;
            center?: boolean | undefined;
            uppercase?: boolean | undefined;
            highlightString?: string | undefined;
            highlightStyle?: import("react-native").TextStyle | undefined;
            animated?: boolean | undefined;
            textAlign?: string | undefined;
        } & {
            text?: string | undefined;
        }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
            color?: string | undefined;
            center?: boolean | undefined;
            uppercase?: boolean | undefined;
            highlightString?: string | undefined;
            highlightStyle?: import("react-native").TextStyle | undefined;
            animated?: boolean | undefined;
            textAlign?: string | undefined;
        } & {
            text?: string | undefined;
        }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
            color?: string | undefined;
            center?: boolean | undefined;
            uppercase?: boolean | undefined;
            highlightString?: string | undefined;
            highlightStyle?: import("react-native").TextStyle | undefined;
            animated?: boolean | undefined;
            textAlign?: string | undefined;
        } & {
            text?: string | undefined;
        }))[] | undefined;
        contentStyle?: ViewStyle | undefined;
        backgroundColor?: string | undefined;
        leadingIcon?: import("../image").ImageProps | undefined;
        trailingIcon?: import("../image").ImageProps | undefined;
        imageSource?: number | import("react-native").ImageURISource | import("react-native").ImageURISource[] | undefined;
        imageStyle?: import("react-native").ImageStyle | undefined;
        imageProps?: import("../image").ImageProps | undefined;
    } & {
        useCustomTheme?: boolean | undefined;
    }, any>;
};
export default _default;
