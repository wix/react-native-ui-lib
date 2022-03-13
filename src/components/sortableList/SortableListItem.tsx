import React, {PropsWithChildren, useCallback, useContext, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import {BaseItemProps} from './types';
import useDraggableAnimation from './useDraggableAnimation';
import SortableListContext from './SortableListContext';

type SortableListItemProps = Pick<BaseItemProps, 'index'>;

type Props = PropsWithChildren<SortableListItemProps>;

const SortableListItem = (props: Props) => {
  const {children, index} = props;

  const [height, setHeight] = useState<number>(0);
  const {setItemHeight} = useContext(SortableListContext);
  const {dragAfterLongPressGesture, draggedAnimatedStyle} = useDraggableAnimation({
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

  return (
    <GestureDetector gesture={dragAfterLongPressGesture}>
      <Animated.View style={draggedAnimatedStyle} onLayout={onLayout}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export default SortableListItem;
