import React, {useState} from 'react';
import {type ViewStyle, ScrollView} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';

// TODO replace with 'react-native-motion-lib'
import {FlipEffect} from '../../../packages/react-native-motion-lib/src/effects/FlipEffect';
import {Springs} from '../../../packages/react-native-motion-lib/src/tokens';
import type {AnimationProps} from '../../../packages/react-native-motion-lib/src/types';
import {AnimationConfigurationPanel} from './AnimationConfigurationPanel';

const cardStyle: ViewStyle = {
  width: 225,
  height: 150,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
};
  
function FrontCardFace() {
  return (
    <View style={{ ...cardStyle, backgroundColor: 'hsl(54, 100.00%, 57.50%)' }}>
      <Text center text40>Front</Text>
    </View>
  );
}

function BackCardFace() {
  return (
    <View style={{ ...cardStyle, backgroundColor: 'hsl(207, 66.50%, 44.50%)' }}>
      <Text center white text40>Back</Text>
    </View>
  );
}

function MotionCardFlip() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [animation, setAnimation] = useState<AnimationProps>({spring: Springs.gentle});

  return (
    <ScrollView contentContainerStyle={{padding: 20}}>
      <View flex useSafeArea>

        <Text text80 marginB-s3>Tap on the card</Text>

        <TouchableOpacity onPress={() => setIsFlipped(!isFlipped)} style={{alignSelf: 'center'}} activeOpacity={0}>
          <FlipEffect 
            FrontComponent={<FrontCardFace />} 
            BackComponent={<BackCardFace />} 
            height={200} 
            flipped={isFlipped}
            animation={animation}
            />
        </TouchableOpacity>
  
        <AnimationConfigurationPanel onAnimationSelected={setAnimation} />
      </View>
    </ScrollView>
  );
}

export default MotionCardFlip;
