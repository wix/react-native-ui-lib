import {FlatListProps} from 'react-native';
import {SortableListContextType} from './SortableListContext';

export interface SortableListItemProps {
  id: string;
  locked?: boolean;
}

// Internal
export type Data<ItemT extends SortableListItemProps> = FlatListProps<ItemT>['data'];

export interface SortableListProps<ItemT extends SortableListItemProps>
  extends Omit<FlatListProps<ItemT>, 'extraData' | 'data'>,
    Pick<SortableListContextType<ItemT>, 'scale'> {
  /**
   * The data of the list.
     IMPORTANT: Do not update 'data' in 'onOrderChange' (i.e. for each order change); only update it when you change the items (i.g. adding and removing an item).
   */
  data: Data<ItemT>;
  /**
   * A callback to get the new order (or swapped items).
   */
  onOrderChange: (data: ItemT[] /* TODO: add more data? */) => void;
  /**
   * Whether to enable the haptic feedback
   * (please note that react-native-haptic-feedback does not support the specific haptic type on Android starting on an unknown version, you can use 1.8.2 for it to work properly)
   */
  enableHaptic?: boolean;
  /**
   * Extra props for the item
   */
  itemProps?: {margins?: {marginTop?: number; marginBottom?: number; marginLeft?: number; marginRight?: number}};
}
