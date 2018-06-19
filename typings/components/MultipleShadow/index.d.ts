/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type MultipleShadowProps = {
    topShadow?: object;
    bottomShadow?: object;
    shadowType?: any;
    shadowColor?: string;
};
/**
 * @description: A multiple layer for multiple shadow effect for iOS only
 */
export default class MultipleShadow extends BaseComponent<MultipleShadowProps, {}> {
    static displayName: string;
    static defaultProps: {
        shadowType: string;
    };
    generateStyles(): void;
    getShadowStyles(): {
        topShadow: any;
        bottomShadow: any;
    };
    render(): JSX.Element;
}
export {};
