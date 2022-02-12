import React from 'react';
import { ViewStyle, ViewProps } from 'react-native';
export declare type KeyboardTrackingViewProps = ViewProps & {
    /**
       * Enables tracking of the keyboard when it's dismissed interactively (false by default).
       * Why? When using an external keyboard (BT),
       * you still get the keyboard events and the view just hovers when you focus the input.
       * Also, if you're not using interactive style of dismissing the keyboard
       * (or if you don't have an input inside this view) it doesn't make sense to track it anyway.
       * (This is caused because of the usage of inputAccessory to be able to track the
       * keyboard interactive change and it introduces this bug)
       */
    trackInteractive?: boolean;
    /**
     * Allow control safe area
     */
    useSafeArea?: boolean;
    scrollToFocusedInput?: boolean;
    scrollBehavior?: number;
    revealKeyboardInteractive?: boolean;
    manageScrollView?: boolean;
    requiresSameParentToManageScrollView?: boolean;
    addBottomView?: boolean;
    allowHitsOutsideBounds?: boolean;
    ref?: any;
    children?: React.ReactChild | React.ReactChild[];
    style?: ViewStyle;
};
declare const KeyboardTrackingView: React.ForwardRefExoticComponent<Pick<ViewProps & {
    /**
       * Enables tracking of the keyboard when it's dismissed interactively (false by default).
       * Why? When using an external keyboard (BT),
       * you still get the keyboard events and the view just hovers when you focus the input.
       * Also, if you're not using interactive style of dismissing the keyboard
       * (or if you don't have an input inside this view) it doesn't make sense to track it anyway.
       * (This is caused because of the usage of inputAccessory to be able to track the
       * keyboard interactive change and it introduces this bug)
       */
    trackInteractive?: boolean | undefined;
    /**
     * Allow control safe area
     */
    useSafeArea?: boolean | undefined;
    scrollToFocusedInput?: boolean | undefined;
    scrollBehavior?: number | undefined;
    revealKeyboardInteractive?: boolean | undefined;
    manageScrollView?: boolean | undefined;
    requiresSameParentToManageScrollView?: boolean | undefined;
    addBottomView?: boolean | undefined;
    allowHitsOutsideBounds?: boolean | undefined;
    ref?: any;
    children?: React.ReactChild | React.ReactChild[] | undefined;
    style?: ViewStyle | undefined;
}, keyof ViewProps | "useSafeArea" | "trackInteractive" | "scrollToFocusedInput" | "scrollBehavior" | "revealKeyboardInteractive" | "manageScrollView" | "requiresSameParentToManageScrollView" | "addBottomView" | "allowHitsOutsideBounds"> & React.RefAttributes<unknown>>;
export default KeyboardTrackingView;
