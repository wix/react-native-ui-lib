import React, {forwardRef} from 'react';
import {Platform, NativeModules, ViewStyle, ViewProps} from 'react-native';
import {default as KeyboardTrackingViewIOS} from './KeyboardTrackingView.ios';
import {default as KeyboardTrackingViewAndroid} from './KeyboardTrackingView.android';

const isAndroid = Platform.OS === 'android';
const SCROLL_BEHAVIORS = {
  NONE: NativeModules.KeyboardTrackingViewTempManager?.KeyboardTrackingScrollBehaviorNone,
  SCROLL_TO_BOTTOM_INVERTED_ONLY: 
    NativeModules.KeyboardTrackingViewTempManager?.KeyboardTrackingScrollBehaviorScrollToBottomInvertedOnly,
  FIXED_OFFSET: NativeModules.KeyboardTrackingViewTempManager?.KeyboardTrackingScrollBehaviorFixedOffset
};

export type KeyboardTrackingViewProps = ViewProps & {
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
   * iOS only.
   * Show the keyboard on a negative scroll
   * default: false
   */
  revealKeyboardInteractive?: boolean;
  /**
   * iOS only.
   * Set to false to turn off inset management and manage it yourself
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
   * Allow hitting sub-views that are placed beyond the view bounds
   *
   * default: false
   */
  allowHitsOutsideBounds?: boolean;
  scrollToFocusedInput?: boolean;
  /**
   * iOS only.
   * The scrolling behavior (NONE | SCROLL_TO_BOTTOM_INVERTED_ONLY | FIXED_OFFSET)
   */
  scrollBehavior?: number;
  /**
   * iOS only.
   * Add a SafeArea view beneath the KeyboardAccessoryView
   * default: false
   */
  addBottomView?: boolean;
  /**
   * iOS only.
   * The bottom view's color
   * default: 'white'
   */
  bottomViewColor?: string;
  /**
   * Allow control safe area
   */
  useSafeArea?: boolean;
  /**
   * Whether or not to include bottom tab bar inset
   */
  usesBottomTabs?: boolean;
  ref?: any;
  style?: ViewStyle;
  children?: React.ReactChild | React.ReactChild[];
};

const KeyboardTrackingView = forwardRef(({children, ...others}: KeyboardTrackingViewProps, ref: any) => {
  const KeyboardTrackingViewContainer = isAndroid ? KeyboardTrackingViewAndroid : KeyboardTrackingViewIOS;
  return (
    <KeyboardTrackingViewContainer {...others} ref={ref}>
      {children}
    </KeyboardTrackingViewContainer>
  );
});

export default KeyboardTrackingView as (typeof KeyboardTrackingView & {scrollBehaviors: typeof SCROLL_BEHAVIORS});
// @ts-expect-error
KeyboardTrackingView.scrollBehaviors = SCROLL_BEHAVIORS;
