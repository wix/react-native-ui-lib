import { RefObject } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import { PanningDirectionsEnum } from '../panView';
declare type HiddenLocationRecord = Record<PanningDirectionsEnum, number>;
export interface HiddenLocation extends HiddenLocationRecord {
    isDefault: boolean;
}
export interface HiddenLocationProps<T extends View> {
    containerRef: RefObject<T>;
}
export default function useHiddenLocation<T extends View>(props: HiddenLocationProps<T>): {
    onLayout: (event: LayoutChangeEvent) => void;
    hiddenLocation: HiddenLocation;
};
export {};
