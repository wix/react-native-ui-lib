import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableWithoutFeedback} from 'react-native';
import {Easings, getEasing, InterpolationSpecs, Springs} from 'react-native-motion-lib';
import {Navigation} from 'react-native-navigation';
import Animated, {SharedValue, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import {Colors, Text, View} from 'react-native-ui-lib';

import {InterpolationSelectPanel} from './InterpolationSelectPanel';

// TODO Fix Animation vs. Interpolation terminology in this file in order to stay consistent system-wide

type ItemSpecs = {
  label: string;
  color: string;
  initialValue: number;
  targetValue: number;
  applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => void;
};

type AnimatedBoxProps = {
  itemSpecs: ItemSpecs;
  interpolation: InterpolationSpecs;
  isAnimated: boolean;
  onPress: () => void;
};

// TODO Replace applyAninmationStyle etc. with the interpolation builder approach
const items: Record<string, ItemSpecs> = {
  scale: {
    label: 'Scale',
    color: '#4A90E2',
    initialValue: 1,
    targetValue: 1.5,
    applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => {
      'worklet';
      style.transform.push({scale: animatedValue.value});
    }
  },
  opacity: {
    label: 'Fade', 
    color: '#50C878',
    initialValue: 1,
    targetValue: 0,
    applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => {
      'worklet';
      style.opacity = animatedValue.value;
    }
  },
  rotation: {
    label: 'Rotation',
    color: '#FF6B6B',
    initialValue: 0,
    targetValue: 360,
    applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => {
      'worklet';
      style.transform.push({rotate: `${animatedValue.value}deg`});
    }
  },
  slideV: {
    label: 'Slide V',
    color: '#FFD93D',
    initialValue: 0,
    targetValue: 100,
    applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => {
      'worklet';
      style.transform.push({translateY: animatedValue.value});
    }
  },
  slideH: {
    label: 'Slide H',
    color: '#9B59B6',
    initialValue: 0,
    targetValue: 100,
    applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => {
      'worklet';
      style.transform.push({translateX: animatedValue.value});
    }
  },

  placeholder: {
    label: '',
    color: '#ffffff00',
    initialValue: 0,
    targetValue: 0,
    applyAnimationStyle: (style: { [key: string]: any }, _animatedValue: SharedValue) => {
      'worklet';
      style.elevation = 0;
    }
  }
};

function AnimatedBox({itemSpecs, interpolation, isAnimated, onPress}: AnimatedBoxProps) {
  const {label, color, initialValue, targetValue} = itemSpecs;
  const animatedValue = useSharedValue(initialValue);

  const animatedStyle = useAnimatedStyle(() => {
    const style: { [key: string]: any } = {
      transform: []
    };
    itemSpecs.applyAnimationStyle(style, animatedValue);
    return style;
  });

  useEffect(() => {
    if (interpolation.type === 'spring') {
      animatedValue.value = withSpring(isAnimated ? targetValue : initialValue, interpolation.spring);
    } else {
      animatedValue.value = withTiming(isAnimated ? targetValue : initialValue, {
        duration: interpolation.duration,
        easing: getEasing(interpolation.easingName) ?? Easings.standard
      });
    }
  }, [isAnimated, interpolation, animatedValue, targetValue, initialValue]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            backgroundColor: color,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20,
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 5
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 5
          },
          animatedStyle
        ]}
      >
        <Text white text70BO>
          {label}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

function MotionPlayground({componentId}: {componentId: string}) {
  useEffect(() => {
    // TODO finish up with this
    Navigation.mergeOptions(componentId, {
      topBar: {
        background: {
          color: Colors.$backgroundGeneralHeavy
        }
      }
    });
  });

  const [animation, setAnimation] = useState<InterpolationSpecs>({type: 'spring', spring: Springs.gentle});
  const [scaleAnimated, setScaleAnimated] = useState(false);
  const [fadeAnimated, setFadeAnimated] = useState(false);
  const [rotateAnimated, setRotateAnimated] = useState(false);
  const [slideAnimated, setSlideAnimated] = useState(false);
  const [slideHAnimated, setSlideHAnimated] = useState(false);

  return (
    <ScrollView contentContainerStyle={{padding: 20}}>
      <View flex useSafeArea>
        <Text text80 marginB-s3>
          Tap the objects to animate them
        </Text>

        <View 
          marginB-s6 
          padding-s4
          style={{
            borderWidth: 1,
            borderColor: Colors.$outlineDefault,
            borderRadius: 8,
            backgroundColor: Colors.$backgroundNeutralLight
          }}
        >
          <View row centerH marginB-s1>
            <AnimatedBox
              itemSpecs={items.scale}
              interpolation={animation}
              isAnimated={scaleAnimated}
              onPress={() => setScaleAnimated(!scaleAnimated)}
            />
            <AnimatedBox
              itemSpecs={items.opacity}
              interpolation={animation}
              isAnimated={fadeAnimated}
              onPress={() => setFadeAnimated(!fadeAnimated)}
            />
          </View>
          <View row centerH marginB-s1>
            <AnimatedBox
              itemSpecs={items.rotation}
              interpolation={animation}
              isAnimated={rotateAnimated}
              onPress={() => setRotateAnimated(!rotateAnimated)}
            />
            <AnimatedBox
              itemSpecs={items.slideV}
              interpolation={animation}
              isAnimated={slideAnimated}
              onPress={() => setSlideAnimated(!slideAnimated)}
            />
          </View>
          <View row centerH>
            <AnimatedBox
              itemSpecs={items.slideH}
              interpolation={animation}
              isAnimated={slideHAnimated}
              onPress={() => setSlideHAnimated(!slideHAnimated)}
            />
            <AnimatedBox
              itemSpecs={items.placeholder}
              interpolation={animation}
              isAnimated={false}
              onPress={() => {}}
            />
          </View>
        </View>

        <InterpolationSelectPanel onInterpolationSelected={setAnimation}/>
      </View>
    </ScrollView>
  );
}

export default MotionPlayground;
