import React from 'react';
import { TextProps, StyleProp, ViewStyle } from 'react-native';
import { TabControllerItemProps } from './TabBarItem';
export interface TabControllerBarProps {
    /**
     * The list of tab bar items
     */
    items?: TabControllerItemProps[];
    /**
     * Whether the tabBar should be spread (default: true)
     */
    spreadItems?: boolean;
    /**
     * Tab Bar height
     */
    height?: number;
    /**
     * Show Tab Bar bottom shadow
     */
    enableShadow?: boolean;
    /**
     * custom shadow style
     */
    shadowStyle?: StyleProp<ViewStyle>;
    /**
     * custom style for the selected indicator
     */
    indicatorStyle?: StyleProp<ViewStyle>;
    /**
     * Whether the indicator should be wide (as the item)
     */
    wideIndicator?: boolean;
    /**
     * custom label style
     */
    labelStyle?: TextProps;
    /**
     * custom selected label style
     */
    selectedLabelStyle?: TextProps;
    /**
     * the default label color
     */
    labelColor?: string;
    /**
     * the selected label color
     */
    selectedLabelColor?: string;
    /**
     * whether to change the text to uppercase
     */
    uppercase?: boolean;
    /**
     * icon tint color
     */
    iconColor?: string;
    /**
     * icon selected tint color
     */
    selectedIconColor?: string;
    /**
     * TODO: rename to feedbackColor
     * Apply background color on press for TouchableOpacity
     */
    activeBackgroundColor?: string;
    /**
     * The TabBar background Color
     */
    backgroundColor?: string;
    /**
     * The TabBar container width
     */
    containerWidth?: number;
    /**
     * Pass to center selected item
     */
    centerSelected?: boolean;
    /**
     * Additional styles for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Additional styles for the ScrollView
     */
    scrollViewStyle?: StyleProp<ViewStyle>;
    /**
     * Used as a testing identifier
     */
    testID?: string;
}
declare const _default: React.ComponentClass<TabControllerBarProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
