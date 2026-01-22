import React from 'react';
import {TransformationConfigurationPanel} from './TransformationConfigurationPanel';

export type TranslationYConfigurationPanelProps = {
  initialValue: number;
  targetValue: number;
  onInitialChange: (value: number) => void;
  onTargetChange: (value: number) => void;
  onInitialPressIn?: () => void;
  onInitialPressOut?: () => void;
  onTargetPressIn?: () => void;
  onTargetPressOut?: () => void;
};

export function TranslationYConfigurationPanel({
  initialValue,
  targetValue,
  onInitialChange,
  onTargetChange,
  onInitialPressIn,
  onInitialPressOut,
  onTargetPressIn,
  onTargetPressOut
}: TranslationYConfigurationPanelProps) {
  return (
    <TransformationConfigurationPanel
      title="Translation (Y-axis)"
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
