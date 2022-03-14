import React, {PropsWithChildren, useContext} from 'react';
import {ViewStyle} from 'react-native';
import {AnimatedStyleProp, useAnimatedStyle} from 'react-native-reanimated';
import View from '../view';
import SortableListItemContext from './SortableListItemContext';

export interface SortableListItemDecoratorProps {
  atRestAnimatedStyle?: AnimatedStyleProp<ViewStyle>;
  draggedAnimatedStyle?: AnimatedStyleProp<ViewStyle>;
}

// function animateStyle(style) {
//   const keys = Object.keys(style);
//   forEach(keys, key => {
//     ...
//   });
// }

const SortableListItemDecorator = (props: PropsWithChildren<SortableListItemDecoratorProps>) => {
  const {atRestAnimatedStyle = {}, draggedAnimatedStyle = {}, children} = props;

  const {isDragged} = useContext(SortableListItemContext);

  // TODO: It might be possible to analyze the input styles to create them withTiming etc
  // animateStyle(atRestAnimatedStyle);
  // Another option is to create a few decorators (as done in react-native-draggable-flatlist:
  // https://github.com/computerjazz/react-native-draggable-flatlist/blob/29f85b5b1b78608213d2539f7cc25ab5b0f2f862/src/components/CellDecorators.tsx)

  const animatedStyle = useAnimatedStyle(() => {
    return isDragged?.value ? draggedAnimatedStyle : atRestAnimatedStyle;
  });

  return (
    // @ts-expect-error
    <View reanimated style={animatedStyle}>
      {children}
    </View>
  );
};

export default SortableListItemDecorator;
