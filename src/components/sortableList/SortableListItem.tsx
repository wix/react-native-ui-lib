/* eslint-disable react-hooks/exhaustive-deps */
import {map} from 'lodash';
import React, {PropsWithChildren, useContext} from 'react';
import {
  useSharedValue,
  useAnimatedReaction,
  withTiming,
  Easing,
  runOnJS,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import View from '../view';
import {Shadows, Colors} from '../../style';
import {useDidUpdate} from 'hooks';
import SortableListContext from './SortableListContext';
import usePresenter from './usePresenter';
import {HapticService, HapticType} from '../../services';
import {StyleUtils} from 'utils';
export interface InternalSortableListItemProps {
  index: number;
}

type Props = PropsWithChildren<InternalSortableListItemProps>;

const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};

const SortableListItem = (props: Props) => {
  const {children, index} = props;

  const {
    data,
    itemHeight,
    itemMargins,
    onItemLayout,
    itemsOrder,
    lockedIds,
    onChange,
    enableHaptic,
    scale: propsScale = 1
  } = useContext(SortableListContext);
  const {getTranslationByIndexChange, getItemIndexById, getIndexByPosition, getIdByItemIndex} = usePresenter();
  const id: string = data[index].id;
  const locked: boolean = data[index].locked;
  const initialIndex = useSharedValue<number>(map(data, 'id').indexOf(id));
  const currIndex = useSharedValue(initialIndex.value);
  const translateY = useSharedValue<number>(0);

  const isDragging = useSharedValue(false);

  const draggedItemShadow = useSharedValue(StyleUtils.unpackStyle({
    ...Shadows.sh30.bottom,
    ...Shadows.sh30.top
  }));

  const defaultItemShadow = useSharedValue(StyleUtils.unpackStyle({
    shadowColor: Colors.transparent,
    elevation: 0
  }));

  const tempTranslateY = useSharedValue<number>(0);
  const tempItemsOrder = useSharedValue<string[]>(itemsOrder.value);

  useDidUpdate(() => {
    const newItemIndex = map(data, 'id').indexOf(id);

    initialIndex.value = newItemIndex;
    currIndex.value = newItemIndex;

    translateY.value = 0;
  }, [data]);

  useAnimatedReaction(() => getItemIndexById(itemsOrder.value, id),
    (newIndex, prevIndex) => {
      if (prevIndex === null || newIndex === prevIndex) {
        return;
      }

      currIndex.value = newIndex;
      if (!isDragging.value) {
        const translation = getTranslationByIndexChange(currIndex.value, initialIndex.value, itemHeight.value);

        translateY.value = withTiming(translation, animationConfig);
      }
    },
    []);

  const dragOnLongPressGesture = Gesture.Pan()
    .activateAfterLongPress(250)
    .enabled(!locked)
    .onStart(() => {
      isDragging.value = true;
      translateY.value = getTranslationByIndexChange(currIndex.value, initialIndex.value, itemHeight.value);
      tempTranslateY.value = translateY.value;
      tempItemsOrder.value = itemsOrder.value;
    })
    .onTouchesMove(() => {
      if (enableHaptic && !isDragging.value) {
        runOnJS(HapticService.triggerHaptic)(HapticType.selection, 'SortableList');
      }
    })
    .onUpdate(event => {
      translateY.value = tempTranslateY.value + event.translationY;

      // Swapping items
      let newIndex = getIndexByPosition(translateY.value, itemHeight.value) + initialIndex.value;
      const oldIndex = getItemIndexById(itemsOrder.value, id);

      if (newIndex !== oldIndex) {
        // Sometimes getIndexByPosition will give an index that is off by one because of rounding error (floor\ceil does not help)
        if (Math.abs(newIndex - oldIndex) > 1) {
          newIndex = Math.sign(newIndex - oldIndex) + oldIndex;
        }

        let itemIdToSwap = getIdByItemIndex(itemsOrder.value, newIndex);

        // Skip locked item(s)
        while (lockedIds.value[itemIdToSwap]) {
          const skipDirection = Math.sign(newIndex - oldIndex);
          newIndex = skipDirection + newIndex;
          itemIdToSwap = getIdByItemIndex(itemsOrder.value, newIndex);
        }

        // Swap items
        if (itemIdToSwap !== undefined) {
          const newItemsOrder = [...itemsOrder.value];
          newItemsOrder[newIndex] = id;
          newItemsOrder[oldIndex] = itemIdToSwap;
          itemsOrder.value = newItemsOrder;
        }
      }
    })
    .onEnd(() => {
      const translation = getTranslationByIndexChange(getItemIndexById(itemsOrder.value, id),
        getItemIndexById(tempItemsOrder.value, id),
        itemHeight.value);

      translateY.value = withTiming(tempTranslateY.value + translation, animationConfig, () => {
        if (tempItemsOrder.value.toString() !== itemsOrder.value.toString()) {
          runOnJS(onChange)();
        }
      });
    })
    .onFinalize(() => {
      if (isDragging.value) {
        isDragging.value = false;
      }
    });

  const draggedAnimatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(isDragging.value ? propsScale : 1);
    const zIndex = isDragging.value ? 100 : withTiming(0, animationConfig);
    const opacity = isDragging.value ? 0.95 : 1;
    const shadow = isDragging.value
      ? draggedItemShadow.value
      : defaultItemShadow.value;

    return {
      backgroundColor: Colors.$backgroundDefault, // required for elevation to work in Android
      zIndex,
      transform: [{translateY: translateY.value}, {scale}],
      opacity,
      ...itemMargins,
      ...shadow
    };
  });

  return (
    <GestureDetector gesture={dragOnLongPressGesture}>
      <View reanimated style={draggedAnimatedStyle} onLayout={index === 0 ? onItemLayout : undefined}>
        {children}
      </View>
    </GestureDetector>
  );
};

export default React.memo(SortableListItem);
