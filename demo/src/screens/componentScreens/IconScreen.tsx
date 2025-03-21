import React, {useState} from 'react';
import {Assets, View, Icon, Text, Slider, GradientSlider, Colors} from 'react-native-ui-lib';
import {renderBooleanOption} from '../ExampleScreenPresenter';

const DEFAULT_BADGE_SIZE = 20;
const DEFAULT_PIMPLE_SIZE = 10;

const IconScreen = () => {
  const [size, setSize] = useState(24);
  const [badgeSize, setBadgeSize] = useState(20);
  const [customSize, setCustomSize] = useState(false);
  const [customBadgeSize, setCustomBadgeSize] = useState(false);
  const [color, setColor] = useState<string | number>();
  const [customColor, setCustomColor] = useState(false);
  const [useBadge, setUseBadge] = useState(false);
  const [usePimple, setUsePimple] = useState(false);

  return (
    <View padding-page>
      <Text h1 marginB-s4>
        Icon Screen
      </Text>
      <View center margin-page>
        <Icon
          size={customSize ? size : undefined}
          tintColor={customColor ? (color as string) : undefined}
          source={Assets.icons.demo.search}
          badgeProps={
            useBadge
              ? {
                size: customBadgeSize ? badgeSize : usePimple ? DEFAULT_PIMPLE_SIZE : DEFAULT_BADGE_SIZE,
                backgroundColor: Colors.red30,
                label: !usePimple ? '5' : undefined
              }
              : undefined
          }
        />
      </View>

      {renderBooleanOption('Custom Size', 'customSize', {spread: false, state: customSize, setState: setCustomSize})}
      <Slider migrate maximumValue={100} value={24} step={1} onValueChange={setSize}/>
      <Text marginB-50 marginT-s2>
        Custom size: {size}
      </Text>

      {renderBooleanOption('Custom Badge Size', 'customBadgeSize', {
        spread: false,
        state: customBadgeSize,
        setState: setCustomBadgeSize
      })}
      <Slider migrate maximumValue={100} value={20} step={1} onValueChange={setBadgeSize}/>
      <Text marginB-50 marginT-s2>
        Custom badge size: {badgeSize}
      </Text>

      {renderBooleanOption('Custom Color', 'customColor', {
        spread: false,
        state: customColor,
        setState: setCustomColor
      })}
      <GradientSlider type={GradientSlider.types.HUE} color={color as string} onValueChange={setColor}/>
      <Text marginT-s2>Custom color: {color || '#000000'}</Text>

      <View marginV-s5>
        <Text marginR-s2 marginB-s2 text80BO>
          Badge Settings:
        </Text>
        {renderBooleanOption('Use Badge:', 'useBadge', {spread: false, state: useBadge, setState: setUseBadge})}
        {renderBooleanOption('Pimple Badge', 'showLabel', {spread: false, state: usePimple, setState: setUsePimple})}
      </View>
    </View>
  );
};

export default IconScreen;
