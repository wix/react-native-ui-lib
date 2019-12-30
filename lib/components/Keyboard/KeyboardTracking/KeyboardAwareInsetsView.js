import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import KeyboardTrackingView from './KeyboardTrackingView';

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

export default KeyboardAwareInsetsView;
