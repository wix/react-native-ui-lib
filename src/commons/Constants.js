import { Platform, Dimensions, NativeModules, I18nManager, AccessibilityInfo, StatusBar, PixelRatio } from 'react-native';
export let orientations = /*#__PURE__*/function (orientations) {
  orientations["PORTRAIT"] = "portrait";
  orientations["LANDSCAPE"] = "landscape";
  return orientations;
}({});
function breakpointComparator(b1, b2) {
  return b1.breakpoint - b2.breakpoint;
}
const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';
const isWeb = Platform.OS === 'web';
let isTablet;
let statusBarHeight;
let screenHeight = Dimensions.get('screen').height;
let screenWidth = Dimensions.get('screen').width;
let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;
let breakpoints;
let defaultMargin = 0;
const isSubWindow = windowWidth < screenWidth;
isTablet = Platform.OS === 'ios' && Platform.isPad || getAspectRatio() < 1.6 && Math.max(screenWidth, screenHeight) >= 900;
function setStatusBarHeight() {
  const {
    StatusBarManager
  } = NativeModules;
  statusBarHeight = (StatusBar.currentHeight ?? StatusBarManager?.HEIGHT) || 0;
  if (isIOS && StatusBarManager) {
    // override guesstimate height with the actual height from StatusBarManager
    StatusBarManager.getHeight(data => statusBarHeight = data.height);
  }
}
function getAspectRatio() {
  return screenWidth < screenHeight ? screenHeight / screenWidth : screenWidth / screenHeight;
}
function getOrientation(height, width) {
  return width < height ? orientations.PORTRAIT : orientations.LANDSCAPE;
}
export function updateConstants(dimensions) {
  screenHeight = dimensions.screen.height;
  screenWidth = dimensions.screen.width;
  windowWidth = dimensions.window.width;
  windowHeight = dimensions.window.height;
  setStatusBarHeight();
}
const accessibility = {
  isReduceMotionEnabled: false,
  isScreenReaderEnabled: false
};
function handleReduceMotionChanged(isReduceMotionEnabled) {
  accessibility.isReduceMotionEnabled = isReduceMotionEnabled;
}
function handleScreenReaderChanged(isScreenReaderEnabled) {
  accessibility.isScreenReaderEnabled = isScreenReaderEnabled;
}
AccessibilityInfo.addEventListener('reduceMotionChanged', handleReduceMotionChanged);
AccessibilityInfo.addEventListener('screenReaderChanged', handleScreenReaderChanged);
async function setAccessibility() {
  accessibility.isReduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled();
  accessibility.isScreenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();
}
setAccessibility();
const constants = {
  /* Platform */
  orientations,
  isAndroid,
  isIOS,
  isWeb,
  getAndroidVersion: () => {
    return isAndroid ? parseInt(Platform.Version, 10) : undefined;
  },
  /* Navigation */
  get statusBarHeight() {
    return statusBarHeight;
  },
  /* Layout */
  isRTL: I18nManager.isRTL,
  get orientation() {
    return getOrientation(windowHeight, windowWidth);
  },
  get isLandscape() {
    return getOrientation(windowHeight, windowWidth) === orientations.LANDSCAPE;
  },
  get screenWidth() {
    return screenWidth;
  },
  get screenHeight() {
    return screenHeight;
  },
  get windowWidth() {
    return windowWidth;
  },
  get windowHeight() {
    return windowHeight;
  },
  get isSmallWindow() {
    return windowWidth <= 340;
  },
  get isSmallScreen() {
    return screenWidth <= 340;
  },
  get isShortScreen() {
    return screenHeight <= 600;
  },
  get isWideScreen() {
    return isTablet && !isSubWindow || this.isLandscape;
  },
  get screenAspectRatio() {
    return getAspectRatio();
  },
  get isTablet() {
    return isTablet;
  },
  set isTablet(value) {
    isTablet = value;
  },
  setBreakpoints(value, options) {
    breakpoints = value.sort(breakpointComparator);
    if (options) {
      defaultMargin = options.defaultMargin;
    }
  },
  getPageMargins() {
    if (!breakpoints) {
      return 0;
    }
    for (let i = breakpoints.length - 1; i >= 0; --i) {
      if (windowWidth > breakpoints[i].breakpoint) {
        return breakpoints[i].pageMargin;
      }
    }
    return defaultMargin;
  },
  getSafeAreaInsets: () => {
    const orientation = getOrientation(screenHeight, screenWidth);
    return orientation === orientations.LANDSCAPE ? {
      left: 44,
      right: 44,
      bottom: 24,
      top: 0
    } : {
      left: 0,
      right: 0,
      bottom: 34,
      top: 44
    };
  },
  /* Devices */
  get isIphoneX() {
    return isIOS &&
    //@ts-ignore
    !Platform.isPad &&
    //@ts-ignore
    !Platform.isTVOS && (screenHeight >= 812 || screenWidth >= 812);
  },
  /* Orientation */
  dimensionsEventListener: undefined,
  addDimensionsEventListener: callback => {
    return Dimensions.addEventListener('change', callback);
  },
  /* Dimensions */
  removeDimensionsEventListener: callback => {
    if (callback.remove) {
      callback.remove();
    }
  },
  /* Accessibility */
  get accessibility() {
    return accessibility;
  },
  /* Keyboard */
  backspaceKey: 'Backspace',
  enterKey: 'Enter',
  /* Font scale */
  getFontScale: PixelRatio.getFontScale
};
setStatusBarHeight();
Dimensions.addEventListener('change', updateConstants);
export default constants;

// For tests
export const _reset = () => {
  // @ts-ignore
  breakpoints = undefined;
  defaultMargin = 0;
};