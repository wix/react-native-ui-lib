/**
 * Created by artald on 15/05/2016.
 */

import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import ReactNative, {requireNativeComponent, NativeModules} from 'react-native';

const NativeKeyboardTrackingView = requireNativeComponent('KeyboardTrackingViewTemp', null);
const KeyboardTrackingViewTempManager = NativeModules.KeyboardTrackingViewTempManager;

/**
 * @description: A UI component that enables “keyboard tracking" for this view and it's sub-views.
 * Would typically be used when you have a TextField or TextInput inside this view.
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/KeyboardTrackingViewScreen.js
 * @notes: This view is useful only for iOS.
 */
class KeyboardTrackingView extends PureComponent {
  static displayName = 'KeyboardTrackingView';

  static propTypes = {
    /**
     * Enables tracking of the keyboard when it's dismissed interactively (false by default).
     * Why? When using an external keyboard (BT),
     * you still get the keyboard events and the view just hovers when you focus the input.
     * Also, if you're not using interactive style of dismissing the keyboard
     * (or if you don't have an input inside this view) it doesn't make sense to track it anyway.
     * (This is caused because of the usage of inputAccessory to be able to track the
     * keyboard interactive change and it introduces this bug)
     */
    trackInteractive: PropTypes.bool,
    /**
     * Allow control safe area
     */
    useSafeArea: PropTypes.bool
  };

  /** V6 should be change to default false */
  static defaultProps = {
    useSafeArea: true
  };

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
