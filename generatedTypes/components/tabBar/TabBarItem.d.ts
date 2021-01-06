import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { BadgeProps } from '../badge';
export interface TabBarItemProps {
    /**
     * icon of the tab
     */
    icon?: number;
    /**
     * icon tint color
     */
    iconColor?: string;
    /**
     * icon selected tint color
     */
    iconSelectedColor?: string;
    /**
     * label of the tab
     */
    label?: string;
    /**
     * custom label style
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Badge component props to display next the item label
     */
    badge?: BadgeProps;
    badgeProps?: BadgeProps;
    /**
     * maximum number of lines the label can break
     */
    maxLines?: number;
    /**
     * custom selected tab label style
     */
    selectedLabelStyle?: StyleProp<TextStyle>;
    /**
     * whether the tab is selected or not
     */
    selected?: boolean;
    /**
     * whether the tab will have a divider on its right
     */
    showDivider?: boolean;
    /**
     * A fixed width for the item
     */
    width?: number;
    /**
     * tabBar's background color
     */
    backgroundColor?: string;
    /**
     * ignore of the tab
     */
    ignore?: boolean;
    /**
     * callback for when pressing a tab
     */
    onPress?: () => void;
    /**
     * whether to change the text to uppercase
     */
    uppercase?: boolean;
    /**
     * Apply background color on press for TouchableOpacity
     */
    activeBackgroundColor?: string;
    accessibilityLabel?: string;
    indicatorStyle?: StyleProp<ViewStyle>;
    style?: ViewStyle;
    testID?: string;
}
declare const _default: React.ComponentClass<TabBarItemProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
