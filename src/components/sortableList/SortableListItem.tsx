/* eslint-disable react-hooks/exhaustive-deps */
import React, {PropsWithChildren, useCallback, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import View from '../view';
import {BaseItemProps} from './types';
import useDraggableAnimation from './useDraggableAnimation';

type Props = PropsWithChildren<Pick<BaseItemProps, 'index'>>;

const SortableListItem = (props: Props) => {
  const {children, index} = props;

  const [height, setHeight] = useState<number>(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    // Round height for Android
    const newHeight = Math.round(event.nativeEvent.layout.height);
    setHeight(newHeight);
  },
  [setHeight]);

  const {dragAfterLongPressGesture, draggedAnimatedStyle} = useDraggableAnimation({
    height,
    index
  });

  return (
    <GestureDetector gesture={dragAfterLongPressGesture}>
      <View reanimated style={draggedAnimatedStyle} onLayout={onLayout}>
        {children}
      </View>
    </GestureDetector>
  );
};

export default SortableListItem;
