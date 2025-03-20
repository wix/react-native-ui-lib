import {PropsWithChildren, ReactNode} from 'react';
import {FlatListProps, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ExpandableOverlayProps, ExpandableOverlayMethods} from '../../incubator/expandableOverlay';
import {ModalTopBarProps} from '../modal/TopBar';
import {TextFieldMethods, TextFieldProps} from '../textField';
import {TouchableOpacityProps} from '../touchableOpacity';
import {ButtonProps} from '../button';
import {CheckboxProps} from '../checkbox';

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
type PickerFilteredItems = ReactNode | Pick<PickerItemProps, 'label' | 'value' | 'disabled'>[] | undefined;

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

type PickerPropsDeprecation = {
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
   * Instead pass onShow via customPickerProps.modalProps.onShow
   */
  onShow?: () => void;
  /**
   * @deprecated
   * instead pass items
   */
  children?: ReactNode | undefined;
  /**
   * @deprecated
   * Render a custom header for Picker's dialog
   * instead use renderHeader
   */
  renderCustomDialogHeader?: (callbacks: {onDone?: () => void; onCancel?: () => void}) => React.ReactElement;
  /**
   * @deprecated
   * Render custom picker input (the value will be passed)
   * Example:
   * renderPicker = (selectedItem) => {...}
   * instead use renderInput
   */
  renderPicker?: RenderPicker;
  /**
   * @deprecated
   * Render custom picker overlay (e.g ({visible, children, toggleModal}) => {...})
   * instead use renderOverlay
   */
  renderCustomModal?: (modalProps: RenderCustomModalProps) => React.ReactElement;
  /**
   * @deprecated
   * Pass props to the picker modal
   * instead pass modalProps via customPickerProps.modalProps
   */
  pickerModalProps?: ExpandableOverlayProps['modalProps'];
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
  onSearchChange?: (searchValue: string, filteredItems?: PickerFilteredItems) => void;
  /**
   * Render custom search input (only when passing showSearch)
   */
  renderCustomSearch?: (props: PickerItemsListProps) => React.ReactElement;
};

type PickerListProps = PickerSearchProps & {
  /**
   * Render a custom header for Picker's Overlay
   */
  renderHeader?: (callbacks: {onDone?: () => void; onCancel?: () => void}) => React.ReactElement;
  /**
   * Pass props to the list component that wraps the picker items (allows to control FlatList behavior)
   */
  listProps?: Partial<FlatListProps<any>>;
  /**
   * The picker modal top bar props
   */
  topBarProps?: ModalTopBarProps;
  /**
   * Add safe area in the Picker modal view
   */
  useSafeArea?: boolean;
};

type PickerExpandableOverlayProps = {
  /**
   * Custom picker overlay props
   */
  customPickerProps?: ExpandableOverlayProps;
  /**
   * Render custom picker overlay (e.g ({visible, children, toggleModal}) => {...})
   */
  renderOverlay?: (modalProps: RenderCustomModalProps) => React.ReactElement;
  /**
   * Add blur effect to picker modal (iOS only)
   */
  enableModalBlur?: boolean;
};

interface PickerSelectionStatusLabelData {
  selectedCount: number;
  value: PickerMultiValue;
  areAllItemsSelected: boolean;
}

export type ButtonSelectionStatus = {
  /**
   * Select all element type
   */
  selectAllType?: 'button';
  /**
   * Button props
   */
  buttonProps?: ButtonProps;
};

export type CheckboxSelectionStatus = {
  /**
   * Select all element type
   */
  selectAllType?: 'checkbox';
  /**
   * Checkbox props
   */
  checkboxProps?: CheckboxProps;
};

export type PickerSelectionStatusProps = {
  /**
   * A function that generates a label based on the selected items' count and status
   */
  getLabel?: (data: PickerSelectionStatusLabelData) => string;
  /**
   * Custom container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Control weather to show the label or not
   */
  showLabel?: boolean;
} & (ButtonSelectionStatus | CheckboxSelectionStatus);

export type PickerBaseProps = Omit<TextFieldProps, 'value' | 'onChange'> &
  PickerPropsDeprecation &
  PickerExpandableOverlayProps &
  PickerListProps & {
    /* ...TextField.propTypes, */
    /**
     * Use dialog instead of modal picker
     */
    useDialog?: boolean;
    /**
     * Use wheel picker instead of a list picker
     */
    useWheelPicker?: boolean;
    /**
     * Picker value
     */
    value?: PickerValue;
    /**
     * Callback for when picker value change
     */
    onChange?: (value: PickerValue) => void;
    /**
     * SINGLE or MULTI selection mode
     */
    mode?: PickerModes | `${PickerModes}`;
    /**
     * Limit the number of selected items
     */
    selectionLimit?: number;
    /**
     * Pass for different field type UI (form, filter or settings)
     */
    fieldType?: PickerFieldTypes | `${PickerFieldTypes}`;
    /**
     * Render custom picker input (the value will be passed)
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
     * Render custom top element
     */
    renderCustomTopElement?: (value?: PickerValue) => React.ReactElement;
    /**
     * Selection status toolbar props
     */
    selectionStatus?: PickerSelectionStatusProps;
    /**
     * Add onPress callback for when pressing the picker
     */
    onPress?: () => void;
    /**
     * A function that returns the label to show for the selected Picker value
     */
    getLabel?: (value: PickerValue) => string;
    /**
     * Custom picker input container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Data source for Picker
     */
    items?: PickerItemProps[];
    /**
     * Component test id
     */
    testID?: string;
    /**
     * Show a loader (while items are loading/fetching)
     */
    showLoader?: boolean;
    /**
     * Custom loader element
     */
    customLoaderElement?: JSX.Element;
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
  areAllItemsSelected: boolean;
  toggleAllItemsSelection?: (selectAll: boolean) => void;
}

export type PickerItemsListProps = Pick<
  PropsWithChildren<PickerProps>,
  | 'topBarProps'
  | 'listProps'
  | 'renderHeader'
  | 'useSafeArea'
  | 'showLoader'
  | 'customLoaderElement'
  | 'renderCustomTopElement'
  | 'selectionStatus'
  | 'showSearch'
  | 'searchStyle'
  | 'searchPlaceholder'
  | 'onSearchChange'
  | 'renderCustomSearch'
  | 'children'
  | 'useWheelPicker'
  | 'useDialog'
  | 'mode'
  | 'testID'
> & {
  //TODO: after finish Picker props migration, items should be taken from PickerProps
  items?: {value: any; label: any}[];
};

export type PickerMethods = TextFieldMethods & ExpandableOverlayMethods;
