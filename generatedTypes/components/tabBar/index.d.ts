import React from 'react';
import { Animated, ViewStyle } from 'react-native';
import { BaseComponentInjectedProps } from '../../commons/new';
import { ViewPropTypes } from '../view';
export declare type TabBarProps = BaseComponentInjectedProps & ViewPropTypes & {
    /**
     * Show Tab Bar bottom shadow
     */
    enableShadow?: boolean;
    /**
     * The minimum number of tabs to render
     */
    minTabsForScroll?: number;
    /**
     * current selected tab index
     */
    selectedIndex?: number;
    /**
     * callback for when index has change (will not be called on ignored items)
     */
    onChangeIndex?: (props: any) => void;
    /**
     * callback for when tab selected
     */
    onTabSelected?: (props: any) => void;
    /**
     * custom style for the selected indicator
     */
    indicatorStyle?: ViewStyle;
    /**
     * Tab Bar height
     */
    height?: number;
    children: React.ReactNode;
    style?: ViewStyle;
    testID?: string;
};
export declare type State = {
    gradientOpacity: Animated.Value;
    scrollEnabled?: boolean;
    currentIndex?: number;
};
declare const _default: React.ComponentClass<BaseComponentInjectedProps & ViewPropTypes & {
    /**
     * Show Tab Bar bottom shadow
     */
    enableShadow?: boolean | undefined;
    /**
     * The minimum number of tabs to render
     */
    minTabsForScroll?: number | undefined;
    /**
     * current selected tab index
     */
    selectedIndex?: number | undefined;
    /**
     * callback for when index has change (will not be called on ignored items)
     */
    onChangeIndex?: ((props: any) => void) | undefined;
    /**
     * callback for when tab selected
     */
    onTabSelected?: ((props: any) => void) | undefined;
    /**
     * custom style for the selected indicator
     */
    indicatorStyle?: ViewStyle | undefined;
    /**
     * Tab Bar height
     */
    height?: number | undefined;
    children: React.ReactNode;
    style?: ViewStyle | undefined;
    testID?: string | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any> & {
    Item: React.ComponentClass<BaseComponentInjectedProps & {
        icon?: number | undefined;
        iconColor?: string | undefined;
        iconSelectedColor?: string | undefined;
        label?: string | undefined;
        labelStyle?: import("react-native").TextStyle | undefined;
        badge?: any;
        maxLines?: number | undefined;
        selectedLabelStyle: import("react-native").TextStyle;
        selected?: boolean | undefined;
        showDivider?: boolean | undefined;
        width?: number | undefined;
        ignore?: boolean | undefined;
        onPress?: ((props: any) => void) | undefined;
        uppercase?: boolean | undefined;
        activeBackgroundColor?: string | undefined;
        indicatorStyle?: ViewStyle | undefined;
        style?: ViewStyle | undefined;
        testID?: string | undefined;
    } & {
        useCustomTheme?: boolean | undefined;
    }, any> & import("./TabBarItem").State;
};
export default _default;
