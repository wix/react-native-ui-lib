import React, { PureComponent, RefObject } from 'react';
import { Animated, ViewStyle, TextStyle } from 'react-native';
import Swipeable, { SwipeableProps } from './Swipeable';
interface ItemProps {
    width?: number;
    background?: string;
    text?: string;
    icon?: number;
    onPress?: Function;
    keepOpen?: boolean;
    style?: ViewStyle;
    testID?: string;
}
interface Props {
    /**
     * The drawer animation bounciness
     */
    bounciness?: number;
    /**
     * OnDragStart handler
     */
    onDragStart?: Function;
    /**
     * The bottom layer's items to appear when opened from the right
     */
    rightItems?: ItemProps[];
    /**
     * The bottom layer's item to appear when opened from the left (a single item)
     */
    leftItem?: ItemProps;
    /**
     * Set a different minimum width
     */
    itemsMinWidth?: number;
    /**
     * The color for the text and icon tint of the items
     */
    itemsTintColor?: string;
    /**
     * The items' icon size
     */
    itemsIconSize?: number;
    /**
     * The items' text style
     */
    itemsTextStyle?: TextStyle;
    /**
     * Perform the animation in natively
     */
    useNativeAnimations?: boolean;
    /**
     * Whether to allow a full left swipe
     */
    fullSwipeLeft?: boolean;
    /**
     * Threshold for a left full swipe (0-1)
     */
    fullLeftThreshold?: number;
    /**
     * Callback for left item full swipe
     */
    onFullSwipeLeft?: Function;
    /**
     * Callback for left item toggle swipe
     */
    onToggleSwipeLeft?: Function;
    /**
     * Callback for just before left item full swipe
     */
    onWillFullSwipeLeft?: Function;
    /**
     * Whether to allow a full right swipe
     */
    fullSwipeRight?: boolean;
    /**
     * Threshold for a right full swipe (0-1)
     */
    fullRightThreshold?: number;
    /**
     * Callback for right item full swipe
     */
    onFullSwipeRight?: Function;
    /**
     * Callback for just before right item full swipe
     */
    onWillFullSwipeRight?: Function;
    /**
     * Haptic trigger function to use onToggleSwipeLeft
     */
    leftToggleHapticTrigger?: Function;
    /**
     * Style
     */
    style?: ViewStyle;
    /**
     * Callback for open action
     */
    onSwipeableWillOpen?: Function;
    /**
     * Callback for close action
     */
    onSwipeableWillClose?: Function;
    /**
     * Custom value of any type to pass on to the component and receive back in the action callbacks
     */
    customValue?: any;
    /**
     * Used as testing identifier
     */
    testID?: string;
}
export declare type DrawerProps = Props;
export declare type DrawerItemProps = ItemProps;
/**
 * @description: Drawer Component
 * @important: If your app works with RNN, your screen must be wrapped
 * with gestureHandlerRootHOC from 'react-native-gesture-handler'. see
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 */
declare class Drawer extends PureComponent<Props> {
    static displayName: string;
    static defaultProps: {
        itemsTintColor: string;
        itemsIconSize: number;
    };
    leftRender: SwipeableProps['renderLeftActions'];
    rightRender: SwipeableProps['renderLeftActions'];
    _swipeableRow: RefObject<Swipeable>;
    animationOptions: SwipeableProps['animationOptions'];
    leftActionX: Animated.Value;
    constructor(props: DrawerProps);
    private getLeftActionsContainerStyle;
    private getRightActionsContainerStyle;
    private getActionsContainerStyle;
    /** Actions */
    closeDrawer: () => void;
    openLeft: () => void;
    openLeftFull: () => void;
    toggleLeft: () => void;
    openRight: () => void;
    openRightFull: () => void;
    /** Events */
    private onActionPress;
    private onSwipeableWillOpen;
    private onSwipeableWillClose;
    private onToggleSwipeLeft;
    private animateItem;
    /** Accessability */
    private getAccessibilityActions;
    private onAccessibilityAction;
    /** Renders */
    private renderLeftActions;
    private renderRightActions;
    private renderActions;
    private renderAction;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Props & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof Drawer;
export default _default;
