import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TabControllerItemProps } from './TabBarItem';
export interface TabControllerBarProps {
    /**
     * The list of tab bar items
     */
    items?: TabControllerItemProps[];
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
     * custom label style
     */
    labelStyle?: TabControllerItemProps['labelStyle'];
    /**
     * custom selected label style
     */
    selectedLabelStyle?: TabControllerItemProps['selectedLabelStyle'];
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
     * Whether the tabBar should be spread (default: true)
     */
    spreadItems?: boolean;
    /**
     * The indicator insets (default: Spacings.s4, set to 0 to make it wide as the item)
     */
    indicatorInsets?: number;
    /**
     * Additional styles for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Used as a testing identifier
     */
    testID?: string;
}
declare const _default: React.ComponentClass<TabControllerBarProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
