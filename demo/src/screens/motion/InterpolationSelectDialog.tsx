import React from 'react';
import {ScrollView} from 'react-native';
import {Dialog} from 'react-native-ui-lib';

import {InterpolationSelectPanel, type TokenizedInterpolationSpecs} from './InterpolationSelectPanel';
export type {TokenizedInterpolationSpecs};

export type InterpolationSelectDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  value?: TokenizedInterpolationSpecs;
  onInterpolationSelected: (interpolation: TokenizedInterpolationSpecs) => void;
};

export function InterpolationSelectDialog({
  visible,
  onDismiss,
  value,
  onInterpolationSelected
}: InterpolationSelectDialogProps) {
  return (
    <Dialog
      useSafeArea
      visible={visible}
      onDismiss={onDismiss}
      bottom
      width="100%"
      headerProps={{title: 'Interpolation Configuration'}}
    >
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
      >
        <InterpolationSelectPanel
          value={value}
          onInterpolationSelected={onInterpolationSelected}
        />
      </ScrollView>
    </Dialog>
  );
}
