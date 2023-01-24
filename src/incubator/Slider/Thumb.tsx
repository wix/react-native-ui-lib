import React from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import {Colors} from '../../style';
import View from '../../components/view';

const THUMB_SIZE = 24;
const THUMB_BORDER_WIDTH = 6;
const SHADOW_RADIUS = 4;

export interface Props extends ViewProps {
  animatedStyle?: any;
  gesture?: any;
}

const Thumb = (props: Props) => {
  const {hitSlop, onLayout, animatedStyle, gesture} = props;

  return (
    <GestureDetector gesture={gesture}>
      <View
        reanimated
        style={[styles.thumbPosition, styles.thumbShadow, animatedStyle]}
        hitSlop={hitSlop}
        onLayout={onLayout}
      />
    </GestureDetector>
  );
};

export default Thumb;

const styles = StyleSheet.create({
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: THUMB_BORDER_WIDTH,
    borderColor: Colors.$backgroundElevatedLight
  },
  thumbPosition: {
    position: 'absolute'
  },
  thumbShadow: {
    shadowColor: Colors.rgba(Colors.black, 0.3),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: SHADOW_RADIUS,
    elevation: 2
  }
});
