import { RefCallback } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import { PanningDirectionsEnum } from '../panView';
type HiddenLocationRecord = Record<PanningDirectionsEnum, number>;
export interface HiddenLocation extends HiddenLocationRecord {
    wasMeasured: boolean;
}
export default function useHiddenLocation<T extends View>(): {
    setRef: RefCallback<T>;
    onLayout: (event: LayoutChangeEvent) => void;
    hiddenLocation: HiddenLocation;
};
export {};
