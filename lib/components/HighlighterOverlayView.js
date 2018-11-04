import React from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent, processColor, Platform, StyleSheet, Modal} from 'react-native';

const NativeHighlighterView = requireNativeComponent('HighlighterView', null);
const DefaultOverlayColor = 'rgba(0, 0, 0, 0.5)';

const HighlighterOverlayView = (props) => {
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
    innerPadding,
  } = props;

  let overlayColorToUse = overlayColor || DefaultOverlayColor;
  let strokeColorToUse = strokeColor;
  if (Platform.OS === 'android') {
    overlayColorToUse = processColor(overlayColorToUse);
    strokeColorToUse = processColor(strokeColorToUse);
  }

  return (
    <Modal
      visible={!!(visible)}
      animationType={'fade'}
      transparent
      onRequestClose={() => onRequestClose && onRequestClose()}
    >
      <NativeHighlighterView
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

HighlighterOverlayView.propTypes = {
  overlayColor: PropTypes.string,
  borderRadius: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
  highlightFrame: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  highlightViewTag: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  highlightViewTagParams: PropTypes.shape({
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        bottom: PropTypes.number,
        right: PropTypes.number}),
    ]),
    offset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }),
  minimumRectSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  innerPadding: PropTypes.number,
};

export default HighlighterOverlayView;
