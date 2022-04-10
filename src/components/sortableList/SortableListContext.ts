import {createContext} from 'react';
import {SharedValue} from 'react-native-reanimated';

interface SortableListContextType {
  itemsOrder: SharedValue<number[]>;
  onChange: () => void;
  itemHeight: SharedValue<number>;
}

// @ts-ignore
const SortableListContext = createContext<SortableListContextType>({});

export default SortableListContext;
