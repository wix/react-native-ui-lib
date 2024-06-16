import React, {PropsWithChildren, ReactNode} from 'react';
import {FlatListProps, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ExpandableOverlayProps, ExpandableOverlayMethods} from '../../incubator/expandableOverlay';
import {ModalTopBarProps} from '../modal/TopBar';
// TODO: Replace with new TextField Props after migration to new TextField has completed
// import {TextFieldProps} from '../../../typings/components/Inputs';
import {TextFieldMethods, TextFieldProps as NewTextFieldProps} from '../textField';
import {TouchableOpacityProps} from '../touchableOpacity';
import {DialogProps as DialogPropsOld} from '../dialog';
import {DialogProps as DialogPropsNew} from '../../incubator/Dialog';

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

export enum PickerModeTypes {
  Modal = 'modal',
  Dialog = 'dialog',
  WheelPicker = 'wheelPicker',
  Custom = 'custom'
}

export type PickerModeBooleans = {
  [key in PickerModeTypes]: boolean;
};

// TODO: Remove type
// type PickerValueDeprecated = {value: string | number; label: string};
export type PickerSingleValue = string | number;
export type PickerMultiValue = PickerSingleValue[];
export type PickerValue = PickerSingleValue | PickerMultiValue | undefined;
export type PickerType = PickerModeTypes | `${PickerModeTypes}`;

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

type OldDialogHeaderType = {
  /**
   * Picker header props depends on the picker type - DialogHeaderProps in case of Dialog or WheelPicker
   */
  headerProps?: DialogPropsOld['pannableHeaderProps'];
  migrateDialog: false;
};

type NewDialogHeaderType = {
  /**
   * Picker header props depends on the picker type - DialogHeaderProps in case of Dialog or WheelPicker
   */
  headerProps?: DialogPropsNew['headerProps'];
  migrateDialog: true;
};

type DialogHeaderProps = NewDialogHeaderType | OldDialogHeaderType;

export type DialogPickerProps = DialogHeaderProps & {
  /**
   * Type of picker to render
   */
  pickerType: PickerModeTypes.Dialog | `${PickerModeTypes.Dialog}`;
};

export type WheelPickerProps = DialogHeaderProps & {
  /**
   * Type of picker to render
   */
  pickerType: PickerModeTypes.WheelPicker | `${PickerModeTypes.WheelPicker}`;
};

export interface ModalPickerProps {
  /**
   * Type of picker to render
   */
  pickerType: PickerModeTypes.Modal | `${PickerModeTypes.Modal}`;
  /**
   * Picker header props depends on the picker type - ModalTopBarProps in case of Modal
   */
  headerProps?: ModalTopBarProps;
  modalProps?: ExpandableOverlayProps['modalProps'];
}

export interface CustomPickerProps {
  /**
   * Type of picker to render
   */
  pickerType: PickerModeTypes.Custom | `${PickerModeTypes.Custom}`;
  renderCustomModal?: (modalProps: RenderCustomModalProps) => React.ReactElement;
}

export type PickerTypeProps = Partial<ModalPickerProps | DialogPickerProps | WheelPickerProps | CustomPickerProps>;

export type PickerPropsDeprecation = {
  /**
   * @deprecated
   * Use wheel picker instead of a modal picker
   */
  useWheelPicker?: boolean;
  /**
   * @deprecated
   * Use dialog instead of modal picker
   */
  useDialog?: boolean;
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
   */
  onShow?: () => void;
  /**
   * @deprecated
   */
  children?: ReactNode | undefined;
  /**
   * @deprecated
   * The picker modal top bar props
   */
  topBarProps?: ModalTopBarProps;
  /**
   * @deprecated
   * Render custom picker modal (e.g ({visible, children, toggleModal}) => {...})
   */
  renderCustomModal?: (modalProps: RenderCustomModalProps) => React.ReactElement;
  /**
   * @deprecated
   * Pass props to the picker modal
   */
  pickerModalProps?: object;
};

export type PickerTypes = PickerTypeProps | PickerPropsDeprecation;

export type PickerBaseProps = Omit<NewTextFieldProps, 'value' | 'onChange'> & {
  /* ...TextField.propTypes, */

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
   * Render custom picker - input will be value (see above)
   * Example:
   * renderPicker = (selectedItem) => {...}
   */
  renderPicker?: RenderPicker;
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
  /**
   * Render a custom header for Picker's dialog
   */
  renderCustomDialogHeader?: (callbacks: {onDone?: () => void; onCancel?: () => void}) => React.ReactElement;
  /**
   * Pass props to the list component that wraps the picker options (allows to control FlatList behavior)
   */
  listProps?: Partial<FlatListProps<any>>;
  /**
   * Pass props to the picker modal
   */
  pickerModalProps?: object;
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

export type PickerPropsWithSingle = {
  mode?: PickerModes.SINGLE;
  value?: PickerSingleValue;
  onChange?: (value: PickerSingleValue) => void;
};

export type PickerPropsWithMulti = {
  mode?: PickerModes.MULTI;
  value?: PickerMultiValue;
  onChange?: (value: PickerMultiValue) => void;
};

type PickerCommonProps = PickerBaseProps & (PickerPropsWithSingle | PickerPropsWithMulti);

//TODO: Remove PickerPropsDeprecation type in v8
export type PickerProps = PickerCommonProps & PickerTypeProps & PickerPropsDeprecation;

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
  getItemLabel?: PickerPropsDeprecation['getItemLabel'];
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

export type PickerContextProps = Pick<PickerProps, 'value' | 'renderItem' | 'selectionLimit'> &
  Pick<PickerPropsDeprecation, 'migrate' | 'getItemValue' | 'getItemLabel'> & {
    onPress: (value: PickerSingleValue) => void;
    isMultiMode: boolean;
    onSelectedLayout: (event: any) => any;
    selectionLimit: PickerProps['selectionLimit'];
  };

export type PickerItemsListProps = Pick<
  PropsWithChildren<PickerProps>,
  | 'listProps'
  | 'showSearch'
  | 'searchStyle'
  | 'searchPlaceholder'
  | 'onSearchChange'
  | 'renderCustomSearch'
  | 'renderCustomDialogHeader'
  | 'useSafeArea'
  | 'mode'
  | 'testID'
> &
  Pick<PickerPropsDeprecation, 'topBarProps' | 'children'> & {
    items?: {value: any; label: any}[];
    type: PickerModeBooleans;
  };

export type PickerMethods = TextFieldMethods & ExpandableOverlayMethods;
