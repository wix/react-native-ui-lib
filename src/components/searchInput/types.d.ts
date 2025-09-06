/// <reference types="react" />
import { TextInputProps, StyleProp, ViewStyle, TextStyle, ActivityIndicatorProps } from 'react-native';
import { ButtonProps } from '../button';
export declare enum SearchInputPresets {
    DEFAULT = "default",
    PROMINENT = "prominent"
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
     * Props for the cancel button
     */
    cancelButtonProps?: ButtonProps;
    /**
     * Custom right element
     */
    customRightElement?: React.ReactElement;
    /**
     * Whether to show a loader instead of the left search icon
     */
    showLoader?: boolean;
    /**
     * Loader props
     */
    loaderProps?: ActivityIndicatorProps;
    /**
     * custom loader element
     */
    customLoader?: React.ReactElement;
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
};
