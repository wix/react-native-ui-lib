import _ from 'lodash';
import {Platform, Dimensions, NativeModules, I18nManager} from 'react-native';


const dimensionsScope = {
  WINDOW: 'window',
  SCREEN: 'screen'
}
export const orientations = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape'
}

/* Platform */
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export function getAndroidVersion() {
  return isAndroid ? parseInt(Platform.Version, 10) : undefined;
}

/* Navigation */
const {StatusBarManager} = NativeModules;
export let statusBarHeight = setStatusBarHeight();

function setStatusBarHeight() {
  statusBarHeight = isIOS ? 20 : StatusBarManager.HEIGHT;
  if (isIOS) {
    // override guesstimate height with the actual height from StatusBarManager
    StatusBarManager.getHeight(data => (statusBarHeight = data.height));
  }
}

/* Layout */
export const isRTL = I18nManager.isRTL;

const {height, width} = Dimensions.get(dimensionsScope.WINDOW);
export let orientation = getOrientation(height, width);
export let screenWidth = width;
export let screenHeight = height;
export let isSmallScreen = screenWidth <= 340;
export let isShortScreen = screenHeight <= 600;
export const ratio = screenWidth < screenHeight ? screenHeight / screenWidth : screenWidth / screenHeight;
export const isTablet = Platform.isPad || (ratio < 1.6 && Math.max(screenWidth, screenHeight) >= 900);

export function getSafeAreaInsets() {
  return (orientation === orientation.LANDSCAPE) ? 
    {left: 44, right: 44, bottom: 24, top: 0} : 
    {left: 0, right: 0, bottom: 34, top: 44};
}

/* Devices */
export const isIphoneX = isIOS && !Platform.isPad && !Platform.isTVOS && (screenHeight >= 812 || screenWidth >= 812);

/* Orientation */
function getOrientation(height, width) {
  return width < height ? orientations.PORTRAIT : orientations.LANDSCAPE;
}

function updateConstants() {
  const {height, width} = Dimensions.get(dimensionsScope.WINDOW);
  orientation = getOrientation(height, width);
  screenWidth = width;
  screenHeight = height;
  isSmallScreen = screenWidth <= 340;
  isShortScreen = screenHeight <= 600;

  setStatusBarHeight();
}

Dimensions.addEventListener('change', updateConstants);

export function addDimensionsEventListener(callback) {
  Dimensions.addEventListener('change', callback);
}

export function removeDimensionsEventListener(callback) {
  Dimensions.removeEventListener('change', callback);
}
