import {Platform, Dimensions, NativeModules, I18nManager, AccessibilityInfo} from 'react-native';

const dimensionsScope = {
  WINDOW: 'window',
  SCREEN: 'screen'
};

const constants = {};

constants.orientations = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape'
};

/* Platform */
constants.isAndroid = Platform.OS === 'android';
constants.isIOS = Platform.OS === 'ios';

constants.getAndroidVersion = () => {
  return constants.isAndroid ? parseInt(Platform.Version, 10) : undefined;
};

/* Navigation */
function setStatusBarHeight() {
  const {StatusBarManager} = NativeModules;
  constants.statusBarHeight = 0; // so there will be a value for any case
  constants.statusBarHeight = constants.isIOS ? 20 : StatusBarManager.HEIGHT;
  if (constants.isIOS) {
    // override guesstimate height with the actual height from StatusBarManager
    StatusBarManager.getHeight(data => (constants.statusBarHeight = data.height));
  }
}

setStatusBarHeight();

/* Layout */
const {height: screenHeight, width: screenWidth} = Dimensions.get(dimensionsScope.SCREEN);
const {height: windowHeight, width: windowWidth} = Dimensions.get(dimensionsScope.WINDOW);

constants.isRTL = I18nManager.isRTL;
constants.orientation = getOrientation(screenHeight, screenWidth);
constants.isLandscape = constants.orientation === constants.orientations.LANDSCAPE;

constants.screenWidth = screenWidth;
constants.screenHeight = screenHeight;

constants.windowWidth = windowWidth;
constants.windowHeight = windowHeight;

constants.isSmallScreen = constants.screenWidth <= 340;
constants.isShortScreen = constants.screenHeight <= 600;
constants.screenAspectRatio =
  constants.screenWidth < constants.screenHeight
    ? constants.screenHeight / constants.screenWidth
    : constants.screenWidth / constants.screenHeight;
constants.isTablet =
  Platform.isPad ||
  (constants.screenAspectRatio < 1.6 && Math.max(constants.screenWidth, constants.screenHeight) >= 900);

constants.getSafeAreaInsets = () => {
  return constants.orientation === constants.orientations.LANDSCAPE
    ? {left: 44, right: 44, bottom: 24, top: 0}
    : {left: 0, right: 0, bottom: 34, top: 44};
};

/* Devices */
constants.isIphoneX =
  constants.isIOS &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (constants.screenHeight >= 812 || constants.screenWidth >= 812);

/* Orientation */
function getOrientation(height, width) {
  return width < height ? constants.orientations.PORTRAIT : constants.orientations.LANDSCAPE;
}

function updateConstants(dimensions) {
  const {height: screenHeight, width: screenWidth} = dimensions.screen;
  const {height: windowHeight, width: windowWidth} = dimensions.window;
  constants.orientation = getOrientation(screenHeight, screenWidth);
  constants.isLandscape = constants.orientation === constants.orientations.LANDSCAPE;
  constants.screenWidth = screenWidth;
  constants.screenHeight = screenHeight;
  constants.windowWidth = windowWidth;
  constants.windowHeight = windowHeight;
  constants.isSmallScreen = constants.screenWidth <= 340;
  constants.isShortScreen = constants.screenHeight <= 600;

  setStatusBarHeight();
}

Dimensions.addEventListener('change', updateConstants);

constants.addDimensionsEventListener = (callback) => {
  Dimensions.addEventListener('change', callback);
};

constants.removeDimensionsEventListener = (callback) => {
  Dimensions.removeEventListener('change', callback);
};

// Accessibility
constants.accessibility = {};
function handleScreenReaderChanged(isScreenReaderEnabled) {
  constants.accessibility.isScreenReaderEnabled = isScreenReaderEnabled;
}
AccessibilityInfo.addEventListener('screenReaderChanged', handleScreenReaderChanged);
function setAccessibility() {
  AccessibilityInfo.fetch().then(isScreenReaderEnabled => {
    constants.accessibility.isScreenReaderEnabled = isScreenReaderEnabled;
  });
}

setAccessibility();

export default constants;
