/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type ImageProps = {
    sourceTransformer?: (...args: any[]) => any;
    assetName?: string;
    assetGroup?: string;
};
/**
 * @description: Image wrapper with extra functionality like source transform and assets support
 * @extends: Image
 * @extendslink: https://facebook.github.io/react-native/docs/image.html
 */
declare class Image extends BaseComponent<ImageProps, {}> {
    static displayName: string;
    static defaultProps: {
        assetGroup: string;
    };
    constructor(props: any);
    getImageSource(): any;
    render(): JSX.Element;
}
export default Image;
