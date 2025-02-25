import {TextInputProps, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ButtonProps} from '../button';

export enum SearchInputPresets {
  DEFAULT = 'default',
  PROMINENT = 'prominent'
}

export interface SearchInputRef {
  blur: () => void;
  clear: () => void;
  focus: () => void;
}

export type SearchInputProps = TextInputProps & {
  /**
   * On clear button callback.
   */
  onClear?: () => void;
  /**
   * callback for dismiss action
   */
  onDismiss?: () => void;
  /**
   * The SearchInput colors (affects the search icon color, the filter icon color when 'showFilterIcon' is passed and the cancel button color)
   */
  schemeColor?: string | null;
  /**
   * Title prop
   */
  title?: string;
  /**
   * Pass true to add filter icon on the right
   */
  showFilterIcon?: boolean;
  /**
   * Whether to show a loader instead of the left search icon
   */
  showLoader?: boolean;
  /**
   * custom loader element
   */
  renderLoaderElement?: () => React.ReactElement;
  /**
   * converts the colors of the search's input elements, icons and button to white
   */
  invertColors?: boolean;
  /**
   * Turn off accessibility for this view and its nested children
   */
  inaccessible?: boolean;
  /**
   * in case the SearchInput is rendered in a safe area (top of the screen)
   */
  useSafeArea?: boolean;
  /**
   * Override styles for container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Override styles for the input
   */
  containerStyle?: StyleProp<ViewStyle | TextStyle>;
  /**
   * The preset for the search input: default or prominent
   */
  preset?: SearchInputPresets | `${SearchInputPresets}`;
  /**
   * Props for the cancel button
   */
  cancelButtonProps?: ButtonProps;
};
