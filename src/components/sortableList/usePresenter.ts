import {Easing} from 'react-native-reanimated';

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};

type ItemsOrder = string[];

const usePresenter = () => {
  return {
    getTranslationByIndexChange: (newIndex: number, oldIndex: number, itemHeight: number) => {
      'worklet';
      if (newIndex === undefined) {
        return 0;
      }

      return (newIndex - oldIndex) * itemHeight;
    },
    getIndexByPosition: (positionY: number, itemHeight: number) => {
      'worklet';
      return Math.round(positionY / itemHeight);
    },
    getItemIndexById: (itemsOrder: ItemsOrder, itemId: string) => {
      'worklet';
      return itemsOrder.indexOf(itemId);
    },
    getIdByItemIndex: (itemsOrder: ItemsOrder, orderIndex: number) => {
      'worklet';
      return itemsOrder[orderIndex];
    }
  };
};

export default usePresenter;
