import React, {useState, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Slider, SliderNew, Button} from 'react-native-ui-lib'; //eslint-disable-line

const VALUE = 50;
const MIN = 0;
const MAX = 100;
const PlaygroundScreen = () => {
  const [sliderValue, setSliderValue] = useState(VALUE);
  const [sliderMinValue, setSliderMinValue] = useState(MIN);
  const [sliderMaxValue, setSliderMaxValue] = useState(MAX);
  const slider = useRef<typeof SliderNew>();
  const rangeSlider = useRef<typeof SliderNew>();

  const resetSlider = () => {
    slider.current?.reset();
    rangeSlider.current?.reset();
  };

  const onValueChange = (value: number) => {
    // console.warn('onValueChange: ', value);
    setSliderValue(value);
  };

  const onRangeChange = ({min, max}) => {
    // console.warn('onRangeChange: ', min, max);
    setSliderMaxValue(max);
    setSliderMinValue(min);
  };

  const renderValuesBox = (min: number, max?: number) => {
    if (max) {
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
      <Button link label="Reset" onPress={resetSlider}/>

      <Text $textDefault text70BO marginV-15>
        Reanimated Slider
      </Text>
      
      <View marginT-40>
        {renderValuesBox(sliderValue)}
        <SliderNew
          onValueChange={onValueChange}
          value={VALUE}
          minimumValue={0}
          maximumValue={100}
          step={10}
          // disableRTL={forceLTR}
          ref={slider}
        />
      </View>
      <View marginT-40>
        {renderValuesBox(sliderMinValue, sliderMaxValue)}
        <SliderNew
          useRange
          onRangeChange={onRangeChange}
          minimumValue={0}
          maximumValue={100}
          initialMinimumValue={25}
          initialMaximumValue={75}
          // step={10}
          // disableRTL={forceLTR}
          ref={rangeSlider}
          useGap
        />
      </View>
    </View>
  );
};

export default PlaygroundScreen;

const styles = StyleSheet.create({
  container: {
  }
});
