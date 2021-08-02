import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import KeyboardTrackingView from './KeyboardTrackingView';

/**
 * @description: Used to add an inset when a keyboard is used and might hide part of the screen.
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextFieldScreen/InputsScreen.js
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

KeyboardAwareInsetsView.displayName = 'KeyboardAwareInsetsView';
KeyboardAwareInsetsView.propTypes = KeyboardTrackingView.propTypes;

export default KeyboardAwareInsetsView;
