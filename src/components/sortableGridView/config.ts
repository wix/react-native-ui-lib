import Animated, {Easing} from 'react-native-reanimated';
// import Spacings from '../../style/spacings';
import Constants from '../../commons/Constants';
export const WINDOW_WIDTH = Constants.windowWidth;
// export const DEFAULT_MARGIN = Spacings.s2;
export const DEFAULT_NO_OF_COLUMNS = 3;
export const getItemSize = (numOfColumns: number, viewWidth: number) => viewWidth / numOfColumns;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};

export type ItemsLayouts = ({x: number; y: number} | undefined)[];
export type ItemsOrder = number[];

export const useSortableGridConfig = (itemsLayouts: Animated.SharedValue<ItemsLayouts>,
  itemSize: number,
  numOfColumns: number) => {
  return {
    updateItemLayout: (index: number, layout: {x: number; y: number}) => {
      'worklet';
      itemsLayouts.value[index] = layout;

      if (itemsLayouts.value.findIndex(item => item === undefined) === -1) {
        itemsLayouts.value = [...itemsLayouts.value];
      }
    },
    getPositionByOrder: (newOrder: number, oldOrder: number) => {
      'worklet';
      const oldPosition = itemsLayouts.value[oldOrder]!;
      const newPosition = itemsLayouts.value[newOrder]!;

      return {
        x: newPosition.x - oldPosition.x,
        y: newPosition.y - oldPosition.y
      };

      // return {
      //   x: (order % numOfColumns) * itemSize,
      //   y: Math.floor(order / numOfColumns) * itemSize
      // };
    },
    // getPositionByOrder: (order: number) => {
    //   'worklet';
    //   return {
    //     x: (order % numOfColumns) * itemSize,
    //     y: Math.floor(order / numOfColumns) * itemSize
    //   };
    // },
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
