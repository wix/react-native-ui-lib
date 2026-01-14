import React from 'react';
import {View, Text, Button, TextField} from 'react-native-ui-lib';
import Animated, {useSharedValue, useAnimatedStyle, withSpring, withRepeat} from 'react-native-reanimated';

export function SpringBox() {
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
