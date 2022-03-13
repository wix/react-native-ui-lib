import { SharedValue } from 'react-native-reanimated';
import { BaseItemProps } from './types';
export interface AtRestItemsTranslationProps extends BaseItemProps {
    isDragged: SharedValue<boolean>;
}
declare const useAtRestItemsTranslation: (props: AtRestItemsTranslationProps) => {
    atRestSwappedTranslation: SharedValue<number>;
    onDragEnd: () => void;
};
export default useAtRestItemsTranslation;
