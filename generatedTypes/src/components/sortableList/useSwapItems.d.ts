import { SharedValue } from 'react-native-reanimated';
import { GestureUpdateEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { BaseItemProps, ScrollProps } from './types';
export interface SwapItemsProps extends BaseItemProps, ScrollProps {
    drag: SharedValue<number>;
}
declare const useSwapItems: (props: SwapItemsProps) => {
    onDragUpdate: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void;
    onDragEnd: () => void;
    swapItemsIfNeeded: () => void;
};
export default useSwapItems;
