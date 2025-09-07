import _isUndefined from "lodash/isUndefined";
import _includes from "lodash/includes";
import _isEmpty from "lodash/isEmpty";
import _times from "lodash/times";
import { useState, useCallback, useEffect, useRef } from 'react';
import useScrollTo from "../useScrollTo";
import { Constants } from "../../commons/new";
export let OffsetType = /*#__PURE__*/function (OffsetType) {
  OffsetType["CENTER"] = "CENTER";
  OffsetType["DYNAMIC"] = "DYNAMIC";
  OffsetType["LEFT"] = "LEFT";
  OffsetType["RIGHT"] = "RIGHT";
  return OffsetType;
}({});

// TODO: this is what I want, is there a better way to do it?

const useScrollToItem = props => {
  const {
    scrollViewRef: propsScrollViewRef,
    itemsCount,
    selectedIndex,
    offsetType = OffsetType.CENTER,
    addOffsetMargin = true,
    outerSpacing = 0,
    innerSpacing = 0
  } = props;
  const itemsWidths = useRef(_times(itemsCount, () => null));
  const currentIndex = useRef(selectedIndex || 0);
  const [offsets, setOffsets] = useState({
    CENTER: [],
    LEFT: [],
    RIGHT: []
  });
  const {
    scrollViewRef,
    scrollTo,
    onContentSizeChange,
    onLayout
  } = useScrollTo({
    scrollViewRef: propsScrollViewRef
  });

  // TODO: reset?
  //   useEffect(() => {
  //     itemsWidths.current = _.times(itemsCount, () => null);
  //   }, [itemsCount]);

  // const contentWidth = _.sum(itemsWidths);
  // TODO: const scrollEnabled = contentWidth.current > containerWidth;

  const setSnapBreakpoints = useCallback(itemsWidths => {
    if (_isEmpty(itemsWidths)) {
      return;
    }
    const screenCenter = Constants.screenWidth / 2; // TODO: change to something more dynamic?
    let index = 0;
    const centeredOffsets = [];
    let currentCenterOffset = outerSpacing;
    const leftOffsets = [];
    leftOffsets.push(outerSpacing - innerSpacing);
    const rightOffsets = [];
    rightOffsets.push(-Constants.screenWidth + itemsWidths[0] + outerSpacing + innerSpacing);
    while (index < itemsCount) {
      centeredOffsets[index] = currentCenterOffset - screenCenter + itemsWidths[index] / 2;
      ++index;
      currentCenterOffset += itemsWidths[index - 1] + innerSpacing;
      leftOffsets[index] = leftOffsets[index - 1] + itemsWidths[index - 1] + innerSpacing;
      rightOffsets[index] = rightOffsets[index - 1] + itemsWidths[index] + innerSpacing;
    }
    if (addOffsetMargin) {
      index = 1;
      while (index < itemsCount - 1) {
        leftOffsets[index] -= itemsWidths[index - 1];
        rightOffsets[index] += itemsWidths[index + 1] + innerSpacing;
        ++index;
      }
    }
    setOffsets({
      CENTER: centeredOffsets,
      LEFT: leftOffsets,
      RIGHT: rightOffsets
    }); // default for DYNAMIC is CENTER
  }, [itemsCount, outerSpacing, innerSpacing, addOffsetMargin]);
  const onItemLayout = useCallback((event, index) => {
    const {
      width
    } = event.nativeEvent.layout;
    itemsWidths.current[index] = width;
    if (!_includes(itemsWidths.current, null)) {
      setSnapBreakpoints(itemsWidths.current);
    }
  }, [setSnapBreakpoints]);
  const focusIndex = useCallback((index, animated = true) => {
    if (index >= 0 && offsets.CENTER.length > index) {
      if (offsetType !== OffsetType.DYNAMIC) {
        scrollTo(offsets[offsetType][index], animated);
      } else {
        const movingLeft = index < currentIndex.current;
        currentIndex.current = index;
        scrollTo(movingLeft ? offsets[OffsetType.RIGHT][index] : offsets[OffsetType.LEFT][index], animated);
      }
    }
  }, [offsets, offsetType, scrollTo]);
  useEffect(() => {
    if (!_isUndefined(selectedIndex)) {
      focusIndex(selectedIndex);
    }
  }, [selectedIndex, focusIndex]);
  return {
    scrollViewRef,
    onItemLayout,
    itemsWidths: offsets.CENTER.length > 0 ? itemsWidths.current : [],
    focusIndex,
    onContentSizeChange,
    onLayout
  };
};
useScrollToItem.offsetType = OffsetType;
export default useScrollToItem;