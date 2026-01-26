import React, {useRef, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Colors, Slider, Text, View} from 'react-native-ui-lib';

export type TransformationConfigurationPanelProps = {
  title: string;
  initialValue: number;
  targetValue: number;
  onInitialChange: (value: number) => void;
  onTargetChange: (value: number) => void;
  onInitialPressIn?: () => void;
  onInitialPressOut?: () => void;
  onTargetPressIn?: () => void;
  onTargetPressOut?: () => void;
  formatValue: (value: number) => string;
  initialMin: number;
  initialMax: number;
  initialStep: number;
  targetMin: number;
  targetMax: number;
  targetStep: number;
};

export function TransformationConfigurationPanel({
  title,
  initialValue,
  targetValue,
  onInitialChange,
  onTargetChange,
  onInitialPressIn,
  onInitialPressOut,
  onTargetPressIn,
  onTargetPressOut,
  formatValue,
  initialMin,
  initialMax,
  initialStep,
  targetMin,
  targetMax,
  targetStep
}: TransformationConfigurationPanelProps) {
  const [startValue, setStartValue] = useState(initialValue);
  const [endValue, setEndValue] = useState(targetValue);
  const startSliderRef = useRef<React.ElementRef<typeof Slider>>(null);
  const endSliderRef = useRef<React.ElementRef<typeof Slider>>(null);

  return (
    <View marginT-s4>
      <Text text70M marginB-s2>
        {title}
      </Text>

      <View row>
        <View flex marginR-s2>
          <TouchableWithoutFeedback
            onPress={() => {
              setStartValue(initialValue);
              startSliderRef.current?.reset();
            }}
          >
            <Text text80>Start: {formatValue(startValue)}</Text>
          </TouchableWithoutFeedback>
          <Slider
            ref={startSliderRef}
            value={initialValue}
            thumbTintColor={Colors.$backgroundGeneralHeavy}
            minimumTrackTintColor={Colors.$backgroundGeneralHeavy}
            minimumValue={initialMin}
            maximumValue={initialMax}
            step={initialStep}
            onValueChange={(value) => {
              setStartValue(value);
              onInitialChange(value);
            }}
            onSeekStart={onInitialPressIn}
            onSeekEnd={onInitialPressOut}
          />
        </View>

        <View flex marginL-s2>
          <TouchableWithoutFeedback
            onPress={() => {
              setEndValue(targetValue);
              endSliderRef.current?.reset();
            }}
          >
            <Text text80>End: {formatValue(endValue)}</Text>
          </TouchableWithoutFeedback>
          <Slider
            ref={endSliderRef}
            value={targetValue}
            thumbTintColor={Colors.$backgroundGeneralHeavy}
            minimumTrackTintColor={Colors.$backgroundGeneralHeavy}
            minimumValue={targetMin}
            maximumValue={targetMax}
            step={targetStep}
            onValueChange={(value) => {
              setEndValue(value);
              onTargetChange(value);
            }}
            onSeekStart={onTargetPressIn}
            onSeekEnd={onTargetPressOut}
          />
        </View>
      </View>
    </View>
  );
}
