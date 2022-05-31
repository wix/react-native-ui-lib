import {createContext} from 'react';
import {ViewProps} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

interface SortableListContextType {
  itemsOrder: SharedValue<number[]>;
  onChange: () => void;
  itemHeight: SharedValue<number>;
  onItemLayout: ViewProps['onLayout'];
  disableHaptic?: boolean;
}

// @ts-ignore
const SortableListContext = createContext<SortableListContextType>({});

export default SortableListContext;
