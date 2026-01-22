import React from 'react';
import {TransformationConfigurationPanel} from './TransformationConfigurationPanel';

export type ScaleConfigurationPanelProps = {
  initialValue: number;
  targetValue: number;
  onInitialChange: (value: number) => void;
  onTargetChange: (value: number) => void;
  onInitialPressIn?: () => void;
  onInitialPressOut?: () => void;
  onTargetPressIn?: () => void;
  onTargetPressOut?: () => void;
};

export function ScaleConfigurationPanel({
  initialValue,
  targetValue,
  onInitialChange,
  onTargetChange,
  onInitialPressIn,
  onInitialPressOut,
  onTargetPressIn,
  onTargetPressOut
}: ScaleConfigurationPanelProps) {
  return (
    <TransformationConfigurationPanel
      title="Scale"
      initialValue={initialValue}
      targetValue={targetValue}
      onInitialChange={onInitialChange}
      onTargetChange={onTargetChange}
      onInitialPressIn={onInitialPressIn}
      onInitialPressOut={onInitialPressOut}
      onTargetPressIn={onTargetPressIn}
      onTargetPressOut={onTargetPressOut}
      formatValue={(value) => value.toFixed(2)}
      initialMin={0.1}
      initialMax={2}
      initialStep={0.1}
      targetMin={0.1}
      targetMax={3}
      targetStep={0.1}
    />
  );
}
