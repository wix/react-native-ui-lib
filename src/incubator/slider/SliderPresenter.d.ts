import { SharedValue } from 'react-native-reanimated';
import { SliderProps } from './index';
export declare function getOffsetForValue(value: number, span: number, minimumValue?: number, maximumValue?: number): number;
export declare function getValueForOffset(offset: number, span: number, minimum?: number, maximum?: number, step?: number): number;
export declare function validateValues(props: SliderProps): void;
export declare function getStepInterpolated(trackWidth: number, minimumValue: number, maximumValue: number, stepXValue: SharedValue<number>): number;
