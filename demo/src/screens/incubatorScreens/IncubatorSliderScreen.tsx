import React, {useState, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Button, Incubator} from 'react-native-ui-lib'; //eslint-disable-line

const VALUE = 20;
const NEGATIVE_VALUE = -30;
const MIN = 0;
const MAX = 100;

const IncubatorSliderScreen = () => {
  const [sliderValue, setSliderValue] = useState(VALUE);
  const [negativeSliderValue, setNegativeSliderValue] = useState(NEGATIVE_VALUE);
  const [sliderMinValue, setSliderMinValue] = useState(MIN);
  const [sliderMaxValue, setSliderMaxValue] = useState(MAX);
  const slider = useRef<typeof Incubator.Slider>();
  const negativeSlider = useRef<typeof Incubator.Slider>();
  const rangeSlider = useRef<typeof Incubator.Slider>();

  const resetSlider = () => {
    slider.current?.reset();
    rangeSlider.current?.reset();
    negativeSlider.current?.reset();
  };

  const onValueChange = (value: number) => {
    // console.warn('onValueChange: ', value);
    setSliderValue(value);
  };

  const onNegativeValueChange = (value: number) => {
    // console.warn('onValueChange: ', value);
    setNegativeSliderValue(value);
  };

  const onRangeChange = (value: {min: number, max: number}) => {
    // console.warn('onRangeChange: ', min, max);
    setSliderMaxValue(value.max);
    setSliderMinValue(value.min);
  };

  const renderValuesBox = (min: number, max?: number) => {
    if (max !== undefined) {
      return (
        <View row spread marginB-20>
          <Text bodySmall $textNeutral>min. {min}</Text>
          <Text bodySmall $textNeutral>max. {max}</Text>
        </View>
      );
    } else {
      return (
        <View center marginB-20>
          <Text bodySmall $textNeutral>value: {min}</Text>
        </View>
      );
    }
  };

  return (
    <View bg-grey80 flex padding-20>
      <Text h1>Slider</Text>
      <Button link label="Reset" onPress={resetSlider}/>

      <Text $textDefault text70BO marginV-15>
        Reanimated Slider
      </Text>
      
      <View marginT-40>
        <Text marginB-10>Default Slider range 20 to 100 step 10</Text>
        {renderValuesBox(sliderValue)}
        <Incubator.Slider
          ref={slider}
          onValueChange={onValueChange}
          value={VALUE}
          minimumValue={20}
          maximumValue={100}
          step={10}
          // disableRTL={forceLTR}
        />
      </View>

      <View marginT-40>
        <Text marginB-10>Default Slider range 0 to -100 step 10</Text>
        {renderValuesBox(negativeSliderValue)}
        <Incubator.Slider
          ref={negativeSlider}
          onValueChange={onNegativeValueChange}
          value={NEGATIVE_VALUE}
          minimumValue={-100}
          maximumValue={0}
          step={10}
          // disableRTL={forceLTR}
        />
      </View>

      <View margin-40>
        <Text marginB-10>Range Slider range 0 to 100</Text>
        {renderValuesBox(sliderMinValue, sliderMaxValue)}
        <Incubator.Slider
          ref={rangeSlider}
          useRange
          useGap
          onRangeChange={onRangeChange}
          minimumValue={MIN}
          maximumValue={MAX}
          initialMinimumValue={30}
          initialMaximumValue={70}
          // step={1}
          // disableRTL={forceLTR}
        />
      </View>
    </View>
  );
};

export default IncubatorSliderScreen;

const styles = StyleSheet.create({
  container: {
  }
});
