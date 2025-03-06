import React from 'react';
import {PickerContextProps} from './types';

const PickerContext = React.createContext<PickerContextProps>({
  migrate: true,
  value: undefined,
  onPress: (_value: any) => {},
  isMultiMode: false,
  onSelectedLayout: (_event: any) => {},
  selectionLimit: undefined,
  multiDraftValue: [],
  toggleAllItemsSelection: (_items: any, _select: boolean) => {}
});

export default PickerContext;
