/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type TourProps = {
    visible?: boolean;
    onClose?: (...args: any[]) => any;
    overlayColor?: string;
    overlayOpacity?: number;
    message?: string;
    messageStyle?: object | number | any[];
};
declare type TourState = {
    targetPosition: {
        left: any;
        top: any;
        width: any;
        height: any;
    };
};
/**
 * [WIP] a Tour component for feature discoverability
 */
declare class Tour extends BaseComponent<TourProps, TourState> {
    constructor(props: any);
    static defaultProps: {
        visible: boolean;
        overlayColor: any;
        overlayOpacity: number;
    };
    state: {};
    renderTarget(): any;
    onTargetLayout(): void;
    renderTargetClone(): any;
    renderMessage(): JSX.Element;
    render(): JSX.Element;
}
export default Tour;
