import {Platform, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const screenWidth = width;
export const screenHeight = height;
