import React, {useState, useRef, useCallback} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Constants, Colors, View, Text, Button, Incubator, GradientSlider, ColorSliderGroup} from 'react-native-ui-lib'; //eslint-disable-line
import {renderBooleanOption} from '../ExampleScreenPresenter';

const VALUE = 20;
const NEGATIVE_VALUE = -30;
const MIN = 0;
const MAX = 350;
const INITIAL_MIN = 30;
const INITIAL_MAX = 270;
const COLOR = Colors.blue30;
const GROUP_COLOR = Colors.yellow30;

const IncubatorSliderScreen = () => {
  const [disableRTL, setDisableRTL] = useState<boolean>(false);

  const [sliderValue, setSliderValue] = useState(0);
  const [customSliderValue, setCustomSliderValue] = useState(VALUE);
  const [negativeSliderValue, setNegativeSliderValue] = useState(NEGATIVE_VALUE);
  const [sliderMinValue, setSliderMinValue] = useState(INITIAL_MIN);
  const [sliderMaxValue, setSliderMaxValue] = useState(INITIAL_MAX);

  const [color, setColor] = useState(COLOR);
  const [groupColor, setGroupColor] = useState(GROUP_COLOR);
  const [alpha, setAlpha] = useState(1);

  const slider = useRef<Incubator.SliderRef>(null);
  const customSlider = useRef<Incubator.SliderRef>(null);
  const negativeSlider = useRef<Incubator.SliderRef>(null);
  const rangeSlider = useRef<Incubator.SliderRef>(null);

  const resetSliders = useCallback(() => {
    slider.current?.reset();
    customSlider.current?.reset();
    rangeSlider.current?.reset();
    negativeSlider.current?.reset();
  }, []);

  const onValueChange = useCallback((value: number) => {
    setSliderValue(value);
  }, []);

  const onCustomValueChange = useCallback((value: number) => {
    setCustomSliderValue(value);
  }, []);

  const onNegativeValueChange = useCallback((value: number) => {
    setNegativeSliderValue(value);
  }, []);

  const onRangeChange = useCallback((value: {min: number; max: number}) => {
    setSliderMaxValue(value.max);
    setSliderMinValue(value.min);
  }, []);

  const onGradientValueChange = useCallback((value: string, _: number) => {
    setColor(value);
  }, []);

  const onGradientAlphaValueChange = useCallback((_: string, alpha: number) => {
    setAlpha(alpha);
  }, []);

  const onGroupValueChange = (value: string) => {
    setGroupColor(value);
  };

  const renderValuesBox = (min: number, max?: number) => {
    if (max !== undefined) {
      return (
        <View row spread marginB-20>
          <Text bodySmall $textNeutral>
            min. {min}
          </Text>
          <Text bodySmall $textNeutral>
            max. {max}
          </Text>
        </View>
      );
    } else {
      return (
        <View center marginB-20>
          <Text bodySmall $textNeutral>
            value: {min}
          </Text>
        </View>
      );
    }
  };

  const renderDefaultSliderExample = () => {
    return (
      <View>
        <Text margin-10 text70BL $textDefault>
          Default Slider values 0 to 1
        </Text>
        {renderValuesBox(sliderValue)}
        <Incubator.Slider
          ref={slider}
          onValueChange={onValueChange}
          containerStyle={styles.container}
          disableRTL={disableRTL}
          // maximumValue={0}
          // maximumValue={50}
          step={0.1}
        />
      </View>
    );
  };

  const renderDisabledSliderExample = () => {
    return (
      <View marginT-20>
        <Text margin-10 text70BL $textDefault>
          Disabled Slider
        </Text>
        <Incubator.Slider value={0.4} containerStyle={styles.container} disableRTL={disableRTL} disabled/>
      </View>
    );
  };

  const renderCustomSliderExample = () => {
    return (
      <View marginT-20 marginH-40>
        <Text margin-10 text70BL $textDefault>
          Custom Slider
        </Text>
        {renderValuesBox(customSliderValue)}
        <Incubator.Slider
          ref={customSlider}
          onValueChange={onCustomValueChange}
          value={20}
          minimumValue={0}
          maximumValue={100}
          containerStyle={styles.container}
          trackStyle={styles.customTrack}
          minimumTrackTintColor={Colors.grey30}
          maximumTrackTintColor={Colors.grey70}
          // thumbTintColor={Colors.orange30}
          thumbStyle={styles.customThumb}
          activeThumbStyle={styles.customActiveThumb}
          disableRTL={disableRTL}
          // disableActiveStyling
        />
      </View>
    );
  };

  const renderNegativeSliderExample = () => {
    return (
      <View marginT-20>
        <Text margin-10 text70BL $textDefault>
          Negative values -20 to -100 initial -30
        </Text>
        {renderValuesBox(negativeSliderValue)}
        <Incubator.Slider
          ref={negativeSlider}
          onValueChange={onNegativeValueChange}
          value={-30}
          minimumValue={-100}
          maximumValue={-20}
          // step={10}
          containerStyle={styles.container}
          disableRTL={disableRTL}
        />
      </View>
    );
  };

  const renderRangeSliderExample = () => {
    return (
      <View marginT-20>
        <Text margin-10 text70BL $textDefault>
          Range Slider values 0 to 100
        </Text>
        <View marginH-20>
          {renderValuesBox(sliderMinValue, sliderMaxValue)}
          <Incubator.Slider
            ref={rangeSlider}
            useRange
            onRangeChange={onRangeChange}
            minimumValue={MIN}
            maximumValue={MAX}
            initialMinimumValue={INITIAL_MIN}
            initialMaximumValue={INITIAL_MAX}
            step={1}
            disableRTL={disableRTL}
          />
        </View>
      </View>
    );
  };

  const renderGradientSlidersExample = () => {
    return (
      <View marginH-20>
        <Text margin-10 text70BL $textDefault>
          Gradient Sliders
        </Text>
        <View row centerV>
          <Text text90 $textNeutral>
            DEFAULT
          </Text>
          <GradientSlider
            color={color}
            containerStyle={styles.gradientSliderContainer}
            onValueChange={onGradientAlphaValueChange}
            // @ts-expect-error
            ref={this.gradientSlider}
            migrate
          />
          <View style={styles.box}>
            <View style={{flex: 1, backgroundColor: color, opacity: alpha}}/>
          </View>
        </View>
        <View row centerV>
          <Text text90 $textNeutral>
            HUE
          </Text>
          <GradientSlider
            type={GradientSlider.types.HUE}
            color={color}
            containerStyle={styles.gradientSliderContainer}
            onValueChange={onGradientValueChange}
            migrate
          />
          <View style={styles.box}>
            <View style={{flex: 1, backgroundColor: color}}/>
          </View>
        </View>
      </View>
    );
  };

  const renderColorSliderGroupExample = () => {
    return (
      <>
        <Text margin-10 text70BL $textDefault>
          Color Slider Group
        </Text>
        <ColorSliderGroup
          initialColor={GROUP_COLOR}
          sliderContainerStyle={styles.slider}
          containerStyle={[styles.group, {borderWidth: 12, borderColor: groupColor}]}
          showLabels
          onValueChange={onGroupValueChange}
          migrate
        />
      </>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: Colors.$backgroundDefault}}>
      <View row spread margin-20>
        <Text h1 $textDefault>
          Slider
        </Text>
        <Button link label="Reset Sliders" onPress={resetSliders}/>
      </View>
      <View marginL-20>
        {Constants.isRTL &&
          renderBooleanOption('Disable RTL', 'disableRTL', {spread: false, state: disableRTL, setState: setDisableRTL})}
      </View>
      {renderDefaultSliderExample()}
      {renderDisabledSliderExample()}
      {renderCustomSliderExample()}
      {renderNegativeSliderExample()}
      {renderRangeSliderExample()}
      {renderGradientSlidersExample()}
      {renderColorSliderGroupExample()}
    </ScrollView>
  );
};

export default IncubatorSliderScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  customTrack: {
    borderRadius: 1.5,
    height: 3
  },
  customThumb: {
    width: 14,
    height: 14,
    borderWidth: 0.5,
    borderRadius: 7,
    backgroundColor: Colors.black,
    borderColor: Colors.black
  },
  customActiveThumb: {
    backgroundColor: Colors.red30,
    borderWidth: 2,
    borderColor: Colors.red70
  },
  gradientSliderContainer: {
    flex: 1, // NOTE: to place a slider in a row layout you must set flex in its 'containerStyle'!!!
    marginHorizontal: 20,
    marginVertical: 10
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.$outlineDefault
  },
  slider: {
    marginVertical: 6
  },
  group: {
    backgroundColor: Colors.$backgroundNeutralMedium,
    padding: 20,
    margin: 20,
    borderRadius: 6
  }
});
