import React, { Component } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { KeyboardTrackingViewProps } from '../KeyboardTracking/KeyboardTrackingView';
type kbTrackingViewProps = Pick<KeyboardTrackingViewProps, 'scrollBehavior' | 'revealKeyboardInteractive' | 'manageScrollView' | 'requiresSameParentToManageScrollView' | 'allowHitsOutsideBounds' | 'addBottomView' | 'bottomViewColor' | 'useSafeArea' | 'usesBottomTabs'>;
export type KeyboardAccessoryViewProps = kbTrackingViewProps & {
    /**
     * Content to be rendered above the keyboard
     */
    renderContent?: () => React.ReactElement;
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
     * A callback for when the height is changed
     */
    onHeightChanged?: (height: number) => void;
    /**
     * Callback that will be called when an item on the keyboard has been pressed.
     */
    onItemSelected?: (component?: string, args?: any) => void;
    /**
     * Callback that will be called if KeyboardRegistry.requestShowKeyboard is called.
     */
    onRequestShowKeyboard?: () => void;
    /**
     * Callback that will be called once the keyboard has been closed
     */
    onKeyboardResigned?: () => void;
    children?: React.ReactChild;
};
/**
 * @description: View that allows replacing the default keyboard with other components
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/keyboardAccessory/KeyboardAccessoryViewScreen.js
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/KeyboardAccessoryView/KeyboardAccessoryView.gif?raw=true
 */
declare class KeyboardAccessoryView extends Component<KeyboardAccessoryViewProps> {
    static scrollBehaviors: {
        NONE: any;
        SCROLL_TO_BOTTOM_INVERTED_ONLY: any;
        FIXED_OFFSET: any;
    };
    static defaultProps: {
        revealKeyboardInteractive: boolean;
        manageScrollView: boolean;
        requiresSameParentToManageScrollView: boolean;
        addBottomView: boolean;
        allowHitsOutsideBounds: boolean;
        scrollBehavior: any;
    };
    customInputControllerEventsSubscriber: any;
    trackingViewRef: any;
    constructor(props: KeyboardAccessoryViewProps);
    componentWillUnmount(): void;
    onContainerComponentHeightChanged(event: LayoutChangeEvent): void;
    onAndroidBackPressed(): boolean;
    getNativeProps(): Promise<any>;
    registerForKeyboardResignedEvent(): void;
    registerAndroidBackHandler(): void;
    processInitialProps(): any;
    scrollToStart(): void;
    render(): React.JSX.Element;
}
export default KeyboardAccessoryView;
