import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../style';
import ColorSliderGroup from '../slider/ColorSliderGroup';
import {HSLColor} from './ColorPickerPresenter';
import {ColorPickerDialogProps} from './ColorPickerDialog';
import {ColorPickerContext} from './context/ColorPickerContext';

type SlidersProps = Pick<ColorPickerDialogProps, 'migrate'> & {
  keyboardHeight: number;
};

const Sliders = (props: SlidersProps) => {
  const {keyboardHeight, migrate} = props;
  const colorPickerContext = useContext(ColorPickerContext);
  const colorValue =
    !colorPickerContext || colorPickerContext.value.value.a === 0
      ? Colors.getHSL(Colors.$backgroundInverted)
      : colorPickerContext?.value.value;

  return (
    <ColorSliderGroup<HSLColor>
      initialColor={colorValue}
      containerStyle={[styles.sliderGroup, {height: keyboardHeight}]}
      sliderContainerStyle={styles.slider}
      showLabels
      labelsStyle={styles.label}
      accessible={false}
      migrate={migrate}
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
