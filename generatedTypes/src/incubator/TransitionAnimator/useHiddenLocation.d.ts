import { RefObject } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
export declare type Direction = 'top' | 'bottom' | 'left' | 'right';
interface HiddenLocation {
    isDefault: boolean;
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export interface HiddenLocationProps<T extends View> {
    containerRef: RefObject<T>;
}
export default function useHiddenLocation<T extends View>(props: HiddenLocationProps<T>): {
    onLayout: (event: LayoutChangeEvent) => void;
    hiddenLocation: HiddenLocation;
};
export {};
