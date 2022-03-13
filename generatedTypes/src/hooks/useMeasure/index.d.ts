/// <reference types="react" />
import { View as RNView } from 'react-native';
export interface AbsoluteMeasurements {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface Measurements extends AbsoluteMeasurements {
    pageX: number;
    pageY: number;
}
declare const _default: () => {
    ref: import("react").MutableRefObject<RNView | undefined>;
    measurements: Measurements | undefined;
    absMeasurements: AbsoluteMeasurements | undefined;
};
export default _default;
