import React from 'react';
import {processColor, StyleSheet, Modal, ViewStyle} from 'react-native';
// Import the Codegen specification for New Architecture
import HighlighterViewNativeComponent, {
  HighlightViewTagParams as NativeHighlightViewTagParams
} from './HighlighterViewNativeComponent';

const DefaultOverlayColor = 'rgba(0, 0, 0, 0.5)';

type HighlightFrameType = {
  x: number;
  y: number;
  width: number;
  height: number;
}

type HighlightViewTagParams = {
  padding: number | ViewStyle['padding'];
  offset: Pick<HighlightFrameType, 'x' | 'y'>;
}

export type HighlighterOverlayViewProps = {
  visible: boolean;
  overlayColor?: string;
  borderRadius?: number;
  strokeColor?: string;
  strokeWidth?: number;
  onRequestClose?: () => void;
  highlightFrame?: HighlightFrameType;
  style?: ViewStyle;
  highlightViewTag?: number;
  children?: JSX.Element[] | JSX.Element;
  highlightViewTagParams?: HighlightViewTagParams;
  minimumRectSize?: Pick<HighlightFrameType, 'width' | 'height'>;
  innerPadding?: number;
  accessible?: boolean;
  testID?: string;
};

const HighlighterOverlayView = (props: HighlighterOverlayViewProps) => {
  const {
    overlayColor,
    borderRadius,
    strokeColor,
    strokeWidth,
    visible,
    onRequestClose,
    highlightFrame,
    style,
    children,
    highlightViewTag,
    highlightViewTagParams,
    minimumRectSize,
    innerPadding
  } = props;

  // Process colors for New Architecture Codegen component
  const overlayColorToUse = processColor(overlayColor || DefaultOverlayColor) as number;
  const strokeColorToUse = strokeColor ? (processColor(strokeColor) as number) : undefined;

  // Convert highlightViewTagParams to match native Codegen spec
  let nativeHighlightViewTagParams: NativeHighlightViewTagParams | undefined;
  if (highlightViewTagParams) {
    const padding = typeof highlightViewTagParams.padding === 'number' ? highlightViewTagParams.padding : 0;
    nativeHighlightViewTagParams = {
      paddingLeft: padding,
      paddingTop: padding,
      paddingRight: padding,
      paddingBottom: padding,
      offsetX: highlightViewTagParams.offset?.x || 0,
      offsetY: highlightViewTagParams.offset?.y || 0
    };
  }

  return (
    <Modal
      visible={!!(visible)}
      animationType={'fade'}
      transparent
      onRequestClose={() => onRequestClose?.()}
    >
      <HighlighterViewNativeComponent
        highlightFrame={highlightFrame}
        style={[style, {...StyleSheet.absoluteFillObject, backgroundColor: 'transparent'}]}
        overlayColor={overlayColorToUse}
        borderRadius={borderRadius}
        strokeColor={strokeColorToUse}
        strokeWidth={strokeWidth}
        highlightViewTag={highlightViewTag}
        highlightViewTagParams={nativeHighlightViewTagParams}
        minimumRectSize={minimumRectSize}
        innerPadding={innerPadding}
        testID={props.testID}
        accessible={props.accessible}
      />
      {children}
    </Modal>
  );
};

HighlighterOverlayView.displayName = 'IGNORE';
export default HighlighterOverlayView;
