import { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import usePresenter, { ItemsOrder } from './usePresenter';
interface SortableItemProps extends ReturnType<typeof usePresenter> {
    index: number;
    itemsOrder: Animated.SharedValue<ItemsOrder>;
    onChange: () => void;
    style: StyleProp<ViewStyle>;
}
declare function SortableItem(props: PropsWithChildren<SortableItemProps>): JSX.Element;
export default SortableItem;
