import { SharedValue } from 'react-native-reanimated';
import { GestureUpdateEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { BaseItemProps, ScrollProps } from './types';
interface Props extends BaseItemProps, ScrollProps {
    drag: SharedValue<number>;
    atRestSwappedTranslation: SharedValue<number>;
}
declare const useSwapItems: (props: Props) => {
    onDragUpdate: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void;
    onDragEnd: () => void;
    swapItemsIfNeeded: () => void;
};
export default useSwapItems;
