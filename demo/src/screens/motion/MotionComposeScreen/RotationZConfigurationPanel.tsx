import React from 'react';
import {TransformationConfigurationPanel} from './TransformationConfigurationPanel';

export type RotationZConfigurationPanelProps = {
  initialValue: number;
  targetValue: number;
  onInitialChange: (value: number) => void;
  onTargetChange: (value: number) => void;
  onInitialPressIn?: () => void;
  onInitialPressOut?: () => void;
  onTargetPressIn?: () => void;
  onTargetPressOut?: () => void;
};

export function RotationZConfigurationPanel({
  initialValue,
  targetValue,
  onInitialChange,
  onTargetChange,
  onInitialPressIn,
  onInitialPressOut,
  onTargetPressIn,
  onTargetPressOut
}: RotationZConfigurationPanelProps) {
  return (
    <TransformationConfigurationPanel
      title="Rotation"
      initialValue={initialValue}
      targetValue={targetValue}
      onInitialChange={onInitialChange}
      onTargetChange={onTargetChange}
      onInitialPressIn={onInitialPressIn}
      onInitialPressOut={onInitialPressOut}
      onTargetPressIn={onTargetPressIn}
      onTargetPressOut={onTargetPressOut}
      formatValue={(value) => `${value.toFixed(0)}°`}
      initialMin={-360}
      initialMax={360}
      initialStep={30}
      targetMin={-360}
      targetMax={360}
      targetStep={30}
    />
  );
}
