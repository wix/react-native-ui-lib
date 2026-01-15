import React, {useState} from 'react';
import {type ViewStyle} from 'react-native';
import {View, Text, Button} from 'react-native-ui-lib';

// TODO replace with 'react-native-motion-lib'
import {FlipEffect} from '../../../packages/react-native-motion-lib/src/effects/FlipEffect';

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

function MotionSpringsPlayground() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <View flex useSafeArea padding-20>
      <Text text40 marginB-s4 marginT-s4>
        Card Flip
      </Text>

      <FlipEffect FrontComponent={<FrontCardFace />} BackComponent={<BackCardFace />} height={200} flipped={isFlipped} />
      <Button marginB-s4 marginT-s4 label="Flip" style={{alignSelf: 'center'}} onPress={() => {
        setIsFlipped(!isFlipped);
      }} />
    </View>
  );
}

export default MotionSpringsPlayground;
