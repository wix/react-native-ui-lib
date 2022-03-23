import { PropsWithChildren } from 'react';
import Animated from 'react-native-reanimated';
import usePresenter, { ItemsOrder } from './usePresenter';
interface SortableItemProps extends ReturnType<typeof usePresenter> {
    index: number;
    itemsOrder: Animated.SharedValue<ItemsOrder>;
    onChange: () => void;
}
declare function SortableItem(props: PropsWithChildren<SortableItemProps>): JSX.Element;
export default SortableItem;
