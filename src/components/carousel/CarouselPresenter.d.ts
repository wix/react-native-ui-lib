import { PropsWithChildren } from 'react';
import { CarouselProps, CarouselState } from './types';
export declare function getChildrenLength(props: PropsWithChildren<CarouselProps>): number;
export declare function calcOffset(props: CarouselProps, state: Omit<CarouselState, 'initialOffset' | 'prevProps' | 'currentStandingPage'>): {
    x: number;
    y: number;
};
export declare function calcPageIndex(offset: number, props: CarouselProps, pageSize: number): number;
export declare function isOutOfBounds(offset: number, props: CarouselProps, pageWidth: number): boolean;
