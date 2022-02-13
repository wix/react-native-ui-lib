import {Easing} from 'react-native-reanimated';
import {Constants} from 'react-native-ui-lib';
const WINDOW_WIDTH = Constants.windowWidth;
export const MARGIN = 8;
export const getItemSize = (numOfColumns: number) => (WINDOW_WIDTH / numOfColumns) - MARGIN;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};
