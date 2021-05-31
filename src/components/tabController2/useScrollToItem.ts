import _ from 'lodash';
import {useState, useCallback, useEffect, useRef} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import useScrollTo, {ScrollToProps, ScrollToSupportedViews, ScrollToResultProps} from 'hooks/useScrollTo';
import {Constants} from 'helpers';

export enum OffsetType {
  CENTER = 'CENTER',
  DYNAMIC = 'DYNAMIC',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export type ScrollToItemProps<T extends ScrollToSupportedViews> = Pick<ScrollToProps<T>, 'scrollViewRef'> & {
  /**
   * The number of items
   */
  itemsCount: number;
  /**
   * The selected item's index
   */
  selectedIndex?: number;
  /**
   * Where would the item be located (default to CENTER)
   */
  offsetType?: OffsetType;
  /**
   * Add a margin to the offset (default to true)
   * This gives a better UX
   * Not relevant to OffsetType.CENTER
   */
  addOffsetMargin?: boolean;
  /**
   * How much space (padding \ margin) is there on the left\right of the items
   */
  outerSpacing?: number;
  /**
   * How much space (padding \ margin) is there between each item
   */
  innerSpacing?: number;
};

// TODO: this is what I want, is there a better way to do it?
type Offsets = {
  CENTER: number[];
  LEFT: number[];
  RIGHT: number[];
};

export type ScrollToItemResultProps<T extends ScrollToSupportedViews> = Pick<
  ScrollToResultProps<T>,
  'scrollViewRef'
> & {
  /**
   * This should be called by each ot the items' onLayout
   */
  onItemLayout: (event: LayoutChangeEvent, index: number) => void;
  /**
   * The items' width
   */
  itemsWidths: number[];
  /**
   * Use in order to focus the item with the specified index (use when the selectedIndex is not changed)
   */
  focusIndex: (index: number, animated?: boolean) => void;
  /**
   * onContentSizeChange callback (should be set to your onContentSizeChange).
   * Needed for RTL support on Android.
   */
  onContentSizeChange: (contentWidth: number, contentHeight: number) => void;
  /**
   * onLayout callback (should be set to your onLayout).
   * Needed for RTL support on Android.
   */
  onLayout: (event: LayoutChangeEvent) => void;
};

const useScrollToItem = <T extends ScrollToSupportedViews>(props: ScrollToItemProps<T>): ScrollToItemResultProps<T> => {
  const {
    scrollViewRef: propsScrollViewRef,
    itemsCount,
    selectedIndex,
    offsetType = OffsetType.CENTER,
    addOffsetMargin = true,
    outerSpacing = 0,
    innerSpacing = 0
  } = props;
  const _itemsWidths = useRef<(number | null)[]>(_.times(itemsCount, () => null));
  const itemsWidthsAnimated = useSharedValue(_.times(itemsCount, () => 0));
  const itemsOffsetsAnimated = useSharedValue(_.times(itemsCount, () => 0));
  const currentIndex = useRef<number>(selectedIndex || 0);
  const [offsets, setOffsets] = useState<Offsets>({CENTER: [], LEFT: [], RIGHT: []});
  const {scrollViewRef, scrollTo, onContentSizeChange, onLayout} = useScrollTo<T>({scrollViewRef: propsScrollViewRef});

  // TODO: reset?
  //   useEffect(() => {
  //     itemsWidths.current = _.times(itemsCount, () => null);
  //   }, [itemsCount]);

  // const contentWidth = _.sum(itemsWidths);
  // TODO: const scrollEnabled = contentWidth.current > containerWidth;

  const setSnapBreakpoints = useCallback((_itemsWidths: number[]) => {
    if (_.isEmpty(_itemsWidths)) {
      return;
    }

    const screenCenter = Constants.screenWidth / 2; // TODO: change to something more dynamic?
    let index = 0;
    const centeredOffsets = [];
    let currentCenterOffset = outerSpacing;
    const leftOffsets = [];
    leftOffsets.push(outerSpacing - innerSpacing);
    const rightOffsets = [];
    rightOffsets.push(-Constants.screenWidth + _itemsWidths[0] + outerSpacing + innerSpacing);
    while (index < itemsCount) {
      centeredOffsets[index] = currentCenterOffset - screenCenter + _itemsWidths[index] / 2;
      ++index;
      currentCenterOffset += _itemsWidths[index - 1] + innerSpacing;
      leftOffsets[index] = leftOffsets[index - 1] + _itemsWidths[index - 1] + innerSpacing;
      rightOffsets[index] = rightOffsets[index - 1] + _itemsWidths[index] + innerSpacing;
    }

    if (addOffsetMargin) {
      index = 1;
      while (index < itemsCount - 1) {
        leftOffsets[index] -= _itemsWidths[index - 1];
        rightOffsets[index] += _itemsWidths[index + 1] + innerSpacing;
        ++index;
      }
    }

    setOffsets({CENTER: centeredOffsets, LEFT: leftOffsets, RIGHT: rightOffsets}); // default for DYNAMIC is CENTER
    _itemsWidths.forEach((width, index) => {
      itemsWidthsAnimated.value[index] = width;
      if (index > 0) {
        itemsOffsetsAnimated.value[index] =
            itemsOffsetsAnimated.value[index - 1] + itemsWidthsAnimated.value[index - 1];
      }
    });

    // trigger value change
    itemsWidthsAnimated.value = [...itemsWidthsAnimated.value];
    itemsOffsetsAnimated.value = [...itemsOffsetsAnimated.value];
  },
  [itemsCount, outerSpacing, innerSpacing, addOffsetMargin]);

  const onItemLayout = useCallback((event: LayoutChangeEvent, index: number) => {
    const {width} = event.nativeEvent.layout;
    _itemsWidths.current[index] = width;
    if (!_.includes(_itemsWidths.current, null)) {
      setSnapBreakpoints(_itemsWidths.current as number[]);
    }
  },
  [setSnapBreakpoints]);

  const focusIndex = useCallback((index: number, animated = true) => {
    if (index >= 0 && offsets.CENTER.length > index) {
      if (offsetType !== OffsetType.DYNAMIC) {
        scrollTo(offsets[offsetType][index], animated);
      } else {
        const movingLeft = index < currentIndex.current;
        currentIndex.current = index;
        scrollTo(movingLeft ? offsets[OffsetType.RIGHT][index] : offsets[OffsetType.LEFT][index], animated);
      }
    }
  },
  [offsets, offsetType, scrollTo]);

  useEffect(() => {
    if (!_.isUndefined(selectedIndex)) {
      focusIndex(selectedIndex);
    }
  }, [selectedIndex, focusIndex]);

  return {
    scrollViewRef,
    onItemLayout,
    itemsWidthsAnimated,
    itemsOffsetsAnimated,
    itemsWidths: offsets.CENTER.length > 0 ? (_itemsWidths.current as number[]) : [],
    focusIndex,
    onContentSizeChange,
    onLayout
  };
};

useScrollToItem.offsetType = OffsetType;

export default useScrollToItem;
