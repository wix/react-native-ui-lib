import {createContext} from 'react';
import {ViewProps} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

interface SortableListContextType {
  data: any
  itemsOrder: SharedValue<string[]>;
  onChange: () => void;
  itemHeight: SharedValue<number>;
  onItemLayout: ViewProps['onLayout'];
  enableHaptic?: boolean;
}

// @ts-ignore
const SortableListContext = createContext<SortableListContextType>({});

export default SortableListContext;
