import {Easing, useSharedValue} from 'react-native-reanimated';
import Constants from '../../commons/Constants';
import {ItemLayout, ItemsOrder} from './types';

export const WINDOW_WIDTH = Constants.windowWidth;
export const DEFAULT_NO_OF_COLUMNS = 3;
export const getItemSize = (numOfColumns: number, viewWidth: number) => viewWidth / numOfColumns;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};

const usePresenter = (numOfColumns: number, itemSpacing: number) => {
  const itemLayout = useSharedValue<ItemLayout>(undefined);
  const itemSize = getItemSize(numOfColumns, Constants.screenWidth);

  return {
    updateItemLayout: (layout: {width: number; height: number}) => {
      'worklet';

      if (itemLayout.value === undefined) {
        itemLayout.value = layout;
      }
    },
    getTranslationByOrderChange: (newOrder: number, oldOrder: number) => {
      'worklet';
      const oldRow = Math.floor(oldOrder / numOfColumns);
      const oldColumn = oldOrder % numOfColumns;

      const newRow = Math.floor(newOrder / numOfColumns);
      const newColumn = newOrder % numOfColumns;

      const translation = {
        x: (newColumn - oldColumn) * ((itemLayout.value?.width ?? 0) + itemSpacing),
        y: (newRow - oldRow) * ((itemLayout.value?.height ?? 0) + itemSpacing)
      };
      return translation;
    },
    getOrderByPosition: (positionX: number, positionY: number) => {
      'worklet';
      const col = Math.round(positionX / itemSize);
      const row = Math.round(positionY / itemSize);
      return row * numOfColumns + col;
    },

    getItemOrderById: (itemsOrder: ItemsOrder, itemId: string) => {
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
