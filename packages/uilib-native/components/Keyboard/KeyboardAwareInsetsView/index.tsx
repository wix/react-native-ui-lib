import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import KeyboardTrackingView, {KeyboardTrackingViewProps} from '../KeyboardTrackingView';

type Props = KeyboardTrackingViewProps & {
  offset?: number;
}
/**
 * @description: Used to add an inset when a keyboard is used and might hide part of the screen.
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/src/screens/componentScreens/TextFieldScreen/InputsScreen.js
 * @notes: This view is useful only for iOS.
 */
const KeyboardAwareInsetsView = (props: Props) => {
  const {offset = 0.5, ...others} = props;
  return <KeyboardTrackingView {...others} pointerEvents={'none'} style={[styles.insetsView, {height: offset}]} scrollToFocusedInput/>;
};

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

export default KeyboardAwareInsetsView;
