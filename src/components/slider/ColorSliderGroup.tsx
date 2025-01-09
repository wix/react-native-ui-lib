import _ from 'lodash';
import React, {useState, useCallback, useMemo} from 'react';
import {Colors} from '../../style';
import {useThemeProps} from '../../hooks';
import View from '../view';
import Text from '../text';
import {ColorSliderGroupProps, HSLA, GradientSliderTypes} from './types';
import SliderContext from './SliderContext';
import GradientSlider from './GradientSlider';

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorSliderGroup/ColorSliderGroup.gif?raw=true
 */
const ColorSliderGroup = <T extends string | HSLA = string>(props: ColorSliderGroupProps<T>) => {
  const themeProps = useThemeProps(props, 'ColorSliderGroup');
  const {
    initialColor,
    onValueChange,
    containerStyle,
    sliderContainerStyle,
    showLabels,
    labels = {hue: 'Hue', lightness: 'Lightness', saturation: 'Saturation', default: ''},
    labelsStyle,
    accessible,
    sliderProps,
    migrate
  } = themeProps;
  
  const _initialColor = useMemo<HSLA>(() => {
    return _.isString(initialColor) ? Colors.getHSL(initialColor) : initialColor;
  }, [initialColor]);

  const [value, setValue] = useState(_initialColor);

  const _setValue = useCallback((value: HSLA) => {
    setValue(value);
    const newValue = _.isString(initialColor) ? Colors.getHexString(value) : value;
    onValueChange?.(newValue as T);
  }, [initialColor, onValueChange]);
    
  const contextProviderValue = useMemo(() => ({value, setValue: _setValue}), [value, _setValue]);

  const renderSlider = (type: GradientSliderTypes) => {
    return (
      <>
        {showLabels && labels && (
          <Text recorderTag={'unmask'} $textNeutral text80 style={labelsStyle} accessible={accessible}>
            {labels[type]}
          </Text>
        )}
        <GradientSlider
          throttleTime={400}
          {...sliderProps}
          type={type}
          containerStyle={sliderContainerStyle}
          accessible={accessible}
          migrate={migrate}
        />
      </>
    );
  };

  return (
    <View style={containerStyle}>
      <SliderContext.Provider value={contextProviderValue}>
        {renderSlider(GradientSlider.types.HUE)}
        {renderSlider(GradientSlider.types.SATURATION)}
        {renderSlider(GradientSlider.types.LIGHTNESS)}
      </SliderContext.Provider>
    </View>
  );
};

ColorSliderGroup.displayName = 'ColorSliderGroup';
export default ColorSliderGroup;
