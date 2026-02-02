import React, {useState, useEffect} from 'react';
import {ScrollView, TouchableWithoutFeedback, ViewStyle} from 'react-native';
import {View, Text, Colors} from 'react-native-ui-lib';
import Animated, {useSharedValue, useAnimatedStyle, withSpring, withTiming, interpolate, Extrapolation} from 'react-native-reanimated';
import {Navigation} from 'react-native-navigation';

import {Springs, type InterpolationSpecs, Easings, getEasing} from 'react-native-motion-lib';

import {InterpolationSelectPanel} from './InterpolationSelectPanel';

type AnimatedPinProps = {
  animation: InterpolationSpecs;
  isAnimated: boolean;
  onPress: () => void;
};

function AnimatedPin({animation, isAnimated, onPress}: AnimatedPinProps) {
  const animatedValue = useSharedValue(0);
  const scaleInit = 1;
  const scaleTarget = 2;
  const elevationTarget = 10;
  const opacityInit = 0.8;

  const baseStyle: ViewStyle = {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 10
  } as ViewStyle;
  const animatedStyle = useAnimatedStyle(() => {
    'worklet';

    const scale = interpolate(animatedValue.value, [0, 1], [scaleInit, scaleTarget]);
    const elevation = interpolate(animatedValue.value, [0, 1], [0, elevationTarget], Extrapolation.CLAMP);
    const opacity = interpolate(animatedValue.value, [0, 1], [opacityInit, 1], Extrapolation.CLAMP);
    return {
      transform: [{scale}],
      elevation,
      opacity
    };
  });

  useEffect(() => {
    if (animation.type === 'spring') {
      animatedValue.value = withSpring(isAnimated ? 1 : 0, animation.spring);
    } else {
      animatedValue.value = withTiming(isAnimated ? 1 : 0, {
        duration: animation.duration,
        easing: getEasing(animation.easingName) ?? Easings.standard
      });
    }
  }, [isAnimated, animation, animatedValue]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[baseStyle, animatedStyle]}/>
    </TouchableWithoutFeedback>
  );
}

function MotionPinsPlayScreen({componentId}: {componentId: string}) {
  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        background: {
          color: Colors.$backgroundGeneralHeavy
        }
      }
    });
  });

  const [animation, setAnimation] = useState<InterpolationSpecs>({type: 'spring', spring: Springs.wobbly});
  const [pin1Animated, setPin1Animated] = useState(false);
  const [pin2Animated, setPin2Animated] = useState(false);
  const [pin3Animated, setPin3Animated] = useState(false);
  const [pin4Animated, setPin4Animated] = useState(false);

  return (
    <ScrollView contentContainerStyle={{padding: 20}}>
      <View flex useSafeArea>
        <Text text80 marginB-s3>
          Tap the pins to animate them independently
        </Text>

        <View 
          marginB-s6 
          padding-s8
          style={{
            borderWidth: 1,
            borderColor: Colors.$outlineDefault,
            borderRadius: 8,
            backgroundColor: Colors.$backgroundNeutralLight,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 400,
            overflow: 'visible'
          }}
        >
          <View row centerH marginB-s10>
            <View marginR-s4 style={{padding: 30, overflow: 'visible'}}>
              <AnimatedPin
                animation={animation}
                isAnimated={pin1Animated}
                onPress={() => setPin1Animated(!pin1Animated)}
              />
            </View>
            <View marginL-s4 style={{padding: 30, overflow: 'visible'}}>
              <AnimatedPin
                animation={animation}
                isAnimated={pin2Animated}
                onPress={() => setPin2Animated(!pin2Animated)}
              />
            </View>
          </View>
          <View row centerH>
            <View marginR-s4 style={{padding: 30, overflow: 'visible'}}>
              <AnimatedPin
                animation={animation}
                isAnimated={pin3Animated}
                onPress={() => setPin3Animated(!pin3Animated)}
              />
            </View>
            <View marginL-s4 style={{padding: 30, overflow: 'visible'}}>
              <AnimatedPin
                animation={animation}
                isAnimated={pin4Animated}
                onPress={() => setPin4Animated(!pin4Animated)}
              />
            </View>
          </View>
        </View>

        <InterpolationSelectPanel onInterpolationSelected={setAnimation}/>
      </View>
    </ScrollView>
  );
}

export default MotionPinsPlayScreen;
