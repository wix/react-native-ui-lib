import { Easing } from 'react-native-reanimated';
export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};
const usePresenter = () => {
  return {
    getTranslationByIndexChange: (newIndex, oldIndex, itemSize) => {
      'worklet';

      if (newIndex === undefined) {
        return 0;
      }
      return (newIndex - oldIndex) * itemSize;
    },
    getIndexByPosition: (position, itemSize) => {
      'worklet';

      return Math.round(position / itemSize);
    },
    getItemIndexById: (itemsOrder, itemId) => {
      'worklet';

      return itemsOrder.indexOf(itemId);
    },
    getIdByItemIndex: (itemsOrder, orderIndex) => {
      'worklet';

      return itemsOrder[orderIndex];
    }
  };
};
export default usePresenter;