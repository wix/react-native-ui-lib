import React, { Component } from 'react';
import { LayoutChangeEvent } from 'react-native';
export declare type KeyboardAccessoryViewProps = {
    /**
     * Content to be rendered above the keyboard
     */
    renderContent?: () => React.ReactElement;
    /**
     * A callback for when the height is changed
     */
    onHeightChanged?: (height: number) => void;
    /**
     * iOS only.
     * The reference to the actual text input (or the keyboard may not reset when instructed to, etc.).
     * This is required.
     */
    kbInputRef?: any;
    /**
     * The keyboard ID (the componentID sent to KeyboardRegistry)
     */
    kbComponent?: string;
    /**
     * The props that will be sent to the KeyboardComponent
     */
    kbInitialProps?: any;
    /**
     * Callback that will be called when an item on the keyboard has been pressed.
     */
    onItemSelected?: () => void;
    /**
     * Callback that will be called if KeyboardRegistry.requestShowKeyboard is called.
     */
    onRequestShowKeyboard?: () => void;
    /**
     * Callback that will be called once the keyboard has been closed
     */
    onKeyboardResigned?: () => void;
    /**
     * iOS only.
     * The scrolling behavior, use KeyboardAccessoryView.iosScrollBehaviors.X where X is:
     * NONE, SCROLL_TO_BOTTOM_INVERTED_ONLY or FIXED_OFFSET
     *
     * default: FIXED_OFFSET
     */
    iOSScrollBehavior?: number;
    /**
     * iOS only.
     * Show the keyboard on a negative scroll
     *
     * default: false
     */
    revealKeyboardInteractive?: boolean;
    /**
     * iOS only.
     * Set to false to turn off inset management and manage it yourself
     *
     * default: true
     */
    manageScrollView?: boolean;
    /**
     * iOS only.
     * Set to true manageScrollView is set to true and still does not work,
     * it means that the ScrollView found is the wrong one and you'll have
     * to have the KeyboardAccessoryView and the ScrollView as siblings
     * and set this to true
     *
     * default: false
     */
    requiresSameParentToManageScrollView?: boolean;
    /**
     * iOS only.
     * Add a (white) SafeArea view beneath the KeyboardAccessoryView
     *
     * default: false
     */
    addBottomView?: boolean;
    /**
     * iOS only.
     * Allow hitting sub-views that are placed beyond the view bounds
     *
     * default: false
     */
    allowHitsOutsideBounds?: boolean;
    /**
     * iOS only.
     * Whether or not to handle SafeArea
     * default: true
     */
    useSafeArea?: boolean;
    children?: React.ReactChild;
};
/**
 * @description: View that allows replacing the default keyboard with other components
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/keyboardInput/KeyboardInputViewScreen.js
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/KeyboardAccessoryView/KeyboardAccessoryView.gif?raw=true
 */
declare class KeyboardAccessoryView extends Component<KeyboardAccessoryViewProps> {
    static iosScrollBehaviors: {
        NONE: any;
        SCROLL_TO_BOTTOM_INVERTED_ONLY: any;
        FIXED_OFFSET: any;
    } | {
        NONE?: undefined;
        SCROLL_TO_BOTTOM_INVERTED_ONLY?: undefined;
        FIXED_OFFSET?: undefined;
    };
    static defaultProps: {
        iOSScrollBehavior: number;
        revealKeyboardInteractive: boolean;
        manageScrollView: boolean;
        requiresSameParentToManageScrollView: boolean;
        addBottomView: boolean;
        allowHitsOutsideBounds: boolean;
    };
    customInputControllerEventsSubscriber: any;
    trackingViewRef: any;
    constructor(props: KeyboardAccessoryViewProps);
    componentWillUnmount(): void;
    onContainerComponentHeightChanged(event: LayoutChangeEvent): void;
    onAndroidBackPressed(): boolean;
    getIOSTrackingScrollBehavior(): number | undefined;
    getNativeProps(): Promise<any>;
    registerForKeyboardResignedEvent(): void;
    registerAndroidBackHandler(): void;
    processInitialProps(): any;
    scrollToStart(): void;
    render(): JSX.Element;
}
export default KeyboardAccessoryView;
