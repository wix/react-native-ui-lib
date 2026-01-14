import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { CardFlip } from './CardFlip';
import { ColorInterpolation } from './ColorInterpolation';
import { SpringBox } from './SpringBox';
import { EasingDemo } from './EasingDemo';

export default function ReanimatedLearningScreen() {
  return (
    <ScrollView padding-page contentContainerStyle={{flexGrow: 1}} style={{marginStart: 16}}>
      <Text text40 marginB-s4>
        Easing Demo
      </Text>
      <EasingDemo />

      <Text text40 marginB-s4 marginT-s4>
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
