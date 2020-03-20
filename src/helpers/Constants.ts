import {Platform, Dimensions, NativeModules, I18nManager, AccessibilityInfo} from 'react-native';


const orientations = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape'
};

const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';
let statusBarHeight: number;
let screenHeight = Dimensions.get('screen').height;
let screenWidth = Dimensions.get('screen').width;
let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;

function setStatusBarHeight() {
  const {StatusBarManager} = NativeModules;
  statusBarHeight = 0; // so there will be a value for any case
  statusBarHeight = isIOS ? 20 : StatusBarManager.HEIGHT;
  if (isIOS) {
    // override guesstimate height with the actual height from StatusBarManager
    StatusBarManager.getHeight((data: any) => (statusBarHeight = data.height));
  }
}

function getAspectRatio() {
  return screenWidth < screenHeight
      ? screenHeight / screenWidth
      : screenWidth / screenHeight;
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
function handleScreenReaderChanged(isScreenReaderEnabled: boolean) {
  accessibility.isScreenReaderEnabled = isScreenReaderEnabled;
}
//@ts-ignore
AccessibilityInfo.addEventListener('screenReaderChanged', handleScreenReaderChanged);
function setAccessibility() {
  AccessibilityInfo.fetch().then(isScreenReaderEnabled => {
    accessibility.isScreenReaderEnabled = isScreenReaderEnabled;
  });
}

setAccessibility();

const constants = {
  /* Platform */
  orientations,
  isAndroid,
  isIOS,
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
    return getOrientation(screenHeight, screenWidth);
  },
  get isLandscape() {
    return getOrientation(screenHeight, screenWidth) === orientations.LANDSCAPE;
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
  get isSmallScreen() {
    return screenWidth <= 340
  },
  get isShortScreen() {
    return screenHeight <= 600;
  },
  get screenAspectRatio() {
    return getAspectRatio();
  },
  get isTablet(){
       //@ts-ignore
    return Platform.isPad || (getAspectRatio() < 1.6 && Math.max(screenWidth, screenHeight) >= 900);
  },
  getSafeAreaInsets: () => {
    const orientation = getOrientation(screenHeight, screenWidth)
    return orientation === orientations.LANDSCAPE
      ? {left: 44, right: 44, bottom: 24, top: 0}
      : {left: 0, right: 0, bottom: 34, top: 44};
  },
  /* Devices */
 get isIphoneX(){
   return   isIOS &&
   //@ts-ignore
   !Platform.isPad &&
      //@ts-ignore
   !Platform.isTVOS &&
   (screenHeight >= 812 || screenWidth >= 812);
 },
 /* Orientation */
 addDimensionsEventListener: (callback: any) => {
  Dimensions.addEventListener('change', callback);
},

removeDimensionsEventListener: (callback: any) => {
  Dimensions.removeEventListener('change', callback);
},
// Accessibility
get accessibility() {
  return accessibility;
}
};



setStatusBarHeight();




Dimensions.addEventListener('change', updateConstants);



export default constants;
