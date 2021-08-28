import React from 'react';
import { ViewStyle } from 'react-native';
import { ButtonProps } from '../button';
export declare type ActionBarProps = {
    /**
     * action bar height
     */
    height?: number;
    /**
     * action bar background color
     */
    backgroundColor?: string;
    /**
     * actions for the action bar
     */
    actions: ButtonProps[];
    /**
     * should action be equally centered
     */
    centered?: boolean;
    /**
     * use safe area, in case action bar attached to the bottom (default: true)
     */
    useSafeArea?: boolean;
    /**
     * keep the action bar position relative instead of it absolute position
     */
    keepRelative?: boolean;
    /**
     * style the action bar
     */
    style?: ViewStyle;
};
declare const _default: React.ComponentClass<ActionBarProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
