/**
 * Created by artald on 15/05/2016.
 */

import React, {PureComponent} from 'react';
import ReactNative, {requireNativeComponent, NativeModules} from 'react-native';

const NativeKeyboardTrackingView = requireNativeComponent('KeyboardTrackingView', null);
const KeyboardTrackingViewManager = NativeModules.KeyboardTrackingViewManager;

class KeyboardTrackingView extends PureComponent {
  render() {
    return <NativeKeyboardTrackingView {...this.props} ref={r => (this.ref = r)}/>;
  }

  async getNativeProps() {
    if (this.ref && KeyboardTrackingViewManager && KeyboardTrackingViewManager.getNativeProps) {
      return await KeyboardTrackingViewManager.getNativeProps(ReactNative.findNodeHandle(this.ref));
    }
    return {};
  }

  scrollToStart() {
    if (this.ref && KeyboardTrackingViewManager && KeyboardTrackingViewManager.scrollToStart) {
      KeyboardTrackingViewManager.scrollToStart(ReactNative.findNodeHandle(this.ref));
    }
  }
}

export default KeyboardTrackingView;
