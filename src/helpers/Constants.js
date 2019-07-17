import _ from 'lodash';
import {Platform, Dimensions, NativeModules, I18nManager} from 'react-native';


const dimensionsScope = {
  WINDOW: 'window',
  SCREEN: 'screen'
}
const orientations = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape'
}

/* Platform */
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export function getAndroidVersion() {
  return isAndroid ? parseInt(Platform.Version, 10) : undefined;
}

/* Devices */
export const isIphoneX = isIOS && !Platform.isPad && !Platform.isTVOS && (screenHeight >= 812 || screenWidth >= 812);

/* Navigation */
const {StatusBarManager} = NativeModules;
export let statusBarHeight = setStatusBarHeight();

function setStatusBarHeight() {
  statusBarHeight = isIOS ? 20 : StatusBarManager.HEIGHT; // eslint-disable-line
  if (isIOS) {
    // override guesstimate height with the actual height from StatusBarManager
    StatusBarManager.getHeight(data => (statusBarHeight = data.height));
  }
}

/* Layout */
export const isRTL = I18nManager.isRTL;

export function getSafeAreaInsets() {
  const orientation = getOrientation();
  return (orientation === orientation.LANDSCAPE) ? 
    {left: 44, right: 44, bottom: 24, top: 0} : 
    {left: 0, right: 0, bottom: 34, top: 44};
}

/* Dimensions */
const {height, width} = Dimensions.get(dimensionsScope.WINDOW);
export let screenWidth = width;
export let screenHeight = height;
export let isSmallScreen = screenWidth <= 340;
export let isShortScreen = screenHeight <= 600;

function updateConstants() {
  const {height, width} = Dimensions.get(dimensionsScope.WINDOW);
  screenWidth = width;
  screenHeight = height;
  isSmallScreen = screenWidth <= 340;
  isShortScreen = screenHeight <= 600;
  setStatusBarHeight();
}

/* Orientation */
Dimensions.addEventListener('change', () => {
  updateConstants();
});

export function getOrientation() {
  const {height, width} = Dimensions.get(dimensionsScope.WINDOW);
  return width < height ? orientations.PORTRAIT : orientations.LANDSCAPE;
}

export function addDimensionsEventListener(callback) {
  Dimensions.addEventListener('change', callback);
}

export function removeDimensionsEventListener(callback) {
  Dimensions.removeEventListener('change', callback);
}
