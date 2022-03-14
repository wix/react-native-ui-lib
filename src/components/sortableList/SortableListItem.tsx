/* eslint-disable react-hooks/exhaustive-deps */
import React, {PropsWithChildren, useCallback, useContext, useMemo, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import {BaseItemProps} from './types';
import useDraggableAnimation from './useDraggableAnimation';
import SortableListContext from './SortableListContext';
import SortableListItemContext from './SortableListItemContext';

type Props = PropsWithChildren<Pick<BaseItemProps, 'index'>>;

const SortableListItem = (props: Props) => {
  const {children, index} = props;

  const [height, setHeight] = useState<number>(0);
  const {setItemHeight} = useContext(SortableListContext);
  const {dragAfterLongPressGesture, draggedAnimatedStyle, isDragged} = useDraggableAnimation({
    height,
    index
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    // Round height for Android
    const newHeight = Math.round(event.nativeEvent.layout.height);
    setHeight(newHeight);
    setItemHeight?.(newHeight);
  },
  [setHeight, setItemHeight]);

  const context = useMemo(() => {
    return {isDragged};
  }, []);

  return (
    <SortableListItemContext.Provider value={context}>
      <GestureDetector gesture={dragAfterLongPressGesture}>
        <Animated.View style={draggedAnimatedStyle} onLayout={onLayout}>
          {children}
        </Animated.View>
      </GestureDetector>
    </SortableListItemContext.Provider>
  );
};

export default SortableListItem;
