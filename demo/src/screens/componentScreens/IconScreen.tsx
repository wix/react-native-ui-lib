import React, {useState} from 'react';
import {Assets, View, Icon, Text, Slider, Switch, GradientSlider} from 'react-native-ui-lib';

const IconScreen = () => {
  const [size, setSize] = useState(24);
  const [customSize, setCustomSize] = useState(false);
  const [color, setColor] = useState<string | number>();
  const [customColor, setCustomColor] = useState(false);

  return (
    <View padding-page>
      <Text h1 marginB-s4>
        Icon Screen
      </Text>
      <View center>
        <Icon
          margin-30
          size={customSize ? size : undefined}
          tintColor={customColor ? (color as string) : undefined}
          source={Assets.icons.search}
        />
      </View>
      <View marginB-s3 row>
        <Text marginR-s2>Custom Size</Text>
        <Switch value={customSize} onValueChange={setCustomSize}/>
      </View>
      <Slider maximumValue={100} value={24} step={1} onValueChange={setSize}/>
      <Text marginB-50 marginT-s2>
        Custom size: {size}
      </Text>
      <View marginB-s3 row>
        <Text marginR-s2>Custom Color</Text>
        <Switch value={customColor} onValueChange={setCustomColor}/>
      </View>
      <GradientSlider type={GradientSlider.types.HUE} color={color as string} onValueChange={setColor}/>
      <Text marginT-s2>Custom color: {color || '#000000'}</Text>
    </View>
  );
};

export default IconScreen;
