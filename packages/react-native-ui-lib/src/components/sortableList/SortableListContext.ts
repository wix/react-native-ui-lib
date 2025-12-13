import {createContext} from 'react';
import type {ViewProps, FlatListProps} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import type {Dictionary} from '../../typings/common';
import {Data, OrderChangeInfo, SortableListItemProps, SortableListProps} from './types';

export interface SortableListContextType<ItemT extends SortableListItemProps> {
  data: Data<ItemT>;
  itemsOrder: SharedValue<string[]>;
  lockedIds: SharedValue<Dictionary<boolean>>;
  onChange: (info: OrderChangeInfo) => void;
  itemSize: SharedValue<number>;
  horizontal?: FlatListProps<ItemT>['horizontal'];
  onItemLayout: ViewProps['onLayout'];
  enableHaptic?: boolean;
  scale?: number;
  itemProps?: SortableListProps<ItemT>['itemProps'];
}

// @ts-ignore
const SortableListContext = createContext<SortableListContextType<SortableListItemProps>>({});

export default SortableListContext;
