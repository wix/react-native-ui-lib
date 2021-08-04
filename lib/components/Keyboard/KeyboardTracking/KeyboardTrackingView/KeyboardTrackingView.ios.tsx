/**
 * Created by artald on 15/05/2016.
 */

import React, {PureComponent} from 'react';
import ReactNative, {requireNativeComponent, NativeModules, ViewStyle} from 'react-native';

const NativeKeyboardTrackingView = requireNativeComponent('KeyboardTrackingViewTemp');
const KeyboardTrackingViewTempManager = NativeModules.KeyboardTrackingViewTempManager;

export type KeyboardTrackingViewProps = {
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

   // Can't figure out what it's supposed to be
   ref?: any;

   children?: React.ReactChild | React.ReactChild[];

   style?: ViewStyle;
}

/**
 * @description: A UI component that enables “keyboard tracking" for this view and it's sub-views.
 * Would typically be used when you have a TextField or TextInput inside this view.
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/KeyboardTrackingViewScreen.js
 * @notes: This view is useful only for iOS.
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/KeyboardTrackingView/KeyboardTrackingView.gif?raw=true
 */
class KeyboardTrackingView extends PureComponent<KeyboardTrackingViewProps> {
  static displayName = 'KeyboardTrackingView';

  /** V6 should be change to default false */
  static defaultProps = {
    useSafeArea: true
  };

  ref?: any;

  render() {
    return <NativeKeyboardTrackingView {...this.props} ref={r => (this.ref = r)}/>;
  }

  async getNativeProps() {
    if (this.ref && KeyboardTrackingViewTempManager && KeyboardTrackingViewTempManager.getNativeProps) {
      return await KeyboardTrackingViewTempManager.getNativeProps(ReactNative.findNodeHandle(this.ref));
    }
    return {};
  }

  scrollToStart() {
    if (this.ref && KeyboardTrackingViewTempManager && KeyboardTrackingViewTempManager.scrollToStart) {
      KeyboardTrackingViewTempManager.scrollToStart(ReactNative.findNodeHandle(this.ref));
    }
  }
}

export default KeyboardTrackingView;
