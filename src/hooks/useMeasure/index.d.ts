/// <reference types="react" />
import { View as RNView } from 'react-native';
interface Measurements {
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
}
declare const _default: () => {
    ref: import("react").MutableRefObject<RNView | undefined>;
    measurements: Measurements | undefined;
};
export default _default;
