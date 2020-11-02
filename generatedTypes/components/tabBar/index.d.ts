import React from 'react';
import { Animated, ViewStyle } from 'react-native';
import { BaseComponentInjectedProps } from '../../commons/new';
import { ViewPropTypes } from '../view';
import TabBarItem from './TabBarItem';
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
     * The background color
     */
    backgroundColor: string;
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
     * The background color
     */
    backgroundColor: string;
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
    Item: typeof TabBarItem;
};
export default _default;
