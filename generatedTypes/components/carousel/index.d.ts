import React, { Component, RefObject, ReactNode, Key } from 'react';
import { ScrollView, LayoutChangeEvent, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { CarouselProps, CarouselState, PageControlPosition } from './types';
export { CarouselProps };
declare type DefaultProps = Partial<CarouselProps>;
/**
 * @description: Carousel for scrolling pages horizontally
 * @gif: https://user-images.githubusercontent.com/1780255/107120258-40b5bc80-6895-11eb-9596-8065d3a940ff.gif, https://user-images.githubusercontent.com/1780255/107120257-3eebf900-6895-11eb-9800-402e9e0dc692.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CarouselScreen.tsx
 * @extends: ScrollView
 * @extendsLink: https://facebook.github.io/react-native/docs/scrollview
 * @notes: This is a screen width Component
 */
declare class Carousel extends Component<CarouselProps, CarouselState> {
    static displayName: string;
    static defaultProps: DefaultProps;
    static pageControlPositions: typeof PageControlPosition;
    carousel: RefObject<ScrollView>;
    autoplayTimer?: ReturnType<typeof setTimeout>;
    orientationChange?: boolean;
    skippedInitialScroll?: boolean;
    constructor(props: CarouselProps);
    static getDerivedStateFromProps(nextProps: CarouselProps, prevState: CarouselState): {
        pageWidth: number;
        initialOffset: {
            x: number;
            y: number;
        };
        prevProps: CarouselProps;
    } | {
        prevProps: CarouselProps;
        pageWidth?: undefined;
        initialOffset?: undefined;
    } | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: CarouselProps): void;
    onOrientationChanged: () => void;
    getItemSpacings(props: CarouselProps): number;
    getContainerMarginHorizontal: () => number;
    getContainerPaddingVertical: () => number;
    updateOffset: (animated?: boolean) => void;
    startAutoPlay(): void;
    stopAutoPlay(): void;
    resetAutoPlay(): void;
    goToPage(pageIndex: number, animated?: boolean): void;
    getCalcIndex(index: number): number;
    getSnapToOffsets: () => number[] | undefined;
    shouldUsePageWidth(): number | false | undefined;
    shouldEnablePagination(): boolean | undefined;
    onContainerLayout: ({ nativeEvent: { layout: { width: containerWidth, height: containerHeight } } }: LayoutChangeEvent) => void;
    shouldAllowAccessibilityLayout(): boolean | undefined;
    onContentSizeChange: () => void;
    onMomentumScrollEnd: () => void;
    goToNextPage(): void;
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollEvent: (...args: any[]) => void;
    renderChild: (child: ReactNode, key: Key) => JSX.Element | undefined;
    renderChildren(): JSX.Element[] | null | undefined;
    renderPageControl(): JSX.Element | undefined;
    renderCounter(): JSX.Element | undefined;
    renderAccessibleLayout(): JSX.Element;
    renderCarousel(): JSX.Element;
    render(): JSX.Element;
}
export { Carousel };
declare const _default: React.ComponentClass<CarouselProps & {
    useCustomTheme?: boolean | undefined;
}, any> & Carousel & {
    pageControlPositions: typeof PageControlPosition;
};
export default _default;
