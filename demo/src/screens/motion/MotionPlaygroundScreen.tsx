import React, {useState, useEffect} from 'react';
import {ScrollView, TouchableWithoutFeedback} from 'react-native';
import {View, Text, Colors} from 'react-native-ui-lib';
import Animated, {useSharedValue, useAnimatedStyle, withSpring, withTiming, SharedValue} from 'react-native-reanimated';
import {Navigation} from 'react-native-navigation';

import {Springs, type Easing, type AnimationSpecs, type SpringAnimationSpecs, type TimeAnimationSpecs, Spring} from 'react-native-motion-lib';

import {AnimationConfigurationPanel} from './AnimationConfigurationPanel';

type AnimationSpecs = {
  label: string;
  color: string;
  initialValue: number;
  targetValue: number;
  applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => void;
};

type AnimatedBoxProps = {
  animationSpecs: AnimationSpecs;
  animation: AnimationSpecs;
  isAnimated: boolean;
  onPress: () => void;
};

const items: Record<string, AnimationSpecs> = {
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

function AnimatedBox({animationSpecs, animation, isAnimated, onPress}: AnimatedBoxProps) {
  const {label, color, initialValue, targetValue} = animationSpecs;
  const animatedValue = useSharedValue(initialValue);

  const animatedStyle = useAnimatedStyle(() => {
    const style: { [key: string]: any } = {
      transform: []
    };
    animationSpecs.applyAnimationStyle(style, animatedValue);
    return style;
  });

  useEffect(() => {
    if ((animation as SpringAnimationSpecs).spring !== undefined) {
      animatedValue.value = withSpring(isAnimated ? targetValue : initialValue,
        (animation as SpringAnimationSpecs).spring as Spring);
    } else {
      animatedValue.value = withTiming(isAnimated ? targetValue : initialValue, {
        duration: (animation as TimeAnimationSpecs).duration,
        easing: (animation as TimeAnimationSpecs).easing as Easing
      });
    }
  }, [isAnimated, animation, animatedValue, targetValue, initialValue]);

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

  const [animation, setAnimation] = useState<AnimationSpecs>({spring: Springs.gentle});
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
              animationSpecs={items.scale}
              animation={animation}
              isAnimated={scaleAnimated}
              onPress={() => setScaleAnimated(!scaleAnimated)}
            />
            <AnimatedBox
              animationSpecs={items.opacity}
              animation={animation}
              isAnimated={fadeAnimated}
              onPress={() => setFadeAnimated(!fadeAnimated)}
            />
          </View>
          <View row centerH marginB-s1>
            <AnimatedBox
              animationSpecs={items.rotation}
              animation={animation}
              isAnimated={rotateAnimated}
              onPress={() => setRotateAnimated(!rotateAnimated)}
            />
            <AnimatedBox
              animationSpecs={items.slideV}
              animation={animation}
              isAnimated={slideAnimated}
              onPress={() => setSlideAnimated(!slideAnimated)}
            />
          </View>
          <View row centerH>
            <AnimatedBox
              animationSpecs={items.slideH}
              animation={animation}
              isAnimated={slideHAnimated}
              onPress={() => setSlideHAnimated(!slideHAnimated)}
            />
            <AnimatedBox
              animationSpecs={items.placeholder}
              animation={animation}
              isAnimated={false}
              onPress={() => {}}
            />
          </View>
        </View>

        <AnimationConfigurationPanel onAnimationSelected={setAnimation}/>
      </View>
    </ScrollView>
  );
}

export default MotionPlayground;
