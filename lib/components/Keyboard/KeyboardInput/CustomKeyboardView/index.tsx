import React from 'react';
import {Platform} from 'react-native';
import {default as CustomKeyboardViewIOS} from './CustomKeyboardView.ios';
import {default as CustomKeyboardViewAndroid} from './CustomKeyboardView.android';

const IsAndroid = Platform.OS === 'android';

const CustomKeyboardView = () => {
  return IsAndroid ? <CustomKeyboardViewAndroid/> : <CustomKeyboardViewIOS/>;
};

export default CustomKeyboardView;
