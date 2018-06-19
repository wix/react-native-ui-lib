/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type Carousel2Props = {
    pageWidth?: number;
    initialPage?: number;
    loop?: boolean;
};
declare type Carousel2State = {
    currentPage: any;
    position: {
        x: number;
        y: number;
    };
};
export default class Carousel2 extends BaseComponent<Carousel2Props, Carousel2State> {
    static displayName: string;
    static defaultProps: {
        pageWidth: any;
        initialPage: number;
    };
    constructor(props: any);
    componentWillMount(): void;
    onStop(event: any): void;
    updateCarouselPosition(): void;
    getSnappingPoints(): any;
    generateStyles(): void;
    cloneChild(child: any): any;
    renderPages(): any;
    render(): JSX.Element;
}
export {};
