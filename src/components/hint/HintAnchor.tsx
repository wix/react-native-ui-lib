import React from 'react';
import {StyleSheet, type LayoutRectangle} from 'react-native';

import View from '../view';

import {LayoutStyle, HintProps, PaddingsStyle} from './types';

interface HintAnchorProps extends HintProps {
  showHint: boolean;
  isUsingModal: boolean;
  targetLayout?: LayoutRectangle;
  hintContainerLayout: LayoutStyle;
  hintPadding: PaddingsStyle;
  hintAnimatedStyle: any;
}

export default function HintAnchor({
  children,
  showHint,
  isUsingModal,
  targetLayout,
  containerWidth,
  testID,
  hintContainerLayout,
  hintPadding,
  hintAnimatedStyle,
  style,
  ...others
}: HintAnchorProps) {
  const renderHintContainer = () => {
    if (showHint) {
      return (
        <View
          animated
          style={[
            {width: containerWidth},
            styles.animatedContainer,
            hintContainerLayout,
            hintPadding,
            hintAnimatedStyle
          ]}
          pointerEvents="box-none"
          testID={testID}
        >
          {children}
        </View>
      );
    }
  };

  return (
    <View
      {...others}
      // Note: this view must be collapsable, don't pass testID or backgroundColor etc'.
      collapsable
      testID={undefined}
      style={[
        styles.anchor,
        style,
        /*  containerPosition, */
        {left: targetLayout?.x, top: targetLayout?.y},
        !isUsingModal && styles.anchorForScreenOverlay
      ]}
    >
      {renderHintContainer()}
    </View>
  );
}

const styles = StyleSheet.create({
  anchor: {
    position: 'absolute'
  },
  anchorForScreenOverlay: {
    zIndex: 10,
    elevation: 10
  },
  animatedContainer: {
    position: 'absolute'
  }
});
