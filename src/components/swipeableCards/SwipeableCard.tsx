import {StyleSheet, useWindowDimensions, type ViewStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {Extrapolation, interpolate, runOnJS, type SharedValue, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Colors} from '../../style';

export interface SwipeableCardProps {
  children: JSX.Element | JSX.Element[];
  onSwipe?: {
    right?: () => void;
    left?: () => void;
  };
  style?: {
    rightCardContainer?: ViewStyle;
    leftCardContainer?: ViewStyle;
  };
  cardContent?: {
    right?: JSX.Element | JSX.Element[];
    left?: JSX.Element | JSX.Element[];
  };
  itemIndex: number;
  currentIndex: number;
  animatedValue: SharedValue<number>;
}

const SwipeableCard = ({
  children, onSwipe, cardContent, itemIndex, currentIndex, animatedValue
}: SwipeableCardProps) => {
  const [swipeStatus, setSwipeStatus] = useState<'right' | 'left'>();

  useEffect(() => {
    if (swipeStatus) {
      swipeStatus === 'right' ? onSwipe?.right?.() : onSwipe?.left?.();
    }
  }, [onSwipe, swipeStatus]);

  const {width} = useWindowDimensions();
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const direction = useSharedValue(0);

  const diffFromFocusItem = Math.abs(itemIndex - currentIndex);

  const pan = Gesture.Pan()
    .activeOffsetX([-6, 6])
    .onUpdate(e => {
      const isSwipeRight = e.translationX > 0;

      // direction 1 is right, -1 is left
      direction.value = isSwipeRight ? 1 : -1;

      translationX.value = e.translationX;
      translationY.value = e.translationY;
    })
    .onEnd(e => {
      if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
        translationX.value = withTiming(width * direction.value * 1.5, {duration: 200}, () => {
          const isSwipeRight = e.translationX > 0;
          runOnJS(setSwipeStatus)(isSwipeRight ? 'right' : 'left');
          animatedValue.value = withTiming(currentIndex + 1);
        });
      } else {
        translationX.value = withTiming(0, {duration: 500});
        translationY.value = withTiming(0, {duration: 500});
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const currentItem = itemIndex === currentIndex;

    const rotateZ = interpolate(Math.abs(translationX.value),
      [0, width],
      [0, 40]);

    const blurTranslateY = interpolate(animatedValue.value,
      [itemIndex - 1, itemIndex],
      [-21, 0]);

    const scale = interpolate(animatedValue.value,
      [itemIndex - 1, itemIndex],
      [0.95, 1]);

    return {
      transform: [
        {translateY: currentItem ? translationY.value : blurTranslateY},
        {translateX: translationX.value},
        {rotateZ: `${direction.value * rotateZ}deg`},
        {scale}
      ]
    };
  });

  const mainContentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(Math.abs(translationX.value),
        [0, width * 0.25],
        [1, 0])
    };
  });

  const acceptCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translationX.value,
        [0, width * 0.25],
        [0, 1],
        Extrapolation.CLAMP)
    };
  });

  const declineCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translationX.value,
        [-1 * width * 0.25, 0],
        [1, 0],
        Extrapolation.CLAMP)
    };
  });

  return (
    !swipeStatus &&
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          {zIndex: 100 - diffFromFocusItem * 10}
        ]}
      >
        <Animated.View style={[styles.card, styles.mainCard, mainContentAnimatedStyle]}>
          {children}
        </Animated.View>
        <Animated.View style={[styles.card, styles.acceptCard, acceptCardAnimatedStyle]}>
          {cardContent?.right}
        </Animated.View>
        <Animated.View style={[styles.card, declineCardAnimatedStyle]}>
          {cardContent?.left}
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default SwipeableCard;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.$backgroundNeutral,
    borderWidth: 1,
    position: 'absolute',
    width: '94%',
    height: '90%',
    marginHorizontal: '3%',
    marginTop: '8%',
    marginBottom: '2%',
    borderRadius: 28,
    shadowColor: Colors.$backgroundDarkActive,
    shadowOffset: {height: 4, width: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4
  },
  card: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
    overflow: 'hidden'
  },
  mainCard: {
    zIndex: 100,
    backgroundColor: Colors.$backgroundDefault
  },
  acceptCard: {
    zIndex: 50
  },
  text: {
    color: Colors.$textDefault
  }
});
