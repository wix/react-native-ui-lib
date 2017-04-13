Object.defineProperty(exports,"__esModule",{value:true});exports.statusBarHeight=exports.isSmallScreen=exports.screenHeight=exports.screenWidth=exports.isIOS=exports.isAndroid=undefined;var _reactNative=require('react-native');var

StatusBarManager=_reactNative.NativeModules.StatusBarManager;var _Dimensions$get=
_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;

var isAndroid=exports.isAndroid=_reactNative.Platform.OS==='android';
var isIOS=exports.isIOS=_reactNative.Platform.OS==='ios';
var screenWidth=exports.screenWidth=width;
var screenHeight=exports.screenHeight=height;
var isSmallScreen=exports.isSmallScreen=screenWidth===320;
var statusBarHeight=exports.statusBarHeight=isIOS?20:StatusBarManager.HEIGHT;