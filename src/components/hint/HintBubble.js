import _isUndefined from "lodash/isUndefined";
import React from 'react';
import { StyleSheet } from 'react-native';
import { Constants } from "../../commons/new";
import { BorderRadiuses, Colors, Shadows, Spacings, Typography } from "../../style";
import View from "../view";
import Text from "../text";
import Image from "../image";
const DEFAULT_COLOR = Colors.$backgroundPrimaryHeavy;
// const HINT_MIN_WIDTH = 68;

export default function HintBubble({
  visible,
  message,
  messageStyle,
  icon,
  iconStyle,
  borderRadius,
  removePaddings,
  enableShadow,
  color,
  customContent,
  testID,
  hintRef,
  hintPositionStyle,
  setHintLayout
}) {
  return <View testID={`${testID}.message`} row centerV style={[styles.hint, !removePaddings && styles.hintPaddings, visible && enableShadow && styles.containerShadow, {
    backgroundColor: color
  }, !_isUndefined(borderRadius) && {
    borderRadius
  }, hintPositionStyle]} onLayout={setHintLayout} ref={hintRef}>
      {customContent}
      {!customContent && icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
      {!customContent && <Text recorderTag={'unmask'} style={[styles.hintMessage, messageStyle]} testID={`${testID}.message.text`}>
          {message}
        </Text>}
    </View>;
}
const styles = StyleSheet.create({
  hint: {
    // minWidth: HINT_MIN_WIDTH,
    maxWidth: Math.min(Constants.windowWidth - 2 * Spacings.s4, 400),
    borderRadius: BorderRadiuses.br60,
    backgroundColor: DEFAULT_COLOR
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