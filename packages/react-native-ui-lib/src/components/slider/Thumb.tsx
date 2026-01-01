import _ from 'lodash';
import React, {forwardRef, useRef} from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ViewProps,
  View as RNView,
  Animated,
  GestureResponderEvent
} from 'react-native';
import {useCombinedRefs} from 'hooks';
import {Colors} from '../../style';

export interface ThumbProps extends ViewProps {
  /**
   * The thumb style
   */
  thumbStyle?: ViewStyle;
  /**
   * The active (during press) thumb style
   */
  activeThumbStyle?: ViewStyle;
  /**
   * If true the Slider will not change it's style on press
   */
  disableActiveStyling?: boolean;
  /**
   * Defines how far a touch event can start away from the thumb.
   */
  thumbHitSlop?: ViewProps['hitSlop'];
  /**
   * Thumb color
   */
  thumbTintColor?: string;
  /**
   * If true the Slider will be disabled and will appear in disabled color
   */
  disabled?: boolean;
  /** ref to thumb component */
  ref?: React.RefObject<RNView | null>;
}
type ThumbStyle = {style?: StyleProp<ViewStyle>; left?: StyleProp<number>};

const THUMB_SIZE = 24;
const BORDER_WIDTH = 6;
const SHADOW_RADIUS = 4;
const DEFAULT_COLOR = Colors.$backgroundDisabled;
const ACTIVE_COLOR = Colors.$backgroundPrimaryHeavy;

const Thumb = forwardRef((props: ThumbProps, ref: any) => {
  const {
    disabled,
    thumbStyle,
    activeThumbStyle,
    disableActiveStyling,
    thumbTintColor,
    thumbHitSlop,
    onTouchStart,
    onTouchEnd,
    ...others
  } = props;

  const thumbRef = useCombinedRefs(ref);

  /** Scaling thumb */

  const _onTouchStart = (e: GestureResponderEvent) => {
    updateThumbStyle(true);
    onTouchStart?.(e);
  };

  const _onTouchEnd = (e: GestureResponderEvent) => {
    updateThumbStyle(false);
    onTouchEnd?.(e);
  };

  const thumbStyles: ThumbStyle = {};
  const thumbScaleAnimation = useRef(new Animated.Value(1));
  const thumbAnimationConstants = {
    duration: 100,
    defaultScaleFactor: 1.5
  };

  const updateThumbStyle = (start: boolean) => {
    if (!disableActiveStyling) {
      const style = thumbStyle || styles.thumb;
      const activeStyle = activeThumbStyle || styles.activeThumb;
      const activeOrInactiveStyle = !disabled ? (start ? activeStyle : style) : {};

      thumbStyles.style = _.omit(activeOrInactiveStyle, 'height', 'width');
      //@ts-expect-error
      thumbRef.current?.setNativeProps?.(thumbStyles);

      scaleThumb(start);
    }
  };

  const calculateThumbScale = () => {
    if (disabled || disableActiveStyling) {
      return 1;
    }

    const {defaultScaleFactor} = thumbAnimationConstants;
    if (!activeThumbStyle || !thumbStyle) {
      return defaultScaleFactor;
    }

    const scaleRatioFromSize = Number(activeThumbStyle.height) / Number(thumbStyle.height);
    return scaleRatioFromSize || defaultScaleFactor;
  };

  const animateScale = (toValue: number) => {
    const {duration} = thumbAnimationConstants;
    Animated.timing(thumbScaleAnimation.current, {
      toValue,
      duration,
      useNativeDriver: true
    }).start();
  };

  const scaleThumb = (start: boolean) => {
    const scaleFactor = start ? calculateThumbScale() : 1;
    animateScale(scaleFactor);
  };

  return (
    <Animated.View
    // @ts-expect-error
      ref={thumbRef}
      {...others}
      hitSlop={thumbHitSlop}
      onTouchStart={_onTouchStart}
      onTouchEnd={_onTouchEnd}
      style={[
        styles.thumb,
        disabled && styles.disabledThumb,
        thumbStyle,
        {
          backgroundColor: disabled ? DEFAULT_COLOR : thumbTintColor || ACTIVE_COLOR
        },
        {
          transform: [
            {
              scale: thumbScaleAnimation.current
            }
          ]
        }
      ]}
    />
  );
});

export default Thumb;

const styles = StyleSheet.create({
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: Colors.white,
    shadowColor: Colors.rgba(Colors.black, 0.3),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: SHADOW_RADIUS,
    elevation: 2
  },
  disabledThumb: {
    borderColor: Colors.$backgroundElevated
  },
  activeThumb: {
    width: THUMB_SIZE + 16,
    height: THUMB_SIZE + 16,
    borderRadius: (THUMB_SIZE + 16) / 2,
    borderWidth: BORDER_WIDTH
  }
});
