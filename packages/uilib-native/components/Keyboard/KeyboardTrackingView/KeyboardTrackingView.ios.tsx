import React, {PureComponent} from 'react';
import ReactNative, {NativeModules} from 'react-native';
// Import the Codegen specification for New Architecture
import KeyboardTrackingViewNativeComponent from '../../../specs/KeyboardTrackingViewNativeComponent';
import {KeyboardTrackingViewProps} from './index';

const KeyboardTrackingViewTempManager = NativeModules.KeyboardTrackingViewTempManager;

/**
 * @description: A UI component that enables "keyboard tracking" for this view and it's sub-views.
 * Would typically be used when you have a TextField or TextInput inside this view.
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/KeyboardTrackingViewScreen.js
 * @notes: This view is useful only for iOS.
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/KeyboardTrackingView/KeyboardTrackingView.gif?raw=true
 */
class KeyboardTrackingView extends PureComponent<KeyboardTrackingViewProps> {
  static displayName = 'KeyboardTrackingView';

  static defaultProps = {
    useSafeArea: false
  };

  ref?: any;

  render() {
    return (
      <KeyboardTrackingViewNativeComponent
        {...this.props}
        ref={r => {
          this.ref = r;
        }}
      />
    );
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
