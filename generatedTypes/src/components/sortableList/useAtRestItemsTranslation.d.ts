import { SharedValue } from 'react-native-reanimated';
import { BaseItemProps } from './types';
interface Props extends BaseItemProps {
    isDragged: SharedValue<boolean>;
    atRestSwappedTranslation: SharedValue<number>;
}
declare const useAtRestItemsTranslation: (props: Props) => {
    onDragEnd: () => void;
};
export default useAtRestItemsTranslation;
