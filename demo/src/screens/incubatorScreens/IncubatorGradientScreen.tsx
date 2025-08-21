import React, {useEffect, useMemo, useState} from 'react';
import {Assets, View, Text, Incubator, Icon, Colors} from 'react-native-ui-lib';
import {renderRadioGroup, renderSliderOption} from '../ExampleScreenPresenter';

const {Gradient} = Incubator;

const COLORS = [Colors.$backgroundPrimaryHeavy, Colors.$backgroundPrimaryHeavy, Colors.$backgroundPrimaryMedium];

const GradientScreen = () => {
  const [type, setType] = useState('rectangle');
  const [children, setChildren] = useState('none');
  const [alignment, setAlignment] = useState('none');
  const [size, setSize] = useState('fixed');
  const [error, setError] = useState('');
  const [angle, setAngle] = useState(0);

  const gradientProps = useMemo(() => {
    switch (type) {
      case 'rectangle':
        return size === 'fixed' ? {type: 'rectangle', width: 100, height: 100} : {type: 'rectangle'};
      case 'circle':
        return size === 'fixed' ? {type: 'circle', radius: 50} : {type: 'circle'};
      case 'border':
        return size === 'fixed' ? {type: 'border', width: 100, height: 100} : {type: 'border'};
    }
  }, [type, size]);

  const childrenProps = useMemo(() => {
    switch (children) {
      case 'shortText':
        return <Text>Lorem ipsum dolor sit amet.</Text>;
      case 'text':
        return (
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Text>
        );
      case 'icon':
        return <Icon source={Assets.icons.demo.search}/>;
    }
  }, [children]);

  const alignmentProp = useMemo(() => {
    switch (alignment) {
      case 'none':
        return undefined;
      case 'center':
        return {center: true};
      case 'centerH':
        return {centerH: true};
      case 'centerV':
        return {centerV: true};
    }
  }, [alignment]);

  useEffect(() => {
    if (children === 'none' && size === 'flex' && type !== 'border') {
      setError('No children + flex gives no gradient');
    } else if (size === 'flex' && type === 'circle') {
      setError('flex size will result with an ellipse instead of a circle');
    } else {
      setError('');
    }
  }, [children, size, type]);

  return (
    <View>
      {renderRadioGroup('Select type',
        'type',
        {Rectangle: 'rectangle', Circle: 'circle', Border: 'border'},
        {isRow: true, state: type, setState: setType})}
      {renderRadioGroup('Select children',
        'children',
        {No: 'none', 'Short text': 'shortText', Text: 'text', Icon: 'icon'},
        {isRow: true, state: children, setState: setChildren})}
      {renderRadioGroup('Select alignment',
        'alignment',
        {None: 'none', Center: 'center', CenterH: 'centerH', CenterV: 'centerV'},
        {isRow: true, state: alignment, setState: setAlignment})}
      {renderRadioGroup('Select size',
        'size',
        {Fixed: 'fixed', Flex: 'flex'},
        {isRow: true, state: size, setState: setSize})}
      <View marginH-s10>
        {renderSliderOption('Angle', 'angle', {
          min: 0,
          max: 360,
          step: 1,
          state: angle,
          setState: setAngle
        })}
      </View>
      <Gradient
        colors={COLORS}
        // @ts-expect-error
        type={type}
        {...gradientProps}
        {...alignmentProp}
        angle={angle}
      >
        {childrenProps}
      </Gradient>
      <Text marginT-s10 center $textDangerLight>
        {error}
      </Text>
    </View>
  );
};

export default GradientScreen;
