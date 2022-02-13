import {Easing} from 'react-native-reanimated';
import {Constants} from 'react-native-ui-lib';
const WINDOW_WIDTH = Constants.windowWidth;
export const MARGIN = 8;
export const getItemSize = (numOfColumns: number) => (WINDOW_WIDTH / numOfColumns); // maybe (- MARGIN)

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};

export const getPositionByOrder = (order: number, numOfColumns: number) => {
  'worklet';
  const size = getItemSize(numOfColumns);
  return {
    x: (order % numOfColumns) * size,
    y: Math.floor(order / numOfColumns) * size
  };
};

export const getOrderByPosition = (positionX: number, positionY: number, numOfColumns: number) => {
  'worklet';
  const size = getItemSize(numOfColumns);
  const col = Math.round(positionX / size);
  const row = Math.round(positionY / size);
  return row * numOfColumns + col;
};
