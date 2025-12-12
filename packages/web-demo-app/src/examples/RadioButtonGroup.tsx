import React, {useState} from 'react';
import {Colors, RadioButton, RadioGroup, Text, View} from 'react-native-ui-lib';

const renderRadioButton = (value: any, text: any, props?: any) => {
  return (
    <View row centerV marginB-5>
      <RadioButton value={value} label={text} {...props}/>
    </View>
  );
};

const renderRadioButtonForColorEnum = (color: any) => {
  return (
    <View row centerV marginB-5>
      <RadioButton value={color.name} label={color.name} labelStyle={{color: color.color}}/>
    </View>
  );
};

const COLORS = {
  ORANGE: {name: 'Orange', color: Colors.orange20},
  PURPLE: {name: 'Purple', color: Colors.purple20},
  GREEN: {name: 'Green', color: Colors.green20}
};


const RadioButtonGroupWrapper = () => {
  const [color, setColor] = useState();

  return (
    <RadioGroup initialValue={color || null} onValueChange={setColor}>
      {renderRadioButton(null, 'Default')}
      {renderRadioButtonForColorEnum(COLORS.ORANGE)}
      {renderRadioButtonForColorEnum(COLORS.PURPLE)}
      {renderRadioButtonForColorEnum(COLORS.GREEN)}
      <Text marginT-10>You chose: {color ? color : 'Default'}</Text>
    </RadioGroup>
  );
};

export default RadioButtonGroupWrapper;
