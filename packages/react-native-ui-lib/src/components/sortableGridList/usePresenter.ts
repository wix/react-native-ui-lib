import {Easing, useSharedValue} from 'react-native-reanimated';
import Constants from '../../commons/Constants';
import {ItemLayout, ItemsOrder} from './types';

export const WINDOW_WIDTH = Constants.windowWidth;
export const DEFAULT_NO_OF_COLUMNS = 3;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};

const usePresenter = (numOfColumns: number, itemSize: number, itemSpacing: number) => {
  const itemLayout = useSharedValue<ItemLayout>(undefined);

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
        x: (Constants.isRTL ? -1 : 1) * (newColumn - oldColumn) * ((itemLayout.value?.width ?? 0) + itemSpacing),
        y: (newRow - oldRow) * ((itemLayout.value?.height ?? 0) + itemSpacing)
      };
      return translation;
    },
    getOrderByPosition: (positionX: number, positionY: number) => {
      'worklet';
      const width = itemLayout.value?.width || itemSize;
      const height = itemLayout.value?.height || itemSize;
      const col = (Constants.isRTL ? -1 : 1) * Math.round(positionX / width);
      const row = Math.round(positionY / height);
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
