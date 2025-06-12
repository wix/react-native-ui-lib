import {
  Platform,
  Dimensions,
  NativeModules,
  I18nManager,
  AccessibilityInfo,
  AccessibilityChangeEvent,
  StatusBar,
  PixelRatio
} from 'react-native';

export enum orientations {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape'
}

export interface Breakpoint {
  breakpoint: number;
  pageMargin: number;
}

function breakpointComparator(b1: Breakpoint, b2: Breakpoint) {
  return b1.breakpoint - b2.breakpoint;
}

const isAndroid: boolean = Platform.OS === 'android';
const isIOS: boolean = Platform.OS === 'ios';
const isWeb: boolean = Platform.OS === 'web';
let isTablet: boolean;
let statusBarHeight: number;
let screenHeight: number = Dimensions.get('screen').height;
let screenWidth: number = Dimensions.get('screen').width;
let windowHeight: number = Dimensions.get('window').height;
let windowWidth: number = Dimensions.get('window').width;
let breakpoints: Breakpoint[];
let defaultMargin = 0;

const isSubWindow = windowWidth < screenWidth;
isTablet =
  (Platform.OS === 'ios' && Platform.isPad) || (getAspectRatio() < 1.6 && Math.max(screenWidth, screenHeight) >= 900);

function setStatusBarHeight() {
  const {StatusBarManager} = NativeModules;
  statusBarHeight = (StatusBar.currentHeight ?? StatusBarManager?.HEIGHT) || 0;

  if (isIOS && StatusBarManager) {
    try {
      // override guesstimate height with the actual height from StatusBarManager
      StatusBarManager.getHeight((data:{height:number}) => (statusBarHeight = data.height));
    } catch (error) {
      console.warn('Constants: StatusBarManager.getHeight not available in new architecture, using fallback');
      // Keep the fallback height we already set above
    }
  }
}

function getAspectRatio() {
  return screenWidth < screenHeight ? screenHeight / screenWidth : screenWidth / screenHeight;
}

function getOrientation(height: number, width: number) {
  return width < height ? orientations.PORTRAIT : orientations.LANDSCAPE;
}

export function updateConstants(dimensions: any) {
  screenHeight = dimensions.screen.height;
  screenWidth = dimensions.screen.width;
  windowWidth = dimensions.window.width;
  windowHeight = dimensions.window.height;

  setStatusBarHeight();
}

const accessibility = {
  isScreenReaderEnabled: false
};

function handleScreenReaderChanged(isScreenReaderEnabled: AccessibilityChangeEvent) {
  accessibility.isScreenReaderEnabled = isScreenReaderEnabled as boolean;
}

AccessibilityInfo.addEventListener('screenReaderChanged', handleScreenReaderChanged);

function setAccessibility() {
  AccessibilityInfo.isScreenReaderEnabled().then(isScreenReaderEnabled => {
    accessibility.isScreenReaderEnabled = isScreenReaderEnabled;
  });
}

setAccessibility();

const constants = {
  /* Platform */
  orientations,
  isAndroid,
  isIOS,
  isWeb,
  getAndroidVersion: () => {
    return isAndroid ? parseInt(Platform.Version as string, 10) : undefined;
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
    return (isTablet && !isSubWindow) || this.isLandscape;
  },
  get screenAspectRatio() {
    return getAspectRatio();
  },
  get isTablet() {
    return isTablet;
  },
  set isTablet(value: boolean) {
    isTablet = value;
  },
  setBreakpoints(value: Breakpoint[], options?: {defaultMargin: number}) {
    breakpoints = value.sort(breakpointComparator);
    if (options) {
      defaultMargin = options.defaultMargin;
    }
  },
  getPageMargins(): number {
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
    return orientation === orientations.LANDSCAPE
      ? {left: 44, right: 44, bottom: 24, top: 0}
      : {left: 0, right: 0, bottom: 34, top: 44};
  },
  /* Devices */
  get isIphoneX() {
    return (
      isIOS &&
      //@ts-ignore
      !Platform.isPad &&
      //@ts-ignore
      !Platform.isTVOS &&
      (screenHeight >= 812 || screenWidth >= 812)
    );
  },
  /* Orientation */
  dimensionsEventListener: undefined,
  addDimensionsEventListener: (callback: any) => {
    return Dimensions.addEventListener('change', callback);
  },
  /* Dimensions */
  removeDimensionsEventListener: (callback: any) => {
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
