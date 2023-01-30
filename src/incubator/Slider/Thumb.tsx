import React from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import {Colors} from '../../style';
import View from '../../components/view';

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
