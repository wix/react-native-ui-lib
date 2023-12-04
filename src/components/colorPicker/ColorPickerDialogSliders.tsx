import React from 'react';
import {Colors} from '../../style';
import {StyleSheet} from 'react-native';
import ColorSliderGroup from '../slider/ColorSliderGroup';
import {HSLColor} from './ColorPickerPresenter';
import {ColorPickerDialogProps} from './ColorPickerDialog';

type SlidersProps = Pick<ColorPickerDialogProps, 'migrate'> & {
  keyboardHeight: number;
  color: HSLColor;
  onSliderValueChange: (value: string) => void;
};

const Sliders = (props: SlidersProps) => {
  const {keyboardHeight, color, migrate, onSliderValueChange} = props;
  const colorValue = color.a === 0 ? Colors.$backgroundInverted : Colors.getHexString(color);
  return (
    <ColorSliderGroup
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

export default Sliders;

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
