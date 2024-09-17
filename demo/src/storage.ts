import {MMKV} from 'react-native-mmkv';
const Storage = new MMKV();

export const DEFAULT_SCREEN = 'uilib.defaultScreen';
export const IS_RTL = 'uilib.isRTL';
export const RECENT_SCREENS = 'uilib.recentScreens';
export const AUTO_SET_DEFAULT = 'uilib.autoSetDefaultScreen';


export default Storage;
