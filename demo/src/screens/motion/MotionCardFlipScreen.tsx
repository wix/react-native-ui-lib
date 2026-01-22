import React, {useState} from 'react';
import {type ViewStyle, ScrollView, TouchableHighlight} from 'react-native';
import {View, Text} from 'react-native-ui-lib';

import {FlipEffect, Springs, type AnimationSpecs} from 'react-native-motion-lib';

import {AnimationConfigurationPanel} from './AnimationConfigurationPanel';

const cardStyle: ViewStyle = {
  width: 225,
  height: 150,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10
};
  
function FrontCardFace() {
  return (
    <View style={{...cardStyle, backgroundColor: 'hsl(54, 100.00%, 57.50%)'}}>
      <Text center text40>Front</Text>
    </View>
  );
}

function BackCardFace() {
  return (
    <View style={{...cardStyle, backgroundColor: 'hsl(207, 66.50%, 44.50%)'}}>
      <Text center white text40>Back</Text>
    </View>
  );
}

function MotionCardFlip() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [animation, setAnimation] = useState<AnimationSpecs>({spring: Springs.gentle});

  return (
    <ScrollView contentContainerStyle={{padding: 20}}>
      <View flex useSafeArea>

        <Text text80 marginB-s3>Tap on the card</Text>

        <TouchableHighlight onPress={() => setIsFlipped(!isFlipped)} style={{alignSelf: 'center'}}>
          <FlipEffect 
            FrontComponent={<FrontCardFace/>} 
            BackComponent={<BackCardFace/>} 
            height={200} 
            flipped={isFlipped}
            animation={animation}
          />
        </TouchableHighlight>
  
        <AnimationConfigurationPanel onAnimationSelected={setAnimation}/>
      </View>
    </ScrollView>
  );
}

export default MotionCardFlip;
