import React from 'react';
import { type LayoutRectangle } from 'react-native';
import { LayoutStyle, HintProps, PaddingsStyle } from './types';
interface HintAnchorProps extends HintProps {
    showHint: boolean;
    isUsingModal: boolean;
    targetLayout?: LayoutRectangle;
    hintContainerLayout: LayoutStyle;
    hintPadding: PaddingsStyle;
    hintAnimatedStyle: any;
}
export default function HintAnchor({ children, showHint, isUsingModal, targetLayout, containerWidth, testID, hintContainerLayout, hintPadding, hintAnimatedStyle, style, ...others }: HintAnchorProps): React.JSX.Element;
export {};
