import React from "react";
declare type HighlighterOverlayViewProps = {
    overlayColor?: string;
    borderRadius?: number;
    strokeColor?: string;
    strokeWidth?: number;
    visible: boolean;
    onRequestClose?: (...args: any[]) => any;
    highlightFrame?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    };
    style?: object | number | any[];
    highlightViewTag?: number;
    highlightViewTagParams?: {
        padding?: number | {
            top?: number;
            left?: number;
            bottom?: number;
            right?: number;
        };
        offset?: {
            x?: number;
            y?: number;
        };
    };
    minimumRectSize?: {
        width?: number;
        height?: number;
    };
    innerPadding?: number;
};
declare const HighlighterOverlayView: React.SFC<HighlighterOverlayViewProps>;
export default HighlighterOverlayView;
