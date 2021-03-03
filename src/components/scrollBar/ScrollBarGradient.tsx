// TODO: use this component inside ScrollBar
import React, {useRef, useEffect, useMemo} from 'react';
import {Animated, ImageSourcePropType} from 'react-native';

import {Colors} from '../../style';
import {Constants} from '../../helpers';
import View from '../view';
import Image from '../image';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export interface ScrollBarGradientProps {
  /**
   * Is the gradient visible
   */
  visible?: boolean;
  /**
   * Should the gradient be on the left (reverse)
   */
  left?: boolean;
  /**
   * The gradient's width (default is 76)
   */
  gradientWidth?: number;
  /**
   * The gradient's height (default 100%)
   */
  gradientHeight?: number;
  /**
   * The gradient's margins (default is 0)
   */
  gradientMargins?: number;
  // TODO: deprecate
  /**
   * The gradient's height (default 100%)
   * @deprecated
   */
  height?: number;
  /**
   * The gradient's color (default is white)
   */
  gradientColor?: string;
  /**
   * Image source for the gradient (default is assets/gradientOverlay.png)
   */
  gradientImage?: ImageSourcePropType;
}

const ScrollBarGradient = ({
  visible,
  left,
  gradientWidth = 76,
  gradientHeight,
  gradientMargins = 0,
  height,
  gradientColor = Colors.white,
  gradientImage = require('./assets/gradientOverlay.png')
}: ScrollBarGradientProps) => {
  const gradientOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(gradientOpacity, {
      toValue: Number(!!visible),
      duration: 100,
      useNativeDriver: true
    }).start();
  }, [visible]);

  const imageTransform = useMemo(() => {
    return Constants.isRTL ? (left ? undefined : [{scaleX: -1}]) : left ? [{scaleX: -1}] : undefined;
  }, [left]);

  const heightToUse = gradientHeight || height || '100%';
  return (
    <View
      animated
      pointerEvents="none"
      style={{
        opacity: gradientOpacity,
        width: gradientWidth,
        height: heightToUse,
        position: 'absolute',
        right: !left ? gradientMargins : undefined,
        left: left ? gradientMargins : undefined
      }}
    >
      <AnimatedImage
        source={gradientImage}
        style={{
          width: gradientWidth,
          height: heightToUse,
          tintColor: gradientColor,
          transform: imageTransform
        }}
        resizeMode={'stretch'}
      />
    </View>
  );
};

ScrollBarGradient.displayName = 'IGNORE';

export default ScrollBarGradient;
