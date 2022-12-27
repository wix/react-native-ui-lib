import React, {Fragment, useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Slider, SliderNew} from 'react-native-ui-lib'; //eslint-disable-line

const MIN = 0;
const MAX = 100;
const PlaygroundScreen = () => {
  const [sliderMinValue, setSliderMinValue] = useState(MIN);
  const [sliderMaxValue, setSliderMaxValue] = useState(MAX);

  const onSliderRangeChange = (values: {min: number, max: number}) => {
    const {min, max} = values;
    setSliderMinValue(min);
    setSliderMaxValue(max);
  };

  const onValueChange = (value: number) => {
    setSliderMaxValue(value);
  };

  const onRangeChange = ({min, max}) => {
    setSliderMaxValue(max);
    setSliderMinValue(min);
  };

  const renderValuesBox = (min: number, max: number) => {
    return (
      <View row spread marginV-15>
        <Text bodySmall $textNeutral>
          min. {min}
        </Text>
        <Text bodySmall $textNeutral>
          max. {max}
        </Text>
      </View>
    );
  };

  return (
    <View bg-grey80 flex padding-20>
      <Fragment>
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
      </Fragment>

      <Text $textDefault text70BO marginV-15>
        Reanimated Slider
      </Text>
      {renderValuesBox(sliderMinValue, sliderMaxValue)}
      <SliderNew
        // useRange
        onValueChange={onValueChange}
        onRangeChange={onRangeChange}
      />
    </View>
  );
};

export default PlaygroundScreen;

const styles = StyleSheet.create({
  container: {
  }
});
