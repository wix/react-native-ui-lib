import {createContext} from 'react';
import {ViewProps} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import type {Dictionary} from '../../typings/common';
import {Data, SortableListItemProps} from './types';

export interface SortableListContextType<ItemT extends SortableListItemProps> {
  data: Data<ItemT>;
  itemsOrder: SharedValue<string[]>;
  lockedIds: SharedValue<Dictionary<boolean>>;
  onChange: () => void;
  itemSize: SharedValue<number>;
  horizontal?: boolean;
  onItemLayout: ViewProps['onLayout'];
  enableHaptic?: boolean;
  scale?: number;
  itemProps?: {margins?: {marginTop?: number; marginBottom?: number; marginLeft?: number; marginRight?: number}};
}

// @ts-ignore
const SortableListContext = createContext<SortableListContextType>({});

export default SortableListContext;
