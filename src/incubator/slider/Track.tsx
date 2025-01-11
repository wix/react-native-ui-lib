import isFunction from 'lodash/isFunction';
import React, {ReactElement} from 'react';
import {StyleSheet, ViewProps, StyleProp, ViewStyle, GestureResponderEvent} from 'react-native';
import {Colors} from '../../style';
import View from '../../components/view';

const TRACK_HEIGHT = 6;

export interface Props extends ViewProps {
  animatedStyle?: any;
  disabled?: boolean;
  maximumTrackTintColor?: string;
  minimumTrackTintColor?: string;
  trackStyle?: StyleProp<ViewStyle>;
  renderTrack?: () => ReactElement | ReactElement[];
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Track = (props: Props) => {
  const {
    onLayout,
    onPress,
    animatedStyle,
    renderTrack,
    disabled,
    maximumTrackTintColor,
    minimumTrackTintColor,
    trackStyle
  } = props;
  const shouldRenderCustomTrack = isFunction(renderTrack);

  const renderCustomTrack = () => {
    return (
      <View style={[styles.track, trackStyle, {backgroundColor: maximumTrackTintColor}]} onLayout={onLayout}>
        {renderTrack?.()}
      </View>
    );
  };

  const renderBackgroundTrack = () => {
    return (
      <View
        style={[
          styles.track,
          trackStyle,
          {
            backgroundColor: disabled
              ? Colors.$backgroundNeutralMedium
              : maximumTrackTintColor || Colors.$backgroundDisabled
          }
        ]}
        onLayout={onLayout}
      />
    );
  };

  const renderActiveTrack = () => {
    return (
      <View
        reanimated
        style={[
          styles.track,
          trackStyle,
          styles.activeTrack,
          {
            backgroundColor: disabled
              ? Colors.$backgroundDisabled
              : minimumTrackTintColor || Colors.$backgroundPrimaryHeavy
          },
          animatedStyle
        ]}
      />
    );
  };

  return (
    <>
      {shouldRenderCustomTrack ? renderCustomTrack() : renderBackgroundTrack()}
      {!shouldRenderCustomTrack && renderActiveTrack()}
      <View style={styles.touchArea} onTouchEnd={onPress}/>
    </>
  );
};

export default Track;

const styles = StyleSheet.create({
  track: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2
  },
  activeTrack: {
    position: 'absolute',
    left: 0,
    right: 0
  },
  touchArea: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.transparent
  }
});
