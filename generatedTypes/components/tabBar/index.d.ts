import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ScrollBarProps } from '../scrollBar';
import TabBarItem, { TabBarItemProps } from './TabBarItem';
interface Props extends ScrollBarProps, TabBarItemProps {
    /**
     * Show Tab Bar bottom shadow
     */
    enableShadow?: boolean;
    /**
     * The minimum number of tabs to render in scroll mode
     */
    minTabsForScroll?: number;
    /**
     * current selected tab index
     */
    selectedIndex?: number;
    /**
     * callback for when index has change (will not be called on ignored items)
     */
    onChangeIndex?: (index: number) => void;
    /**
     * callback for when tab selected
     */
    onTabSelected?: (index: number) => void;
    /**
     * custom style for the selected indicator
     */
    indicatorStyle?: StyleProp<ViewStyle>;
    /**
     * Tab Bar height
     */
    height?: number;
    /**
     * Pass when container width is different than the screen width
     */
    containerWidth?: number;
    /**
     * The background color
     */
    backgroundColor?: string;
    /**
     * set darkTheme style
     */
    darkTheme?: boolean;
    children?: React.ReactNode;
    style?: ViewStyle;
    testID?: string;
}
export declare type TabBarProps = Props;
declare const _default: React.ComponentClass<Props & {
    useCustomTheme?: boolean | undefined;
}, any> & {
    Item: typeof TabBarItem;
};
export default _default;
