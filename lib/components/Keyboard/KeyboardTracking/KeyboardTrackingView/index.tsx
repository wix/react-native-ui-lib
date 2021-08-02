import React from 'react';
import {Platform} from 'react-native';
import {default as KeyboardTrackingViewIOS} from './KeyboardTrackingView.ios';
import {default as KeyboardTrackingViewAndroid} from './KeyboardTrackingView.android';

const IsAndroid = Platform.OS === 'android';

const KeyboardTrackingView = () => {
  return IsAndroid ? <KeyboardTrackingViewAndroid/> : <KeyboardTrackingViewIOS/>;
};

export default KeyboardTrackingView;
