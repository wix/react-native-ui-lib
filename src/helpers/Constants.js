import {Platform, Dimensions, NativeModules} from 'react-native';

const { StatusBarManager } = NativeModules;
const {height, width} = Dimensions.get('window');

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const screenWidth = width;
export const screenHeight = height;
export const isSmallScreen = (screenWidth <= 320);
export const statusBarHeight = isIOS ? 20 : StatusBarManager.HEIGHT;
