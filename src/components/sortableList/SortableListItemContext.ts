import {createContext} from 'react';
import {SharedValue} from 'react-native-reanimated';

interface SortableListItemContextType {
  isDragged?: SharedValue<boolean>;
}

const SortableListItemContext = createContext<SortableListItemContextType>({});

export default SortableListItemContext;
