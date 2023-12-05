import {Easing} from 'react-native-reanimated';

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};

type ItemsOrder = string[];

const usePresenter = () => {
  return {
    getTranslationByIndexChange: (newIndex: number, oldIndex: number, itemSize: number) => {
      'worklet';
      if (newIndex === undefined) {
        return 0;
      }

      return (newIndex - oldIndex) * itemSize;
    },
    getIndexByPosition: (position: number, itemSize: number) => {
      'worklet';
      return Math.round(position / itemSize);
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
