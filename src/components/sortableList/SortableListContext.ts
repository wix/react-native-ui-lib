import {createContext} from 'react';
import {ViewProps} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {Data, SortableListItemProps} from './types';

export interface SortableListContextType<ItemT extends SortableListItemProps> {
  data: Data<ItemT>;
  itemsOrder: SharedValue<string[]>;
  lockedIds: SharedValue<Dictionary<boolean>>;
  onChange: () => void;
  itemHeight: SharedValue<number>;
  onItemLayout: ViewProps['onLayout'];
  enableHaptic?: boolean;
  scale?: number;
  itemProps?: {margins?: {marginTop?: number; marginBottom?: number; marginLeft?: number; marginRight?: number}};
}

// @ts-ignore
const SortableListContext = createContext<SortableListContextType>({});

export default SortableListContext;
