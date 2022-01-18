import React, {forwardRef} from 'react';
import {Platform, ViewStyle, ViewProps} from 'react-native';
import {default as KeyboardTrackingViewIOS} from './KeyboardTrackingView.ios';
import {default as KeyboardTrackingViewAndroid} from './KeyboardTrackingView.android';

const isAndroid = Platform.OS === 'android';

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

   // Can't figure out what it's supposed to be
   ref?: any;

   children?: React.ReactChild | React.ReactChild[];

   style?: ViewStyle;
}

const KeyboardTrackingView = forwardRef(({children, ...others}: KeyboardTrackingViewProps, ref: any) => {
  const KeyboardTrackingViewContainer = isAndroid ? KeyboardTrackingViewAndroid : KeyboardTrackingViewIOS;
  
  return (
    <KeyboardTrackingViewContainer {...others} ref={ref}>
      {children}
    </KeyboardTrackingViewContainer>
  );
});

export default KeyboardTrackingView;
