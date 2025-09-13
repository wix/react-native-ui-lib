import { StyleProp, ViewStyle } from 'react-native';
interface UnpackStyleOptions {
    flatten?: boolean;
}
export declare function unpackStyle(style?: StyleProp<ViewStyle>, options?: UnpackStyleOptions): any;
export declare function getAccessibleHitSlop(size: number): number;
export {};
