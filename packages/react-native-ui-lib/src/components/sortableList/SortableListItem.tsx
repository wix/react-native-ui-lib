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

export const DEFAULT_LIST_ITEM_SIZE = 52;

const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};

// Reanimated 3 - Solving the following error:
// ReanimatedError: Trying to access property `$backgroundDefault` of an object which cannot be sent to the UI runtime., js engine: reanimated
const LIST_ITEM_BACKGROUND = Colors.$backgroundDefault;

const SortableListItem = (props: Props) => {
  const {children, index} = props;

  const {
    data,
    itemSize,
    horizontal,
    itemProps,
    onItemLayout,
    itemsOrder,
    lockedIds,
    onChange,
    enableHaptic,
    scale: propsScale = 1
  } = useContext(SortableListContext);
  const {getTranslationByIndexChange, getItemIndexById, getIndexByPosition, getIdByItemIndex} = usePresenter();
  const id: string = data[index].id;
  const locked: boolean = data[index].locked ?? false;
  const initialIndex = useSharedValue<number>(map(data, 'id').indexOf(id));
  const lastSwap = useSharedValue({from: -1, to: -1});
  const currIndex = useSharedValue(initialIndex.value);
  const translation = useSharedValue<number>(0);
  const zIndex = useSharedValue(0);
  const scale = useSharedValue(1);

  const isDragging = useSharedValue(false);

  const draggedItemShadow = useSharedValue(StyleUtils.unpackStyle({
    ...Shadows.sh30.bottom,
    ...Shadows.sh30.top
  }));

  const defaultItemShadow = useSharedValue(StyleUtils.unpackStyle({
    shadowColor: Colors.transparent,
    elevation: 0
  }));

  const tempTranslation = useSharedValue<number>(0);
  const tempItemsOrder = useSharedValue<string[]>(itemsOrder.value);

  useDidUpdate(() => {
    const newItemIndex = map(data, 'id').indexOf(id);

    initialIndex.value = newItemIndex;
    currIndex.value = newItemIndex;

    translation.value = 0;
  }, [data]);

  useAnimatedReaction(() => getItemIndexById(itemsOrder.value, id),
    (newIndex, prevIndex) => {
      if (prevIndex === null || newIndex === prevIndex) {
        return;
      }

      currIndex.value = newIndex;
      if (!isDragging.value) {
        const _translation = getTranslationByIndexChange(currIndex.value, initialIndex.value, itemSize.value);

        translation.value = withTiming(_translation, animationConfig);
      }
    },
    []);

  useAnimatedReaction(() => isDragging.value, (isDragging, wasDragging) => {
    if (isDragging && !wasDragging) {
      zIndex.value = withTiming(100, animationConfig);
      scale.value = withSpring(propsScale);
    } else if (!isDragging && wasDragging) {
      zIndex.value = withTiming(0, animationConfig);
      scale.value = withSpring(1);
    }
  }, []);

  const dragOnLongPressGesture = Gesture.Pan()
    .activateAfterLongPress(250)
    .enabled(!locked)
    .onStart(() => {
      isDragging.value = true;
      translation.value = getTranslationByIndexChange(currIndex.value, initialIndex.value, itemSize.value);
      lastSwap.value = {...lastSwap.value, from: currIndex.value};
      tempTranslation.value = translation.value;
      tempItemsOrder.value = itemsOrder.value;
    })
    .onTouchesMove(() => {
      if (enableHaptic && !isDragging.value) {
        runOnJS(HapticService.triggerHaptic)(HapticType.selection, 'SortableList');
      }
    })
    .onUpdate(event => {
      const {translationX, translationY} = event;
      const _translation = horizontal ? translationX : translationY;
      translation.value = tempTranslation.value + _translation;

      // Swapping items
      let newIndex = getIndexByPosition(translation.value, itemSize.value) + initialIndex.value;
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
          lastSwap.value = {...lastSwap.value, to: newIndex};
        }
      }
    })
    .onEnd(() => {
      const _translation = getTranslationByIndexChange(getItemIndexById(itemsOrder.value, id),
        getItemIndexById(tempItemsOrder.value, id),
        itemSize.value);

      translation.value = withTiming(tempTranslation.value + _translation, animationConfig, () => {
        if (tempItemsOrder.value.toString() !== itemsOrder.value.toString()) {
          runOnJS(onChange)({...lastSwap.value});
        }
      });
    })
    .onFinalize(() => {
      if (isDragging.value) {
        isDragging.value = false;
      }
    });

  const draggedAnimatedStyle = useAnimatedStyle(() => {
    const opacity = isDragging.value ? 0.95 : 1;
    const shadow = isDragging.value
      ? draggedItemShadow.value
      : defaultItemShadow.value;

    return {
      backgroundColor: itemProps?.backgroundColor ?? LIST_ITEM_BACKGROUND, // required for elevation to work in Android
      zIndex: Math.round(zIndex.value),
      transform: [
        horizontal ? {translateX: translation.value} : {translateY: translation.value},
        {scale: scale.value}
      ],
      opacity,
      ...itemProps?.margins,
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
