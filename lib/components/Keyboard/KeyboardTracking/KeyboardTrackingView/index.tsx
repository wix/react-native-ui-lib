import React from 'react';
import {Platform} from 'react-native';
import {default as KeyboardTrackingViewIOS, KeyboardTrackingViewProps} from './KeyboardTrackingView.ios';
import {default as KeyboardTrackingViewAndroid} from './KeyboardTrackingView.android';

const IsAndroid = Platform.OS === 'android';

const KeyboardTrackingView = ({children, ...others}: KeyboardTrackingViewProps) => {
  const KeyboardTrackingViewContainer = IsAndroid ? KeyboardTrackingViewAndroid : KeyboardTrackingViewIOS;
  
  return (
    <KeyboardTrackingViewContainer {...others}>
      {children}
    </KeyboardTrackingViewContainer>
  );
};

export default KeyboardTrackingView;
