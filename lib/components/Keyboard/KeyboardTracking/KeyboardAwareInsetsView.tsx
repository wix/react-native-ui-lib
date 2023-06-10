import React from 'react';
import {StyleSheet} from 'react-native';
import KeyboardTrackingView, {KeyboardTrackingViewProps} from './KeyboardTrackingView';
import { getWindowWidth } from 'src/commons/dimensions';

/**
 * @description: Used to add an inset when a keyboard is used and might hide part of the screen.
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextFieldScreen/InputsScreen.js
 * @notes: This view is useful only for iOS.
 */
const KeyboardAwareInsetsView = (props: KeyboardTrackingViewProps) => (
  <KeyboardTrackingView {...props} pointerEvents={'none'} style={styles.insetsView} scrollToFocusedInput/>
);

const width = getWindowWidth();
const styles = StyleSheet.create({
  insetsView: {
    width,
    height: 0.5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent'
  }
});

KeyboardAwareInsetsView.displayName = 'KeyboardAwareInsetsView';

export default KeyboardAwareInsetsView;
