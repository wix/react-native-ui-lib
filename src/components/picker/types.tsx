import React, {PropsWithChildren, ReactNode} from 'react';
import {FlatListProps, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ExpandableOverlayProps, ExpandableOverlayMethods} from '../../incubator/expandableOverlay';
import {ModalProps, ModalTopBarProps} from '../../components/modal';
// TODO: Replace with new TextField Props after migration to new TextField has completed
// import {TextFieldProps} from '../../../typings/components/Inputs';
import {TextFieldMethods, TextFieldProps as NewTextFieldProps} from '../textField';
import {TouchableOpacityProps} from '../touchableOpacity';

// Note: enum values are uppercase due to legacy
export enum PickerModes {
  SINGLE = 'SINGLE',
  MULTI = 'MULTI'
}

export enum PickerFieldTypes {
  form = 'form',
  filter = 'filter',
  settings = 'settings'
}

// TODO: Remove type
// type PickerValueDeprecated = {value: string | number; label: string};

export type PickerSingleValue = string | number;
export type PickerMultiValue = PickerSingleValue[];
export type PickerValue = PickerSingleValue | PickerMultiValue | undefined;

type RenderPickerOverloads<ValueType> = ValueType extends PickerValue
  ? (value?: ValueType, label?: string) => React.ReactElement
  : never;
type RenderPicker = RenderPickerOverloads<PickerValue>;

export type RenderCustomModalProps = {
  visible: boolean;
  toggleModal: () => void;
  onSearchChange: (searchValue: string) => void;
  children: ReactNode;
  // onDone is relevant to multi mode only
  onDone: () => void;
  onCancel: () => void;
};

export interface PickerSearchStyle {
  icon?: number;
  color?: string;
  placeholderTextColor?: string;
  selectionColor?: string;
}

export type PickerPropsDeprecation = {
  /**
   * @deprecated
   * Temporary prop required for migration to Picker's new API
   */
  migrate?: boolean;
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
   * @deprecated
   * Callback for modal onShow event
   * Instead pass onShow via pickerModalProps
   */
  onShow?: () => void;
  /**
   * @deprecated
   */
  children?: ReactNode | undefined;
  /**
   * @deprecated
   * Render a custom header for Picker's dialog
   * instead use renderCustomOverlayHeader
   */
  renderCustomDialogHeader?: (callbacks: {onDone?: () => void; onCancel?: () => void}) => React.ReactElement;
  /**
   * @deprecated
   * Render custom picker - input will be value (see above)
   * Example:
   * renderPicker = (selectedItem) => {...}
   * instead use renderInput
   */
  renderPicker?: RenderPicker;
};

type PickerSearchProps = {
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
  onSearchChange?: (searchValue: string, filteredChildren?: ReactNode | undefined) => void;
  /**
   * Render custom search input (only when passing showSearch)
   */
  renderCustomSearch?: (props: PickerItemsListProps) => React.ReactElement;
};

export type PickerBaseProps = Omit<NewTextFieldProps, 'value' | 'onChange'> & 
PickerSearchProps & PickerPropsDeprecation & {
  /* ...TextField.propTypes, */
  /**
   * Use dialog instead of modal picker
   */
  useDialog?: boolean;
  /**
   * Pass for different field type UI (form, filter or settings)
   */
  fieldType?: PickerFieldTypes | `${PickerFieldTypes}`;
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
  mode?: PickerModes | `${PickerModes}`;
  /**
   * Limit the number of selected items
   */
  selectionLimit?: number;
  /**
   * Adds blur effect to picker modal (iOS only)
   */
  enableModalBlur?: boolean;
  /**
   * Render custom picker input
   * Example:
   * renderInput = (selectedItem) => {...}
   */
  renderInput?: RenderPicker;
  /**
   * Render custom picker item
   */
  renderItem?: (
    value: PickerValue,
    itemProps: PickerItemProps & {isSelected: boolean; isItemDisabled: boolean},
    label?: string
  ) => React.ReactElement;
  /**
   * Render custom picker modal (e.g ({visible, children, toggleModal}) => {...})
   */
  renderCustomModal?: (modalProps: RenderCustomModalProps) => React.ReactElement;
  /**
   * Custom picker props (when using renderPicker, will apply on the button wrapper)
   */
  customPickerProps?: ExpandableOverlayProps;
  /**
   * Add onPress callback for when pressing the picker
   */
  onPress?: () => void;
  /**
   * A function that returns the label to show for the selected Picker value
   */
  getLabel?: (value: PickerValue) => string;
  /**
   * The picker modal top bar props
   */
  topBarProps?: ModalTopBarProps;
  /**
   * Render a custom header for Picker's Overlay
   */
  renderCustomOverlayHeader?: (callbacks: {onDone?: () => void; onCancel?: () => void}) => React.ReactElement;
  /**
   * Use wheel picker instead of a list picker
   */
  useWheelPicker?: boolean;
  /**
   * Pass props to the list component that wraps the picker options (allows to control FlatList behavior)
   */
  listProps?: Partial<FlatListProps<any>>;
  /**
   * Pass props to the picker modal
   */
  pickerModalProps?: ModalProps;
  /**
   * Custom container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Add safe area in the Picker modal view
   */
  useSafeArea?: boolean;
  /**
   * Data source for Picker
   */
  items?: PickerItemProps[];
  /**
   * Component test id
   */
  testID?: string;
};

export type PickerPropsWithSingle = PickerBaseProps & {
  mode?: PickerModes.SINGLE;
  value?: PickerSingleValue;
  onChange?: (value: PickerSingleValue) => void;
};

export type PickerPropsWithMulti = PickerBaseProps & {
  mode?: PickerModes.MULTI;
  value?: PickerMultiValue;
  onChange?: (value: PickerMultiValue) => void;
};

export type PickerProps = PickerPropsWithSingle | PickerPropsWithMulti;

export interface PickerItemProps extends Pick<TouchableOpacityProps, 'customValue'> {
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
  getItemLabel?: (value: PickerValue) => string;
  /**
   * @deprecated Function to return the value out of the item value prop when value is custom shaped.
   */
  getItemValue?: PickerPropsDeprecation['getItemValue'];
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
   * Callback for onPress action, will stop selection if false is returned
   * @param selected true\false in multi mode and undefined in single mode
   * @param props the props sent to the item
   */
  onPress?: (selected: boolean | undefined, props: any) => void | Promise<boolean>;
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
  | 'renderCustomOverlayHeader'
  | 'useSafeArea'
  | 'useWheelPicker'
  | 'useDialog'
  | 'mode'
  | 'testID'
> & {
  items?: {value: any; label: any}[];
};

export type PickerMethods = TextFieldMethods & ExpandableOverlayMethods;
