import React from 'react';
import {Text, View} from 'react-native-ui-lib/core';
import Switch from 'react-native-ui-lib/switch';

interface BooleanGroupOptions {
  spread?: boolean;
  afterValueChanged?: () => void;
  state?: boolean;
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function renderBooleanOption(title: string,
  key: string,
  {spread, afterValueChanged, state, setState}: BooleanGroupOptions = {spread: true}) {
  // @ts-ignore
  const value = state ?? this.state[key];
  return (
    <View row centerV spread={spread} marginB-s4 key={key}>
      <Text $textDefault flex={spread} marginR-s4={!spread}>
        {title}
      </Text>
      <Switch
        key={key}
        testID={key}
        value={value}
        onValueChange={value => {
          if (setState) {
            setState(value);
          } else {
            // @ts-ignore
            this.setState({[key]: value}, afterValueChanged);
          }
        }}
      />
    </View>
  );
}
