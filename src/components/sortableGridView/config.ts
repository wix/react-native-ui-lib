import {Easing} from 'react-native-reanimated';
import Spacings from '../../style/spacings';
import Constants from '../../commons/Constants';
export const WINDOW_WIDTH = Constants.windowWidth;
export const DEFAULT_MARGIN = Spacings.s2;
export const DEFAULT_NO_OF_COLUMNS = 3;
export const getItemSize = (numOfColumns: number, viewWidth: number) => (viewWidth / numOfColumns);

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};

export type ItemsOrder = {
  [id: string]: number
}

export const useSortableGridConfig = (itemSize: number, numOfColumns: number) => {
  return {
    getPositionByOrder: (order: number) => {
      'worklet';
      return {
        x: (order % numOfColumns) * itemSize,
        y: Math.floor(order / numOfColumns) * itemSize
      };
    },
    getOrderByPosition: (positionX: number, positionY: number) => {
      'worklet';
      const col = Math.round(positionX / itemSize);
      const row = Math.round(positionY / itemSize);
      return row * numOfColumns + col;
    }
  };
};
