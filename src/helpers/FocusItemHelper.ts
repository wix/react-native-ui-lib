import _ from 'lodash';
import {RefObject, useState, useCallback, useEffect, useRef} from 'react';
import {LayoutChangeEvent, ScrollView, FlatList, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {Constants} from 'react-native-ui-lib';

export enum OffsetType {
  CENTER = 'CENTER',
  DYNAMIC = 'DYNAMIC',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export type Props = {
  /**
   * A reference to the ScrollView (or FlatList) which the items are in
   */
  scrollViewRef: RefObject<ScrollView | FlatList>;
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
   * How much space (padding \ margin) is there on he left\right of the items
   */
  sideSpacing?: number;
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

export type ResultProps = {
  /**
   * This should be called by each ot the items' onLayout
   */
  onItemLayout: (event: LayoutChangeEvent, index: number) => void;
  /**
   * This should be called by the ScrollView (or FlatList)
   * If this is not used OffsetType.DYNAMIC will not work properly
   */
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /**
   * The items' width
   */
  itemsWidths: number[];
  /**
   * Use in order to focus the item with the specified index
   */
  focusIndex: (index: number, animated?: boolean) => void;
  // focusIndex: ([]) => void;
};

const focusItemsHelper = (props: Props): ResultProps => {
  const {
    scrollViewRef,
    itemsCount,
    selectedIndex,
    offsetType = OffsetType.CENTER,
    addOffsetMargin = true,
    sideSpacing = 0,
    innerSpacing = 0
  } = props;
  const itemsWidths = useRef<(number | null)[]>(_.times(itemsCount, () => null));
  const contentOffset = useRef<number>(0);
  const [offsets, setOffsets] = useState<Offsets>({CENTER: [], LEFT: [], RIGHT: []});

  // TODO: reset?
  //   useEffect(() => {
  //     itemsWidths.current = _.times(itemsCount, () => null);
  //   }, [itemsCount]);

  // const contentWidth = _.sum(itemsWidths);
  // TODO: const scrollEnabled = contentWidth.current > containerWidth;

  const setSnapBreakpoints = useCallback((itemsWidths: number[]) => {
    if (_.isEmpty(itemsWidths)) {
      return;
    }

    const screenCenter = Constants.screenWidth / 2; // TODO: change to something more dynamic?
    let index = 0;
    const centeredOffsets = [];
    let currentCenterOffset = sideSpacing;
    const leftOffsets = [];
    leftOffsets.push(0);
    const rightOffsets = [];
    rightOffsets.push(-Constants.screenWidth + itemsWidths[0]);
    while (index < itemsCount) {
      centeredOffsets[index] = currentCenterOffset - screenCenter + itemsWidths[index] / 2;
      ++index;
      currentCenterOffset += itemsWidths[index - 1] + innerSpacing;
      leftOffsets[index] = leftOffsets[index - 1] + itemsWidths[index - 1];
      rightOffsets[index] = rightOffsets[index - 1] + itemsWidths[index];
    }

    if (addOffsetMargin) {
      index = 1;
      while (index < itemsCount - 1) {
        leftOffsets[index] -= itemsWidths[index - 1];
        rightOffsets[index] += itemsWidths[index + 1];
        ++index;
      }
    }

    setOffsets({CENTER: centeredOffsets, LEFT: leftOffsets, RIGHT: rightOffsets}); // default for DYNAMIC is CENTER
  },
  [itemsCount, sideSpacing, innerSpacing, addOffsetMargin]);

  const onItemLayout = useCallback((event: LayoutChangeEvent, index: number) => {
    const {width} = event.nativeEvent.layout;
    itemsWidths.current[index] = width;
    if (!_.includes(itemsWidths.current, null)) {
      setSnapBreakpoints(itemsWidths.current as number[]);
    }
  },
  [setSnapBreakpoints]);

  const onScroll = useCallback(({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    contentOffset.current = nativeEvent.contentOffset.x;
  }, []);

  const scroll = (scrollTo: number, animated: boolean) => {
    // @ts-ignore
    if (_.isFunction(scrollViewRef.current.scrollToOffset)) {
      // @ts-ignore
      scrollViewRef.current.scrollToOffset({offset: scrollTo, animated});
      // @ts-ignore
    } else if (_.isFunction(scrollViewRef.current.scrollTo)) {
      // @ts-ignore
      scrollViewRef.current.scrollTo({x: scrollTo, animated});
    }
  };

  const focusIndex = useCallback((index: number, animated = true) => {
    if (index >= 0 && offsets.CENTER.length > index) {
      if (offsetType !== OffsetType.DYNAMIC) {
        scroll(offsets[offsetType][index], animated);
      } else {
        const indexIsOnLeftOfCenter = contentOffset.current < offsets[OffsetType.CENTER][index];
        scroll(indexIsOnLeftOfCenter ? offsets[OffsetType.LEFT][index] : offsets[OffsetType.RIGHT][index], animated);
      }
    }
  },
  [offsets, offsetType]);

  useEffect(() => {
    if (!_.isUndefined(selectedIndex)) {
      focusIndex(selectedIndex);
    }
  }, [selectedIndex, focusIndex]);

  return {
    onItemLayout,
    onScroll,
    itemsWidths: offsets.CENTER.length > 0 ? (itemsWidths.current as number[]) : [],
    focusIndex
  };
};

export default focusItemsHelper;
