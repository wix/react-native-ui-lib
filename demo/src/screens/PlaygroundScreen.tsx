import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Slider, SliderNew} from 'react-native-ui-lib'; //eslint-disable-line

const MIN = 0;
const MAX = 100;
const PlaygroundScreen = () => {
  const [sliderMinValue, setSliderMinValue] = useState(MIN);
  const [sliderMaxValue, setSliderMaxValue] = useState(MAX);
  const useRange = false;

  const onSliderRangeChange = (values: {min: number, max: number}) => {
    const {min, max} = values;
    setSliderMinValue(min);
    setSliderMaxValue(max);
  };

  const onValueChange = (value: number) => {
    // console.warn('onValueChange: ', value);
    setSliderMaxValue(value);
  };

  const onRangeChange = ({min, max}) => {
    // console.warn('onRangeChange: ', min, max);
    setSliderMaxValue(max);
    setSliderMinValue(min);
  };

  const renderValuesBox = (min: number, max: number) => {
    return (
      <View row spread center={!useRange} marginV-15>
        {useRange &&
        <Text bodySmall $textNeutral>
          min. {min}
        </Text>
        }
        <Text bodySmall $textNeutral>
          max. {max}
        </Text>
      </View>
    );
  };

  return (
    <View bg-grey80 flex padding-20>
      <Text $textDefault text70BO marginV-15>
        Range Slider w/ initial values and step
      </Text>
      {renderValuesBox(sliderMinValue, sliderMaxValue)}
      <Slider
        useRange
        onRangeChange={onSliderRangeChange}
        value={20}
        step={5}
        minimumValue={0}
        maximumValue={100}
        // initialMinimumValue={MIN}
        // initialMaximumValue={MAX}
      />

      <Text $textDefault text70BO marginV-15>
        Reanimated Slider
      </Text>
      {renderValuesBox(sliderMinValue, sliderMaxValue)}
      <SliderNew
        useRange={useRange}
        onValueChange={onValueChange}
        onRangeChange={onRangeChange}
        minimumValue={0}
        maximumValue={100}
        // value={50}
        // initialMinimumValue={25}
        // initialMaximumValue={75}
        step={25}
      />
    </View>
  );
};

export default PlaygroundScreen;

const styles = StyleSheet.create({
  container: {
  }
});
