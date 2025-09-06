import React from 'react';
import PickerItem from './PickerItem';
import { extractPickerItems } from './PickerPresenter';
import { PickerProps, PickerItemProps, PickerValue, PickerModes, PickerFieldTypes, PickerSearchStyle, RenderCustomModalProps, PickerItemsListProps, PickerMethods, PickerSelectionStatusProps } from './types';
type PickerStatics = {
    Item: typeof PickerItem;
    modes: typeof PickerModes;
    fieldTypes: typeof PickerFieldTypes;
    extractPickerItems: typeof extractPickerItems;
};
declare const Picker: React.ForwardRefExoticComponent<PickerProps & React.RefAttributes<unknown>>;
export { PickerProps, PickerItemProps, PickerValue, PickerModes, PickerFieldTypes, PickerSearchStyle, RenderCustomModalProps, PickerItemsListProps, PickerMethods, PickerSelectionStatusProps };
export { Picker };
declare const _default: React.ForwardRefExoticComponent<PickerProps & React.RefAttributes<unknown>> & PickerStatics;
export default _default;
