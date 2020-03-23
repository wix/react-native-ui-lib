import React from 'react';
import { TextProps, TextStyle } from 'react-native';
import { BaseComponentInjectedProps, ForwardRefInjectedProps } from '../../commons/new';
import { MarginModifiers } from '../../../typings/modifiers';
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
}
declare type PropsTypes = BaseComponentInjectedProps & TextPropTypes & ForwardRefInjectedProps & MarginModifiers;
declare const _default: React.ComponentType<Pick<Pick<PropsTypes, "margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV" | "center" | "style" | "testID" | "modifiers" | "onLayout" | "nativeID" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityStates" | "accessibilityState" | "accessibilityHint" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "highlightString" | "color" | "uppercase" | "highlightStyle" | "allowFontScaling" | "ellipsizeMode" | "lineBreakMode" | "numberOfLines" | "onPress" | "onLongPress" | "maxFontSizeMultiplier" | "adjustsFontSizeToFit" | "minimumFontScale" | "suppressHighlighting" | "selectable" | "selectionColor" | "textBreakStrategy">, "margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV" | "center" | "style" | "testID" | "onLayout" | "nativeID" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityStates" | "accessibilityState" | "accessibilityHint" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "highlightString" | "color" | "uppercase" | "highlightStyle" | "allowFontScaling" | "ellipsizeMode" | "lineBreakMode" | "numberOfLines" | "onPress" | "onLongPress" | "maxFontSizeMultiplier" | "adjustsFontSizeToFit" | "minimumFontScale" | "suppressHighlighting" | "selectable" | "selectionColor" | "textBreakStrategy">>;
export default _default;
