import {Platform, Dimensions, NativeModules, I18nManager} from 'react-native';

const {StatusBarManager} = NativeModules;
const {height, width} = Dimensions.get('window');

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const screenWidth = width;
export const screenHeight = height;
// export const isSmallScreen = isIOS ? screenWidth <= 320 : screenWidth <= 360;
export const isSmallScreen = screenWidth <= 340;
export const isShortScreen = screenHeight <= 600;
export let statusBarHeight = isIOS ? 20 : StatusBarManager.HEIGHT; // eslint-disable-line
export const isIphoneX = isIOS && !Platform.isPad && !Platform.isTVOS && (screenHeight >= 812 || screenWidth >= 812);
export const isRTL = I18nManager.isRTL;

export function getAndroidVersion() {
  return isAndroid ? parseInt(Platform.Version, 10) : undefined;
}

export function getSafeAreaInsets(mode) {
  return (mode === 'landscape') ? 
    {left: 44, right: 44, bottom: 24, top: 0} : 
    {left: 0, right: 0, bottom: 34, top: 44};
}

// override guesstimate height with the actual height from StatusBarManager
if (isIOS) {
  StatusBarManager.getHeight(data => (statusBarHeight = data.height));
}
