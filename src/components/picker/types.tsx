import React, {PropsWithChildren} from 'react';
import {FlatListProps, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ExpandableOverlayProps} from '../../incubator/expandableOverlay';
import {ModalTopBarProps} from '../modal/TopBar';
// TODO: Replace with new TextField Props after migration to new TextField has completed
import {TextFieldProps} from '../../../typings/components/Inputs';

// Note: enum values are uppercase due to legacy
export enum PickerModes {
  SINGLE = 'SINGLE',
  MULTI = 'MULTI'
}

type PickerValueDeprecated = {value: string | number; label: string};

export type PickerSingleValue = string | number | PickerValueDeprecated;
export type PickerMultiValue = PickerSingleValue[];
export type PickerValue = PickerSingleValue | PickerMultiValue;

export interface PickerSearchStyle {
  icon?: number;
  color?: string;
  placeholderTextColor?: string;
  selectionColor?: string;
}

// TODO: need to extend TextField props (and not just TextInputProps)
export interface PickerBaseProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  /**
   * Temporary prop required for migration to Picker's new API
   */
  migrate?: boolean;
  /**
   * Temporary prop required for inner text field migration
   */
  migrateTextField?: boolean;
  /* ...TextField.propTypes, */
  /**
   * Picker current value in the shape of {value: ..., label: ...}, for custom shape use 'getItemValue' prop
   */
  value?: PickerValue;

  /**
   * Callback for when picker value change
   */
  onChange?: (value: PickerValue) => void;
  /**
   * SINGLE mode or MULTI mode
   */
  mode?: PickerModes;
  /**
   * Limit the number of selected items
   */
  selectionLimit?: number;
  /**
   * Adds blur effect to picker modal (iOS only)
   */
  enableModalBlur?: boolean;
  /**
   * Render custom picker - input will be value (see above)
   * Example:
   * renderPicker = (selectedItem) => {...}
   */
  renderPicker?: (value?: PickerValue, label?: string) => React.ReactElement;
  /**
   * Render custom picker item
   */
  renderItem?: (
    value: PickerValue,
    itemProps: PickerItemProps & {isSelected: boolean},
    label: string
  ) => React.ReactElement;
  /**
   * Render custom picker modal (e.g ({visible, children, toggleModal}) => {...})
   */
  renderCustomModal?: (modalProps: ExpandableOverlayProps['modalProps']) => React.ReactElement;
  /**
   * Custom picker props (when using renderPicker, will apply on the button wrapper)
   */
  customPickerProps?: ExpandableOverlayProps;
  /**
   * Add onPress callback for when pressing the picker
   */
  onPress?: () => void;
  /**
   * @deprecated
   * A function that extract the unique value out of the value prop in case value has a custom structure (e.g. {myValue, myLabel})
   */
  getItemValue?: (value: PickerValue) => any;
  /**
   * @deprecated
   * A function that extract the label out of the value prop in case value has a custom structure (e.g. {myValue, myLabel})
   */
  getItemLabel?: (value: PickerValue) => string;
  /**
   * A function that returns the label to show for the selected Picker value
   */
  getLabel?: (value: PickerValue) => string;
  /**
   * The picker modal top bar props
   */
  topBarProps?: ModalTopBarProps;
  /**
   * Show search input to filter picker items by label
   */
  showSearch?: boolean;
  /**
   * Style object for the search input (only when passing showSearch)
   */
  searchStyle?: PickerSearchStyle;
  /**
   * Placeholder text for the search input (only when passing showSearch)
   */
  searchPlaceholder?: string;
  /**
   * callback for picker modal search input text change (only when passing showSearch)
   */
  onSearchChange?: (searchValue: string) => void;
  /**
   * Render custom search input (only when passing showSearch)
   */
  renderCustomSearch?: (props: PickerItemsListProps) => React.ReactElement;
  /**
   * Allow to use the native picker solution (different style for iOS and Android)
   */
  useNativePicker?: boolean;
  /**
   * Callback for rendering a custom native picker inside the dialog (relevant to native picker only)
   */
  renderNativePicker?: () => React.ReactElement;
  /**
   * Pass props to the list component that wraps the picker options (allows to control FlatList behavior)
   */
  listProps?: FlatListProps<any>;
  /**
   * Pass props to the picker modal
   */
  pickerModalProps?: object;
  /**
   * Custom container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Callback for modal onShow event
   */
  onShow?: () => void;
  /**
   * Component test id
   */
  testID?: string;
}

export interface PickerPropsWithSingle extends PickerBaseProps {
  mode: PickerModes.SINGLE;
  value: PickerSingleValue;
}

export interface PickerPropsWithMulti extends PickerBaseProps {
  mode: PickerModes.MULTI;
  value: PickerMultiValue;
}

export type PickerProps = & (PickerPropsWithSingle | PickerPropsWithMulti);

export interface PickerItemProps {
  /**
   * Item's value
   */
  value: PickerSingleValue;
  /**
   * Item's label
   */
  label: string;
  /**
   * Item's label style
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Custom function for the item label (e.g (value) => customLabel)
   */
  getItemLabel?: PickerProps['getItemLabel'];
  /**
   * @deprecated Function to return the value out of the item value prop when value is custom shaped.
   */
  getItemValue?: PickerProps['getItemValue'];
  /**
   * Render custom item
   */
  renderItem?: PickerProps['renderItem'];
  /**
   * Pass to change the selected icon
   */
  selectedIcon?: number;
  /**
   * Pass to change the selected icon color
   */
  selectedIconColor?: string;
  /**
   * Is the item disabled
   */
  disabled?: boolean;
  /**
   * Callback for onPress action
   */
  onPress?: () => void;
  /**
   * Component test id
   */
  testID?: string;
}

export interface PickerContextProps
  extends Pick<PickerProps, 'migrate' | 'value' | 'getItemValue' | 'getItemLabel' | 'renderItem' | 'selectionLimit'> {
  onPress: (value: PickerSingleValue) => void;
  isMultiMode: boolean;
  onSelectedLayout: (event: any) => any;
  selectionLimit: PickerProps['selectionLimit'];
}

export type PickerItemsListProps = Pick<
  PropsWithChildren<PickerProps>,
  | 'topBarProps'
  | 'listProps'
  | 'children'
  | 'showSearch'
  | 'searchStyle'
  | 'searchPlaceholder'
  | 'onSearchChange'
  | 'renderCustomSearch'
  | 'testID'
>;
