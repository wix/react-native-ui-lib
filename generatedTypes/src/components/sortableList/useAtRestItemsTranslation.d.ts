import { SharedValue } from 'react-native-reanimated';
import { BaseItemProps } from './types';
interface Props extends BaseItemProps {
    isDragged: SharedValue<boolean>;
}
declare const useAtRestItemsTranslation: (props: Props) => {
    atRestSwappedTranslation: SharedValue<number>;
    onDragEnd: () => void;
};
export default useAtRestItemsTranslation;
