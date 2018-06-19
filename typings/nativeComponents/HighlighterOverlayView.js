import React from "react";
import { requireNativeComponent, processColor, Platform, StyleSheet, Modal } from "react-native";
const NativeHighlighterView = requireNativeComponent("HighlighterView", null);
const DefaultOverlayColor = "rgba(0, 0, 0, 0.5)";
const HighlighterOverlayView = props => {
    const { overlayColor, borderRadius, strokeColor, strokeWidth, visible, onRequestClose, highlightFrame, style, children, highlightViewTag, highlightViewTagParams, minimumRectSize, innerPadding } = props;
    let overlayColorToUse = overlayColor || DefaultOverlayColor;
    let strokeColorToUse = strokeColor;
    if (Platform.OS === "android") {
        overlayColorToUse = processColor(overlayColorToUse);
        strokeColorToUse = processColor(strokeColorToUse);
    }
    return (<Modal visible={!!visible} animationType={"fade"} transparent onRequestClose={() => onRequestClose && onRequestClose()}>
      <NativeHighlighterView highlightFrame={highlightFrame} style={[
        style,
        { ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }
    ]} overlayColor={overlayColorToUse} borderRadius={borderRadius} strokeColor={strokeColorToUse} strokeWidth={strokeWidth} highlightViewTag={highlightViewTag} highlightViewTagParams={highlightViewTagParams} minimumRectSize={minimumRectSize} innerPadding={innerPadding}/>
      {children}
    </Modal>);
};
export default HighlighterOverlayView;
