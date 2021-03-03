import { Component } from 'react';
import { Animated } from 'react-native';
declare type Props = {
    children: any;
    friction: number;
    leftThreshold?: number;
    rightThreshold?: number;
    fullLeftThreshold?: number;
    fullSwipeLeft?: boolean;
    fullRightThreshold?: number;
    fullSwipeRight?: boolean;
    overshootLeft?: boolean;
    overshootRight?: boolean;
    overshootFriction?: number;
    onSwipeableLeftOpen?: Function;
    onSwipeableRightOpen?: Function;
    onSwipeableOpen?: Function;
    onSwipeableClose?: Function;
    onSwipeableLeftWillOpen?: Function;
    onSwipeableRightWillOpen?: Function;
    onSwipeableWillOpen?: Function;
    onSwipeableWillClose?: Function;
    onFullSwipeLeft?: Function;
    onToggleSwipeLeft?: Function;
    onWillFullSwipeLeft?: Function;
    onFullSwipeRight?: Function;
    onWillFullSwipeRight?: Function;
    onDragStart?: Function;
    renderLeftActions?: (progressAnimatedValue: any, dragAnimatedValue: any) => any;
    renderRightActions?: (progressAnimatedValue: any, dragAnimatedValue: any) => any;
    leftActionsContainerStyle: any;
    rightActionsContainerStyle: any;
    useNativeAnimations: boolean;
    animationOptions?: Object;
    containerStyle?: Object;
    childrenContainerStyle?: Object;
};
declare type StateType = {
    dragX: Animated.Value;
    rowTranslation: Animated.Value;
    leftWidth: number | typeof undefined;
    rightOffset: number | typeof undefined;
    rowWidth: number | typeof undefined;
};
export declare type SwipeableProps = Props;
export default class Swipeable extends Component<Props, StateType> {
    static displayName: string;
    static defaultProps: {
        friction: number;
        overshootFriction: number;
        useNativeAnimations: boolean;
        fullLeftThreshold: number;
        fullRightThreshold: number;
    };
    constructor(props: Props);
    _handleDrag: (e: any) => void;
    getTransX: () => Animated.AnimatedInterpolation;
    getShowLeftAction: () => Animated.Value | Animated.AnimatedInterpolation;
    getLeftActionTranslate: () => Animated.AnimatedInterpolation;
    getShowRightAction: () => Animated.Value | Animated.AnimatedInterpolation;
    getRightActionTranslate: () => Animated.AnimatedInterpolation;
    _onTapHandlerStateChange: ({ nativeEvent }: {
        nativeEvent: any;
    }) => void;
    _onHandlerStateChange: ({ nativeEvent }: {
        nativeEvent: any;
    }) => void;
    _handleRelease: (nativeEvent: any) => void;
    _animateRow: (fromValue: any, toValue: any, velocityX: any) => void;
    _currentOffset: () => number;
    close: () => void;
    openLeft: () => void;
    openLeftFull: () => void;
    toggleLeft: () => void;
    openRight: () => void;
    openRightFull: () => void;
    _onRowLayout: ({ nativeEvent }: {
        nativeEvent: any;
    }) => void;
    _onLeftLayout: ({ nativeEvent }: {
        nativeEvent: any;
    }) => void;
    _onRightLayout: ({ nativeEvent }: {
        nativeEvent: any;
    }) => void;
    handleMeasure: (name: any, nativeEvent: any) => void;
    render(): JSX.Element;
}
export {};
