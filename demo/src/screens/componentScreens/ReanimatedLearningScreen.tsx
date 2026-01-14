import React from 'react';
import { ScrollView, type ViewStyle } from 'react-native';
import {View, Text, Button, TextField, Colors} from 'react-native-ui-lib';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, useDerivedValue, withSpring, withSequence, withRepeat, withDelay, interpolateColor} from 'react-native-reanimated';

const spring = {
  // Gentle spring (smooth, natural)
  gentle: {
    damping: 30,
    stiffness: 200,
    mass: 1,
  },
  
  // Bouncy spring (playful)
  bouncy: {
    damping: 15,
    stiffness: 300,
    mass: 1,
  },
  
  // Snappy spring (quick response)
  snappy: {
    damping: 20,
    stiffness: 400,
    mass: 0.8,
  },
  
  // Wobbly spring (exaggerated)
  wobbly: {
    damping: 10,
    stiffness: 200,
    mass: 1,
  },
} as const;

function SpringBox() {
      // State for input values
      const [damping, setDamping] = React.useState(10);
      const [stiffness, setStiffness] = React.useState(100);
      const [mass, setMass] = React.useState(1);
  
      // Shared value for scale
      const scale = useSharedValue(1);
  
      // Animated style for the spring box
      const springAnimStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
      }));
  
      return (
        <View marginT-s4 marginB-s4>
          <View row marginB-s2 centerV>
            <Text marginR-s1>Damping:</Text>
            <TextField
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                width: 50,
                marginRight: 16,
                textAlign: 'center',
                padding: 4,
              }}
              keyboardType="numeric"
              value={damping.toString()}
              onChangeText={val => {
                // Only allow positive numbers
                const num = Number(val.replace(/[^0-9.]/g, ''));
                if (!isNaN(num)) setDamping(num);
              }}
            />
            <Text marginR-s1>Stiffness:</Text>
            <TextField
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                width: 50,
                marginRight: 16,
                textAlign: 'center',
                padding: 4,
              }}
              keyboardType="numeric"
              value={stiffness.toString()}
              onChangeText={val => {
                const num = Number(val.replace(/[^0-9.]/g, ''));
                if (!isNaN(num)) setStiffness(num);
              }}
            />
            <Text marginR-s1>Mass:</Text>
            <TextField
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                width: 50,
                textAlign: 'center',
                padding: 4,
              }}
              keyboardType="numeric"
              value={mass.toString()}
              onChangeText={val => {
                const num = Number(val.replace(/[^0-9.]/g, ''));
                if (!isNaN(num)) setMass(num);
              }}
            />
          </View>
          <Animated.View
            style={[
              springAnimStyle,
              {
                width: 120,
                height: 60,
                borderRadius: 10,
                backgroundColor: '#71cef2',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                alignSelf: 'center'
              }
            ]}
          />
          <Button
            label="Spring Animate!"
            onPress={() => {
              scale.value = withRepeat(
                // withDelay(200,
                  withSpring(scale.value === 1 ? 2 : 1, {
                    damping: damping || 1,
                    stiffness: stiffness || 1,
                    mass: mass || 1,
                  }),
                // ),
                2,
                true);
            }}
            style={{alignSelf: 'center'}}
          />
        </View>
      );  
}

function CardFlip() {
  const duration = 500;
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const zIndexFront = useSharedValue(1);
  const zIndexBack = useSharedValue(0);

  // Round zIndex values to integers to avoid precision errors
  // zIndex must be an integer, but withTiming produces floats during animation
  const zIndexFrontRounded = useDerivedValue(() => Math.round(zIndexFront.value));
  const zIndexBackRounded = useDerivedValue(() => Math.round(zIndexBack.value));

  const animStyleF = useAnimatedStyle(() => ({
    transform: [
      {scaleX: scale.value},
      {scaleY: scale.value},
      {rotateY: `${rotate.value}deg`},
    ],
    zIndex: zIndexFrontRounded.value,
  }));
  const animStyleB = useAnimatedStyle(() => ({
    transform: [
      {scaleX: scale.value}, // Scale down to appear behind
      {scaleY: scale.value},
      {rotateY: `${rotate.value}deg`},
    ],
    zIndex: zIndexBackRounded.value,
  }));
  const cardStyle: ViewStyle = {
    position: 'absolute' as const,
    width: 150,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  };

  return (
    <>
      <View center marginB-s4 style={{height: 100}}>
        <Animated.View
          style={[ animStyleF, { ...cardStyle, backgroundColor: 'cyan' } ]}
          >
          <Text center>Front</Text>
        </Animated.View>

        <Animated.View
          style={[ animStyleB, { ...cardStyle, backgroundColor: 'blue' } ]}
          >
          <Text center white>Back</Text>
        </Animated.View>
      </View>
      <Button marginB-s4 label="animate!" style={{alignSelf: 'center'}} onPress={() => {
        scale.value = scale.value === 1 ?
          withTiming(1.5, { duration: 500 }) :
          withTiming(1, { duration: 500 });

        rotate.value = withTiming(rotate.value === 0 ? 180 : 0, {duration});
        // Swap zIndex to flip which card is on top
        zIndexFront.value = withTiming(zIndexFront.value === 1 ? 0 : 1, {duration});
        zIndexBack.value = withTiming(zIndexBack.value === 0 ? 1 : 0, {duration});
      }} />
    </>
  );
}

function ColorInterpolation() {
  const color = useSharedValue(0);
  const colorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      color.value,
      [0, 1],
      ['red', 'blue'],
    ),
  }));
  
  return (
    <View center>
      <Animated.View style={[colorStyle, { width: 100, height: 100, borderRadius: 10 }]} />
      <Button label="animate!" marginT-s4 style={{alignSelf: 'center'}} onPress={() => {
        color.value = withTiming(color.value === 0 ? 1 : 0, { duration: 500 });
      }} />
    </View>
  );
}

export default function ReanimatedLearningScreen() {
  return (
    <ScrollView padding-page contentContainerStyle={{flexGrow: 1}} style={{marginStart: 16}}>
      <Text text40 marginB-s4>
        Spring Playground
      </Text>
      <SpringBox />

      <Text text40 marginB-s4 marginT-s4>
        Card Flip
      </Text>
      <CardFlip />

      <Text text40 marginB-s4 marginT-s4>
        Color Interpolation
      </Text>
      <ColorInterpolation />
    </ScrollView>
  );
}
