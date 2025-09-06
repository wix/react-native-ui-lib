import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorsModifiers } from '../../commons/new';
export interface ColorInfo {
    index?: number;
    tintColor?: string;
    /**
     * The color result with 6 characters (#FFFFFF and never #FFF)
     */
    hexString: string;
}
interface Props {
    /**
     * The identifier value of the ColorSwatch in a ColorSwatch palette.
     * Must be different than other ColorSwatches in the same group
     */
    value?: string;
    /**
     * The color of the ColorSwatch
     */
    color?: string;
    /**
     * Is the initial state is selected
     */
    selected?: boolean;
    /**
     * Is the initial state is unavailable
     */
    unavailable?: boolean;
    /**
     * Is first render should be animated
     */
    animated?: boolean;
    /**
     * onPress callback
     */
    onPress?: (value: string, colorInfo: ColorInfo) => void;
    index?: number;
    style?: StyleProp<ViewStyle>;
    testID?: string;
    /**
     * Color swatch size
     */
    size?: number;
}
export type ColorSwatchProps = Props & ColorsModifiers;
export declare const SWATCH_MARGIN = 12;
export declare const SWATCH_SIZE: number;
declare const _default: React.ForwardRefExoticComponent<((Props & Partial<Record<"transparent" | "black" | "white" | "dark" | "$backgroundDefault" | "$backgroundElevated" | "$backgroundElevatedLight" | "$backgroundNeutralHeavy" | "$backgroundNeutralIdle" | "$backgroundNeutralMedium" | "$backgroundNeutral" | "$backgroundNeutralLight" | "$backgroundPrimaryHeavy" | "$backgroundPrimaryMedium" | "$backgroundPrimaryLight" | "$backgroundGeneralHeavy" | "$backgroundGeneralMedium" | "$backgroundGeneralLight" | "$backgroundSuccessHeavy" | "$backgroundSuccessLight" | "$backgroundWarningHeavy" | "$backgroundWarningLight" | "$backgroundMajorLight" | "$backgroundMajorHeavy" | "$backgroundDangerHeavy" | "$backgroundDangerLight" | "$backgroundDisabled" | "$backgroundDark" | "$backgroundDarkElevated" | "$backgroundDarkActive" | "$backgroundInverted" | "$textDisabled" | "$textDefault" | "$textNeutralHeavy" | "$textNeutral" | "$textNeutralLight" | "$textDefaultLight" | "$textPrimary" | "$textGeneral" | "$textSuccess" | "$textSuccessLight" | "$textMajor" | "$textDanger" | "$textDangerLight" | "$iconDefault" | "$iconNeutral" | "$iconDefaultLight" | "$iconPrimary" | "$iconPrimaryLight" | "$iconGeneral" | "$iconGeneralLight" | "$iconSuccess" | "$iconSuccessLight" | "$iconMajor" | "$iconDanger" | "$iconDangerLight" | "$iconDisabled" | "$outlineDefault" | "$outlineDisabled" | "$outlineDisabledHeavy" | "$outlineNeutral" | "$outlineNeutralHeavy" | "$outlinePrimary" | "$outlinePrimaryMedium" | "$outlineGeneral" | "$outlineWarning" | "$outlineDanger" | "$outlineInverted" | "$black" | "$white" | "grey1" | "grey5" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue1" | "blue5" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green1" | "green5" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow1" | "yellow5" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange1" | "orange5" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red1" | "red5" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple1" | "purple5" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet1" | "violet5" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>>) | Omit<Props & import("../../commons/modifiers").CustomModifier, "ref">) & React.RefAttributes<any>>;
export default _default;
