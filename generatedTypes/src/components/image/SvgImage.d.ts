/// <reference types="react" />
import { ImageProps } from 'react-native';
export declare function isSvg(source: ImageProps['source']): any;
export interface SvgImageProps {
    data: any;
}
declare function SvgImage(props: SvgImageProps): JSX.Element | null;
declare namespace SvgImage {
    var displayName: string;
    var isSvg: typeof import("./SvgImage").isSvg;
}
export default SvgImage;
