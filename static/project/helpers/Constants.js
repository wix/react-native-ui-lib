import {Platform, Dimensions, NativeModules} from 'react-native';

const { StatusBarManager } = NativeModules;
const {height, width} = Dimensions.get('window');

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const screenWidth = width;
export const screenHeight = height;
export const isSmallScreen = isIOS ? (screenWidth <= 320) : (screenWidth <= 360);
export const isShortScreen = screenHeight <= 600;
export const statusBarHeight = isIOS ? 20 : StatusBarManager.HEIGHT;
