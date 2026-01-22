import React, {useState} from 'react';
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

  return (
    <View marginT-s4>
      <Text text70M marginB-s2>
        {title}
      </Text>

      <View row>
        <View flex marginR-s2>
          <Text text80>Start: {formatValue(startValue)}</Text>
          <Slider
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
          <Text text80>End: {formatValue(endValue)}</Text>
          <Slider
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
