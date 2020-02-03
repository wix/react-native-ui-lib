import React from 'react';
import {View, Text, Checkbox, RadioGroup, RadioButton, ColorPalette, Colors} from 'react-native-ui-lib';
import _ from 'lodash';

export function renderBooleanOption(title, key) {
  const value = this.state[key];
  return (
    <View row centerV spread marginB-s4>
      <Text text70M style={{flex: 1}}>
        {title}
      </Text>
      <Checkbox useCustomTheme textID={key} value={value} onValueChange={value => this.setState({[key]: value})}/>
    </View>
  );
}

export function renderRadioGroup(title, key, options) {
  const value = this.state[key];
  return (
    <View marginB-s2>
      <Text text70M marginB-s2>
        {title}
      </Text>
      <RadioGroup initialValue={value} onValueChange={value => this.setState({[key]: value})}>
        {_.map(options, (value, key) => {
          return <RadioButton useCustomTheme testID={key} key={key} marginB-s2 label={value} value={options[key]}/>;
        })}
      </RadioGroup>
    </View>
  );
}

export function renderColorOption(title,
  key,
  colors = ['transparent', Colors.blue30, Colors.grey10, Colors.yellow30, Colors.green30, Colors.purple30]) {
  const value = this.state[key];
  return (
    <View marginV-s2>
      <Text text70M>{title}</Text>
      <ColorPalette
        value={value}
        colors={colors}
        onValueChange={value => this.setState({[key]: value === 'transparent' ? undefined : value})}
      />
    </View>
  );
}
