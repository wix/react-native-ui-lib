import type {ViewProps} from 'react-native';
// import {requireNativeComponent, type ViewProps} from 'react-native';
import type {Int32, WithDefault} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  /**
   * Enables tracking of the keyboard when it's dismissed interactively (false by default).
   */
  trackInteractive?: WithDefault<boolean, false>;

  /**
   * iOS only.
   * Show the keyboard on a negative scroll
   */
  revealKeyboardInteractive?: WithDefault<boolean, false>;

  /**
   * iOS only.
   * Set to false to turn off inset management and manage it yourself
   */
  manageScrollView?: WithDefault<boolean, true>;

  /**
   * iOS only.
   * Set to true manageScrollView is set to true and still does not work
   */
  requiresSameParentToManageScrollView?: WithDefault<boolean, false>;

  /**
   * iOS only.
   * Allow hitting sub-views that are placed beyond the view bounds
   */
  allowHitsOutsideBounds?: WithDefault<boolean, false>;

  /**
   * Should the scrollView scroll to the focused input
   */
  scrollToFocusedInput?: WithDefault<boolean, false>;

  /**
   * iOS only.
   * The scrolling behavior (NONE | SCROLL_TO_BOTTOM_INVERTED_ONLY | FIXED_OFFSET)
   */
  scrollBehavior?: WithDefault<Int32, 0>;

  /**
   * iOS only.
   * Add a SafeArea view beneath the KeyboardAccessoryView
   */
  addBottomView?: WithDefault<boolean, false>;

  /**
   * iOS only.
   * The bottom view's color
   */
  bottomViewColor?: string;

  /**
   * Allow control safe area
   */
  useSafeArea?: WithDefault<boolean, false>;

  /**
   * Whether or not to include bottom tab bar inset
   */
  usesBottomTabs?: WithDefault<boolean, false>;
}

export default codegenNativeComponent<NativeProps>('KeyboardTrackingViewTemp');

// const KeyboardTrackingViewNativeComponent = requireNativeComponent<NativeProps>('KeyboardTrackingViewTemp');

// export default KeyboardTrackingViewNativeComponent;
