import type { SegmentedControlProps } from './';
import { SegmentProps } from './segment';
import type { ColorValue } from 'react-native';
interface useSegmentedControlPresetProps extends SegmentedControlProps, Partial<SegmentProps> {
    segmentDividerWidth: number;
    segmentDividerColor: ColorValue;
    iconTintColor?: string;
}
declare const useSegmentedControlPreset: (props: SegmentedControlProps) => useSegmentedControlPresetProps;
export default useSegmentedControlPreset;
