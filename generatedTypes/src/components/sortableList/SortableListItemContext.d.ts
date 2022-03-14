/// <reference types="react" />
import { SharedValue } from 'react-native-reanimated';
interface SortableListItemContextType {
    isDragged?: SharedValue<boolean>;
}
declare const SortableListItemContext: import("react").Context<SortableListItemContextType>;
export default SortableListItemContext;
