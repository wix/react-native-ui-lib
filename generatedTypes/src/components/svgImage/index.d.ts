/// <reference types="react" />
export interface SvgImageProps {
    /**
     * the asset tint
     */
    tintColor?: string | null;
    data: any;
}
declare function SvgImage(props: SvgImageProps): JSX.Element | null;
declare namespace SvgImage {
    var displayName: string;
    var isSvg: typeof import("../../utils/imageUtils").isSvg;
}
export default SvgImage;
