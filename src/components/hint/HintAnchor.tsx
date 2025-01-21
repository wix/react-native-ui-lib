import React from 'react';
import {LayoutChangeEvent, StyleSheet, View as RNView} from 'react-native';

import View from '../view';

import {HintPositionStyle, HintProps, HintTargetFrame, Paddings, Position, TARGET_POSITIONS} from './types';

interface HintAnchorProps extends HintProps {
  showHint: boolean;
  targetLayout?: HintTargetFrame;
  containerWidth: number;
  hintContainerLayout: HintPositionStyle;
  hintPadding: Paddings;
  hintAnimatedStyle: any;
  hintRef: React.RefObject<RNView>;
  setHintLayout: (layoutChangeEvent: LayoutChangeEvent) => void;
  targetPositionOnScreen: TARGET_POSITIONS;
  tipPosition: Position;
  isUsingModal: boolean;
  hintPositionStyle: {left: number};
}

export default function HintAnchor({
  children,
  showHint,
  targetLayout,
  containerWidth,
  testID,
  hintContainerLayout,
  hintPadding,
  hintAnimatedStyle,
  style,
  isUsingModal,
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
        styles.container,
        style,
        /*  containerPosition, */
        {left: targetLayout?.x, top: targetLayout?.y},
        !isUsingModal && styles.overlayContainer
      ]}
    >
      {renderHintContainer()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute'
  },
  overlayContainer: {
    zIndex: 10,
    elevation: 10
  },
  animatedContainer: {
    position: 'absolute'
  }
});
