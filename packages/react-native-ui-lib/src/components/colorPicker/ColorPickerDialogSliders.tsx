import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../style';
import ColorSliderGroup from '../slider/ColorSliderGroup';
import {HSLColor} from './ColorPickerPresenter';
import {ColorPickerDialogProps} from './ColorPickerDialog';

type SlidersProps = Pick<ColorPickerDialogProps, 'migrate'> & {
  keyboardHeight: number;
  color: HSLColor;
  onSliderValueChange: (value: HSLColor) => void;
};

const ColorPickerDialogSliders = (props: SlidersProps) => {
  const {keyboardHeight, color, migrate, onSliderValueChange} = props;
  const colorValue = color.a === 0 ? Colors.getHSL(Colors.$backgroundInverted) : color;
  
  return (
    <ColorSliderGroup<HSLColor>
      initialColor={colorValue}
      containerStyle={[styles.sliderGroup, {height: keyboardHeight}]}
      sliderContainerStyle={styles.slider}
      showLabels
      labelsStyle={styles.label}
      accessible={false}
      migrate={migrate}
      onValueChange={onSliderValueChange}
    />
  );
};

export default ColorPickerDialogSliders;

const styles = StyleSheet.create({
  sliderGroup: {
    paddingTop: 12,
    marginHorizontal: 20
  },
  slider: {
    marginBottom: 15,
    height: 26
  },
  label: {
    marginBottom: 3
  }
});
