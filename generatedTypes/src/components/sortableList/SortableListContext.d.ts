/// <reference types="react" />
import { SharedValue } from 'react-native-reanimated';
interface SortableListContextType {
    currentByInitialIndices?: SharedValue<number[]>;
    initialByCurrentIndices?: SharedValue<number[]>;
    scrollWhileDragging?: boolean;
    onDragStateChange?: (draggedIndex?: number) => void;
    onDrag?: (translation: number, ref: any) => void;
    setItemHeight?: (itemHeight: number) => void;
}
declare const SortableListContext: import("react").Context<SortableListContextType>;
export default SortableListContext;
