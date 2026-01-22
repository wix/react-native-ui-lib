import React from 'react';
import {TransformationConfigurationPanel} from './TransformationConfigurationPanel';

export type OpacityConfigurationPanelProps = {
  initialValue: number;
  targetValue: number;
  onInitialChange: (value: number) => void;
  onTargetChange: (value: number) => void;
  onInitialPressIn?: () => void;
  onInitialPressOut?: () => void;
  onTargetPressIn?: () => void;
  onTargetPressOut?: () => void;
};

export function OpacityConfigurationPanel({
  initialValue,
  targetValue,
  onInitialChange,
  onTargetChange,
  onInitialPressIn,
  onInitialPressOut,
  onTargetPressIn,
  onTargetPressOut
}: OpacityConfigurationPanelProps) {
  return (
    <TransformationConfigurationPanel
      title="Opacity"
      initialValue={initialValue}
      targetValue={targetValue}
      onInitialChange={onInitialChange}
      onTargetChange={onTargetChange}
      onInitialPressIn={onInitialPressIn}
      onInitialPressOut={onInitialPressOut}
      onTargetPressIn={onTargetPressIn}
      onTargetPressOut={onTargetPressOut}
      formatValue={(value) => value.toFixed(2)}
      initialMin={0}
      initialMax={1}
      initialStep={0.1}
      targetMin={0}
      targetMax={1}
      targetStep={0.1}
    />
  );
}
