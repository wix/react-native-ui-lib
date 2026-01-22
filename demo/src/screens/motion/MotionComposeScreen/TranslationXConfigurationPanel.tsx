import React from 'react';
import {TransformationConfigurationPanel} from './TransformationConfigurationPanel';

export type TranslationXConfigurationPanelProps = {
  initialValue: number;
  targetValue: number;
  onInitialChange: (value: number) => void;
  onTargetChange: (value: number) => void;
  onInitialPressIn?: () => void;
  onInitialPressOut?: () => void;
  onTargetPressIn?: () => void;
  onTargetPressOut?: () => void;
};

export function TranslationXConfigurationPanel({
  initialValue,
  targetValue,
  onInitialChange,
  onTargetChange,
  onInitialPressIn,
  onInitialPressOut,
  onTargetPressIn,
  onTargetPressOut
}: TranslationXConfigurationPanelProps) {
  return (
    <TransformationConfigurationPanel
      title="Translation (X-axis)"
      initialValue={initialValue}
      targetValue={targetValue}
      onInitialChange={onInitialChange}
      onTargetChange={onTargetChange}
      onInitialPressIn={onInitialPressIn}
      onInitialPressOut={onInitialPressOut}
      onTargetPressIn={onTargetPressIn}
      onTargetPressOut={onTargetPressOut}
      formatValue={(value) => value.toFixed(0)}
      initialMin={-200}
      initialMax={200}
      initialStep={10}
      targetMin={-200}
      targetMax={200}
      targetStep={10}
    />
  );
}
