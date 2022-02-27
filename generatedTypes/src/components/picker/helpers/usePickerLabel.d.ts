import { PickerProps, PickerValue } from '../types';
interface UsePickerLabelProps extends Pick<PickerProps, 'value' | 'getLabel' | 'getItemLabel' | 'placeholder'> {
    items: {
        value: string | number;
        label: string;
    }[] | null | undefined;
}
declare const usePickerLabel: (props: UsePickerLabelProps) => {
    getLabelsFromArray: (value: PickerValue) => string;
    getLabel: (value: PickerValue) => string | undefined;
    accessibilityInfo: {
        accessibilityLabel: string;
        accessibilityHint: string;
    };
    label: string | undefined;
};
export default usePickerLabel;
