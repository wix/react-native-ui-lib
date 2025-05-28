import React, {Component, useEffect} from 'react';
import {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {View, Text, Card, TextField, Button} from 'react-native-ui-lib';

const PlaygroundScreen = () => {
  const translation = useSharedValue(0);
  // const scale = useSharedValue(1);

  useEffect(() => {
    translation.value = withTiming(100, {
      duration: 1000
    });
    // scale.value = withTiming(1.2, {
    //   duration: 1000
    // });
  }, []);

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{translateX: translation.value}, {scale: scale.value}]
  //   };
  // });

  return (
    <View bg-grey80 flex padding-20>
      <View marginT-20>
        <TextField migrate placeholder="Placeholder"/>
      </View>
      <Card height={100} center padding-20>
        <Text text50>Playground Screen</Text>
      </Card>
      <View flex center>
        <Button marginV-20 label="Button"/>
      </View>
    </View>
  );
};

export default PlaygroundScreen;
