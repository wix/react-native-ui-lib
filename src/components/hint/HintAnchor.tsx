import React from 'react';
import {LayoutChangeEvent, StyleSheet, View as RNView} from 'react-native';
import _ from 'lodash';
import {Constants} from '../../commons/new';

import {BorderRadiuses, Colors, Shadows, Spacings, Typography} from 'style';
import View from '../view';
import Text from '../text';
import Image from '../image';
import TouchableOpacity from '../touchableOpacity';
import {HintPositions, HintPositionStyle, HintProps, Paddings, Position, TARGET_POSITIONS} from './types';

const DEFAULT_COLOR = Colors.$backgroundPrimaryHeavy;
const HINT_MIN_WIDTH = 68;

const sideTip = require('./assets/hintTipSide.png');
const middleTip = require('./assets/hintTipMiddle.png');

interface HintAnchorProps extends HintProps {
  showHint: boolean;
  containerWidth: number;
  hintPosition: HintPositionStyle;
  hintPadding: Paddings;
  hintAnimatedStyle: any;
  hintOffsetForShortMessage: number;
  hintRef: React.RefObject<RNView>;
  setHintLayout: (layoutChangeEvent: LayoutChangeEvent) => void;
  shouldUseSideTip: boolean;
  targetPositionOnScreen: TARGET_POSITIONS;
  tipPosition: Position;
  containerPosition: {top: number | undefined; left: number | undefined} | undefined;
  isUsingModal: boolean;
}

export default function HintAnchor({
  showHint,
  visible,
  onPress,
  position,
  containerWidth,
  testID,
  hintPosition,
  hintPadding,
  hintAnimatedStyle,
  hintOffsetForShortMessage,
  color = DEFAULT_COLOR,
  removePaddings,
  enableShadow,
  borderRadius,
  customContent,
  icon,
  iconStyle,
  message,
  messageStyle,
  style,
  setHintLayout,
  hintRef,
  shouldUseSideTip,
  targetPositionOnScreen,
  tipPosition,
  containerPosition,
  isUsingModal,
  ...others
}: HintAnchorProps) {
  const renderHintTip = () => {
    const source = shouldUseSideTip ? sideTip : middleTip;
    const flipVertically = position === HintPositions.TOP;
    const flipHorizontally = targetPositionOnScreen === TARGET_POSITIONS.RIGHT;
    const flipStyle = {
      transform: [{scaleY: flipVertically ? -1 : 1}, {scaleX: flipHorizontally ? -1 : 1}]
    };

    return <Image tintColor={color} source={source} style={[styles.hintTip, tipPosition, flipStyle]}/>;
  };

  const renderHint = () => {
    return (
      <View
        testID={`${testID}.message`}
        row
        centerV
        centerH={!!hintOffsetForShortMessage}
        style={[
          styles.hint,
          !removePaddings && styles.hintPaddings,
          visible && enableShadow && styles.containerShadow,
          {backgroundColor: color},
          !_.isUndefined(borderRadius) && {borderRadius},
          hintOffsetForShortMessage ? {left: hintOffsetForShortMessage} : undefined
        ]}
        onLayout={setHintLayout}
        ref={hintRef}
      >
        {customContent}
        {!customContent && icon && <Image source={icon} style={[styles.icon, iconStyle]}/>}
        {!customContent && (
          <Text recorderTag={'unmask'} style={[styles.hintMessage, messageStyle]} testID={`${testID}.message.text`}>
            {message}
          </Text>
        )}
      </View>
    );
  };

  const renderHintContainer = () => {
    const opacity = onPress ? 0.9 : 1.0;

    if (showHint) {
      return (
        <View
          animated
          style={[{width: containerWidth}, styles.animatedContainer, hintPosition, hintPadding, hintAnimatedStyle]}
          pointerEvents="box-none"
          testID={testID}
        >
          <TouchableOpacity activeOpacity={opacity} onPress={onPress}>
            {renderHint()}
          </TouchableOpacity>
          {renderHintTip()}
        </View>
      );
    }
  };

  return (
    <View
      {...others}
      // this view must be collapsable, don't pass testID or backgroundColor etc'.
      collapsable
      testID={undefined}
      style={[styles.container, style, containerPosition, !isUsingModal && styles.overlayContainer]}
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
  },
  hint: {
    minWidth: HINT_MIN_WIDTH,
    maxWidth: Math.min(Constants.windowWidth - 2 * Spacings.s4, 400),
    borderRadius: BorderRadiuses.br60,
    backgroundColor: DEFAULT_COLOR
  },
  hintTip: {
    position: 'absolute'
  },
  hintPaddings: {
    paddingHorizontal: Spacings.s5,
    paddingTop: Spacings.s3,
    paddingBottom: Spacings.s4
  },
  containerShadow: {
    ...Shadows.sh30.bottom
  },
  hintMessage: {
    ...Typography.text70,
    color: Colors.white,
    flexShrink: 1
  },
  icon: {
    marginRight: Spacings.s4,
    tintColor: Colors.white
  }
});
