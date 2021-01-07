import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { PureBaseComponent } from '../../commons';
/**
 * @description: Progress bar
 * @example:https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ProgressBarScreen.js
 */
export interface Props {
    /**
     * The progress of the bar from 0 to 100
     */
    progress?: number;
    /**
     *  FullWidth Ui preset
     */
    fullWidth?: boolean;
    /**
     * Override container style
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Progress color
     */
    progressColor?: string;
    /**
     * Custom element to render on top of the animated progress
     */
    customElement?: JSX.Element;
}
interface State {
    containerWidth?: number;
}
export default class ProgressBar extends PureBaseComponent<Props, State> {
    static displayName: string;
    static defaultProps: Partial<Props>;
    progressAnimation: Animated.Value;
    constructor(props: Props);
    componentDidUpdate(prevProps: any): void;
    getContainerWidth: (event: any) => void;
    animateProgress(toValue: any): void;
    getAccessibilityProps(): any;
    getContainerStyle(): {
        height: number;
        borderRadius?: number;
    };
    getProgressStyle(): {
        right: any;
        backgroundColor: any;
        borderRadius: number;
    } | {
        right: any;
        backgroundColor: any;
        borderBottomRightRadius: number;
        borderTopRightRadius: number;
    };
    renderCustomElement(): React.FunctionComponentElement<{
        style: any[];
    }> | undefined;
    render(): JSX.Element;
}
export {};
