import {Dimensions} from 'react-native';

export const getScreenWidth = () => Dimensions.get('screen').width;
export const getScreenHeight = () => Dimensions.get('screen').height;

export const getWindowWidth = () => Dimensions.get('window').width;
export const getWindowHeight = () => Dimensions.get('window').height;

export function constantsUpdater(dimensions: any) {
  return dimensions;
}