import React from 'react';
import { Animated } from 'react-native';
import { BaseComponentInjectedProps } from '../../commons/new';
import { ViewPropTypes } from '../view';
import { TextPropTypes } from '../text';
import { BadgeProps } from '../badge';
export declare type TabBarItemProps = BaseComponentInjectedProps & ViewPropTypes & {
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
    labelStyle: TextPropTypes['style'];
    /**
     * Badge component props to display next the item label
     */
    badge: BadgeProps;
    /**
     * maximum number of lines the label can break
     */
    maxLines?: number;
    /**
     * custom selected tab label style
     */
    selectedLabelStyle: TextPropTypes['style'];
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
     * ignore of the tab
     */
    ignore?: boolean;
    /**
     * callback for when pressing a tab
     */
    onPress?: (props: any) => void;
    /**
     * whether to change the text to uppercase
     */
    uppercase?: boolean;
    /**
     * Apply background color on press for TouchableOpacity
     */
    activeBackgroundColor?: string;
};
export declare type State = {
    indicatorOpacity?: Animated.Value;
};
declare const _default: React.ComponentClass<TabBarItemProps, any> & State;
export default _default;
