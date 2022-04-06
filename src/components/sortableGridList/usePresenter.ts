import _ from 'lodash';
import {Easing, useSharedValue} from 'react-native-reanimated';
import Constants from '../../commons/Constants';

export const WINDOW_WIDTH = Constants.windowWidth;
export const DEFAULT_NO_OF_COLUMNS = 3;
export const getItemSize = (numOfColumns: number, viewWidth: number) => viewWidth / numOfColumns;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};

export type ItemsLayouts = ({width: number; height: number} | undefined)[];
export type ItemsOrder = number[];

const usePresenter = (itemsCount: number, numOfColumns: number, itemSpacing: number) => {

  const itemsLayouts = useSharedValue<ItemsLayouts>(_.times(itemsCount, () => undefined));
  const itemSize = getItemSize(numOfColumns, Constants.screenWidth);

  return {
    updateItemLayout: (index: number, layout: {width: number;height: number}) => {
      'worklet';
      itemsLayouts.value[index] = layout;

      if (itemsLayouts.value.findIndex(item => item === undefined) === -1) {
        itemsLayouts.value = [...itemsLayouts.value];
      }
    },
    getTranslationByOrderChange: (newOrder: number, oldOrder: number) => {
      'worklet';
      const oldRow = Math.floor(oldOrder / numOfColumns);
      const oldColumn = oldOrder % numOfColumns;
      
      const newRow = Math.floor(newOrder / numOfColumns);
      const newColumn = newOrder % numOfColumns;

      const translation = {
        x: (newColumn - oldColumn) * ((itemsLayouts.value[0]?.width ?? 0) + itemSpacing),
        y: (newRow - oldRow) * ((itemsLayouts.value[0]?.height ?? 0) + itemSpacing)
      };
      return translation;
    },
    getOrderByPosition: (positionX: number, positionY: number) => {
      'worklet';
      const col = Math.round(positionX / itemSize);
      const row = Math.round(positionY / itemSize);
      return row * numOfColumns + col;
    },

    getItemOrderById: (itemsOrder: ItemsOrder, itemId: number) => {
      'worklet';
      return itemsOrder.indexOf(itemId);
    },
    getIdByItemOrder: (itemsOrder: ItemsOrder, orderIndex: number) => {
      'worklet';
      return itemsOrder[orderIndex];
    }
  };
};

export default usePresenter;
