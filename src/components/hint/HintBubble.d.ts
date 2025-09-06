import React from 'react';
import { View as RNView, LayoutChangeEvent } from 'react-native';
import { HintProps } from './types';
interface HintBubbleProps extends Pick<HintProps, 'testID' | 'visible' | 'message' | 'messageStyle' | 'color' | 'removePaddings' | 'enableShadow' | 'borderRadius' | 'iconStyle' | 'icon' | 'customContent'> {
    hintRef: React.RefObject<RNView>;
    setHintLayout: (layoutChangeEvent: LayoutChangeEvent) => void;
    hintPositionStyle: {
        left: number;
    };
}
export default function HintBubble({ visible, message, messageStyle, icon, iconStyle, borderRadius, removePaddings, enableShadow, color, customContent, testID, hintRef, hintPositionStyle, setHintLayout }: HintBubbleProps): React.JSX.Element;
export {};
