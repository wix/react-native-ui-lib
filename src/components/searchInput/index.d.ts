import React from 'react';
import { SearchInputPresets, SearchInputProps, SearchInputRef } from './types';
declare const SearchInput: React.ForwardRefExoticComponent<import("react-native").TextInputProps & {
    onClear?: (() => void) | undefined;
    onDismiss?: (() => void) | undefined;
    cancelButtonProps?: import("../button").ButtonProps | undefined;
    customRightElement?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
    showLoader?: boolean | undefined;
    loaderProps?: import("react-native").ActivityIndicatorProps | undefined;
    customLoader?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
    invertColors?: boolean | undefined;
    inaccessible?: boolean | undefined;
    useSafeArea?: boolean | undefined;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    containerStyle?: import("react-native").StyleProp<import("react-native").TextStyle | import("react-native").ViewStyle>;
    preset?: "default" | "prominent" | SearchInputPresets | undefined;
} & React.RefAttributes<any>>;
interface StaticMembers {
    presets: typeof SearchInputPresets;
}
export { SearchInput, SearchInputProps, SearchInputRef, SearchInputPresets };
declare const _default: React.ForwardRefExoticComponent<import("react-native").TextInputProps & {
    onClear?: (() => void) | undefined;
    onDismiss?: (() => void) | undefined;
    cancelButtonProps?: import("../button").ButtonProps | undefined;
    customRightElement?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
    showLoader?: boolean | undefined;
    loaderProps?: import("react-native").ActivityIndicatorProps | undefined;
    customLoader?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
    invertColors?: boolean | undefined;
    inaccessible?: boolean | undefined;
    useSafeArea?: boolean | undefined;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    containerStyle?: import("react-native").StyleProp<import("react-native").TextStyle | import("react-native").ViewStyle>;
    preset?: "default" | "prominent" | SearchInputPresets | undefined;
} & React.RefAttributes<any>> & StaticMembers;
export default _default;
