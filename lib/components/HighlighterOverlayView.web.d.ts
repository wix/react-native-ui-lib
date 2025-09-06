import React from 'react';
import { ViewStyle } from 'react-native';
type HighlightFrameType = {
    x: number;
    y: number;
    width: number;
    height: number;
};
type HighlightViewTagParams = {
    padding: number | ViewStyle['padding'];
    offset: Pick<HighlightFrameType, 'x' | 'y'>;
};
export type HighlighterOverlayViewProps = {
    visible: boolean;
    overlayColor?: string;
    borderRadius?: number;
    strokeColor?: string;
    strokeWidth?: number;
    onRequestClose?: () => void;
    highlightFrame?: HighlightFrameType;
    style?: ViewStyle;
    highlightViewTag?: number | null;
    children?: JSX.Element[] | JSX.Element;
    highlightViewTagParams?: HighlightViewTagParams;
    minimumRectSize?: Pick<HighlightFrameType, 'width' | 'height'>;
    innerPadding?: number;
    accessible?: boolean;
    testID?: string;
};
declare const HighlighterOverlayView: {
    (props: HighlighterOverlayViewProps): React.JSX.Element;
    displayName: string;
};
export default HighlighterOverlayView;
