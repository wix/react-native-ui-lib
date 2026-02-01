import React, {type JSX} from 'react';
import {Modal, ViewStyle} from 'react-native';

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
    visible,
    onRequestClose,
    children
  } = props;



  return (
    <Modal
      visible={!!(visible)}
      animationType={'fade'}
      transparent
      onRequestClose={() => onRequestClose?.()}
    >

      {children}
    </Modal>
  );
};

HighlighterOverlayView.displayName = 'IGNORE';
export default HighlighterOverlayView;
