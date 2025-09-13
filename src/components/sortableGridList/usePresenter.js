import { Easing, useSharedValue } from 'react-native-reanimated';
import Constants from "../../commons/Constants";
export const WINDOW_WIDTH = Constants.windowWidth;
export const DEFAULT_NO_OF_COLUMNS = 3;
export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};
const usePresenter = (numOfColumns, itemSize, itemSpacing) => {
  const itemLayout = useSharedValue(undefined);
  return {
    updateItemLayout: layout => {
      'worklet';

      if (itemLayout.value === undefined) {
        itemLayout.value = layout;
      }
    },
    getTranslationByOrderChange: (newOrder, oldOrder) => {
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
    getOrderByPosition: (positionX, positionY) => {
      'worklet';

      const width = itemLayout.value?.width || itemSize;
      const height = itemLayout.value?.height || itemSize;
      const col = (Constants.isRTL ? -1 : 1) * Math.round(positionX / width);
      const row = Math.round(positionY / height);
      return row * numOfColumns + col;
    },
    getItemOrderById: (itemsOrder, itemId) => {
      'worklet';

      return itemsOrder.indexOf(itemId);
    },
    getIdByItemOrder: (itemsOrder, orderIndex) => {
      'worklet';

      return itemsOrder[orderIndex];
    }
  };
};
export default usePresenter;