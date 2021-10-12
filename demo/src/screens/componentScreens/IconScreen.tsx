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
          tintColor={customColor ? color : undefined}
          source={Assets.icons.search}
        />
      </View>

      <View marginB-s3 row>
        <Text marginR-s2>Custom Size</Text>
        <Switch value={customSize} onValueChange={value => setCustomSize(value)}/>
      </View>
      <Slider maximumValue={100} value={24} step={1} onValueChange={value => setSize(value)}/>
      <Text marginB-50 marginT-s2>
        Custom size: {size}
      </Text>

      <View marginB-s3 row>
        <Text marginR-s2>Custom Color</Text>
        <Switch value={customColor} onValueChange={value => setCustomColor(value)}/>
      </View>
      <GradientSlider type={GradientSlider.types.HUE} color={color as string} onValueChange={value => setColor(value)}/>
      <Text marginT-s2>Custom color: {color || '#000000'}</Text>
    </View>
  );
};

export default IconScreen;
