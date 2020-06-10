import React from 'react';
import {View, Text, TextInput} from 'react-native-ui-lib'; //eslint-disable-line

export default function TextInputScreen() {
  return (
    <View flex padding-page>
      <Text h1>TextInput</Text>
      <TextInput placeholder="TextInput" />
    </View>
  );
}
