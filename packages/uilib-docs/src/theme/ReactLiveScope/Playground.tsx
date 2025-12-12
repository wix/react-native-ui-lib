import React from 'react';
import {Switch, Text, View} from 'react-native-ui-lib';

interface ControlBaseProps<S> {
  state: S;
  setState: React.Dispatch<React.SetStateAction<S>>;
}

interface ToggleControlProps extends ControlBaseProps<boolean> {
  title: string;
  key?: string;
  spread?: boolean;
}

export function ToggleControl(props: ToggleControlProps) {
  const {state, setState, title, spread = false, key = 'does not change'} = props;
  return (
    <View row centerV spread={spread} marginB-s4 key={key}>
      <Text $textDefault flex={spread} marginR-s4={!spread}>
        {title}
      </Text>
      <Switch key={key} testID={key} value={state} onValueChange={setState}/>
    </View>
  );
}
