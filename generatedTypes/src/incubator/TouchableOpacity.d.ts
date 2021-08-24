import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { ViewProps } from '../components/view';
export declare type TouchableOpacityProps = {
    /**
     * Background color
     */
    backgroundColor?: string;
    /**
     * Background color when actively pressing the touchable
     */
    feedbackColor?: string;
    /**
     * Opacity value when actively pressing the touchable
     */
    activeOpacity?: number;
    /**
     * Scale value when actively pressing the touchable
     */
    activeScale?: number;
    /**
     * Callback for when tapping the touchable
     */
    onPress?: (props: any) => void;
    /**
     * Callback for when long pressing the touchable
     */
    onLongPress?: (props: any) => void;
    /**
     * Pass controlled pressState to track gesture state changes
     */
    pressState?: State;
    /**
     * If true, disable all interactions for this component.
     */
    disabled?: boolean;
    /**
     * Pass custom style
     */
    style?: ViewProps['style'];
    onLayout?: (event: LayoutChangeEvent) => void;
    testID?: string;
};
declare const _default: React.ComponentClass<TouchableOpacityProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
