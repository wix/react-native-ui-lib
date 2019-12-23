import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import KeyboardTrackingView from './KeyboardTrackingView';

/**
 * @description: A UI component that enables “keyboard tracking" for this view and it's sub-views.
 * Would typically be used when you have a TextField or TextInput inside this view.
 *
 * @example: https://github.com/wix-private/wix-react-native-ui-lib/blob/master/example/screens/nativeComponentScreens/KeyboardTrackingViewScreen.js
 * @notes: This view is useful only for iOS.
 */
const KeyboardAwareInsetsView = props => (
  <KeyboardTrackingView {...props} pointerEvents={'none'} style={styles.insetsView} scrollToFocusedInput/>
);

const ScreenSize = Dimensions.get('window');
const styles = StyleSheet.create({
  insetsView: {
    width: ScreenSize.width,
    height: 0.5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent'
  }
});

KeyboardTrackingView.propTypes = {
  /**
   * Enables tracking of the keyboard when it's dismissed interactively (false by default).
   * Why? When using an external keyboard (BT),
   * you still get the keyboard events and the view just hovers when you focus the input.
   * Also, if you're not using interactive style of dismissing the keyboard
   * (or if you don't have an input inside this view) it doesn't make sense to track it anyway.
   * (This is caused because of the usage of inputAccessory to be able to track the 
   * keyboard interactive change and it introduces this bug)
   */
  trackInteractive: PropTypes.bool
};

KeyboardTrackingView.displayName = 'KeyboardTrackingView';

export default KeyboardAwareInsetsView;
