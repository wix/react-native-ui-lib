import { PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';
import { AnimatedStyleProp } from 'react-native-reanimated';
export interface SortableListItemDecoratorProps {
    atRestAnimatedStyle?: AnimatedStyleProp<ViewStyle>;
    draggedAnimatedStyle?: AnimatedStyleProp<ViewStyle>;
}
declare const SortableListItemDecorator: (props: PropsWithChildren<SortableListItemDecoratorProps>) => JSX.Element;
export default SortableListItemDecorator;
