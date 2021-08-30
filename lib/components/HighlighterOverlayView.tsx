import React from 'react';
import {requireNativeComponent, processColor, Platform, StyleSheet, Modal, ViewStyle} from 'react-native';

const NativeHighlighterView = requireNativeComponent('HighlighterView');
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
  highlightViewTag?: number | null;
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

  let overlayColorToUse = overlayColor || DefaultOverlayColor;
  let strokeColorToUse = strokeColor;
  if (Platform.OS === 'android') {
    // @ts-ignore
    overlayColorToUse = processColor(overlayColorToUse);
    // @ts-ignore
    strokeColorToUse = processColor(strokeColorToUse);
  }

  return (
    <Modal
      visible={!!(visible)}
      animationType={'fade'}
      transparent
      onRequestClose={() => onRequestClose?.()}
    >
      <NativeHighlighterView
        // @ts-ignore, this became private, not sure if I should remove it 
        highlightFrame={highlightFrame}
        style={[style, {...StyleSheet.absoluteFillObject, backgroundColor: 'transparent'}]}
        overlayColor={overlayColorToUse}
        borderRadius={borderRadius}
        strokeColor={strokeColorToUse}
        strokeWidth={strokeWidth}
        highlightViewTag={highlightViewTag}
        highlightViewTagParams={highlightViewTagParams}
        minimumRectSize={minimumRectSize}
        innerPadding={innerPadding}
      />
      {children}
    </Modal>
  );
};

HighlighterOverlayView.displayName = 'IGNORE';
export default HighlighterOverlayView;
