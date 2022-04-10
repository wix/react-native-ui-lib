import {createContext} from 'react';
import {SharedValue} from 'react-native-reanimated';

interface SortableListContextType {
  currentByInitialIndices?: SharedValue<number[]>;
  initialByCurrentIndices?: SharedValue<number[]>;
  onDragStateChange?: (draggedIndex?: number) => void;
}

const SortableListContext = createContext<SortableListContextType>({});

export default SortableListContext;
