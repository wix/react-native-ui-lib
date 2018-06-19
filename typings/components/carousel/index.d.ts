/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type CarouselProps = {
    initialPage?: number;
    pageWidth?: number;
    loop?: boolean;
    onChangePage?: (...args: any[]) => any;
    onScroll?: (...args: any[]) => any;
    containerStyle?: object | number | any[];
};
declare type CarouselState = {
    currentPage: any;
    currentStandingPage: any;
};
/**
 * @description: Carousel for scrolling pages horizontally
 * @gif: https://media.giphy.com/media/l0HU7f8gjpRlMRhKw/giphy.gif, https://media.giphy.com/media/3oFzmcjX9OhpyckhcQ/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CarouselScreen.js
 */
export default class Carousel extends BaseComponent<CarouselProps, CarouselState> {
    static displayName: string;
    static defaultProps: {
        initialPage: number;
        pageWidth: any;
    };
    constructor(props: any);
    generateStyles(): void;
    readonly pageWidth: number;
    onScroll(event: any): void;
    updateOffset(animated?: boolean): void;
    componentDidMount(): void;
    cloneChild(child: any): any;
    renderChildren(): any;
    render(): JSX.Element;
    goToPage(pageIndex: any, animated?: boolean): void;
}
export {};
