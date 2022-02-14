import { StyleProp, ViewStyle } from 'react-native';
import { StyleProps } from '../types';
export declare function getSizeFromPercentage(size: string, totalSize: number): number | undefined;
export declare function getSizeAsNumber(isWidth: boolean, size?: string | number): number | undefined;
export declare function getSize(isWidth: boolean, defaultSize?: number, propSize?: string | number, style?: StyleProp<ViewStyle>): number | undefined;
declare const useSizeStyle: (props: StyleProps) => {
    width: number | undefined;
    height: number | undefined;
};
export default useSizeStyle;
