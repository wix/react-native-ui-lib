import { StyleProp, ViewStyle, NativeSyntheticEvent, NativeScrollEvent, PointPropType } from 'react-native';
import { PageControlProps } from '../pageControl';
export declare enum PageControlPosition {
    OVER = "over",
    UNDER = "under"
}
export interface CarouselProps {
    /**
     * the first page to start with
     */
    initialPage?: number;
    /**
     * the page width (all pages should have the same width). Does not work if passing 'loop' prop
     */
    pageWidth?: number;
    /**
     * the spacing between the items
     */
    itemSpacings?: number;
    /**
     * Horizontal margin for the container
     */
    containerMarginHorizontal?: number;
    /**
     * Vertical padding for the container.
     * Sometimes needed when there are overflows that are cut in Android.
     */
    containerPaddingVertical?: number;
    /**
     * if true, will have infinite scroll
     */
    loop?: boolean;
    /**
     * callback for when page has changed
     */
    onChangePage?: (newPageIndex: number, oldPageIndex: number) => void;
    /**
     * callback for onScroll event of the internal ScrollView
     */
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    /**
     * Should the container be animated (send the animation style via containerStyle)
     */
    animated?: boolean;
    /**
     * the carousel style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * PageControl component props
     */
    pageControlProps?: Partial<PageControlProps>;
    /**
     * The position of the PageControl component ['over', 'under'], otherwise it won't display
     */
    pageControlPosition?: PageControlPosition;
    /**
     * whether to show a page counter (will not work with 'pageWidth' prop)
     */
    showCounter?: boolean;
    /**
     * the counter's text style
     */
    counterTextStyle?: StyleProp<ViewStyle>;
    /**
     * will block multiple pages scroll (will not work with 'pageWidth' prop)
     */
    pagingEnabled?: boolean;
    /**
     * Whether to layout Carousel for accessibility
     */
    allowAccessibleLayout?: boolean;
    /**
     * Whether to switch automatically between the pages
     */
    autoplay?: boolean;
    /**
     * the amount of ms to wait before switching to the next page, in case autoplay is on
     */
    autoplayInterval?: number;
}
export interface CarouselState {
    containerWidth?: number;
    currentPage: number;
    currentStandingPage?: number;
    pageWidth: number;
    initialOffset: PointPropType;
    prevProps: CarouselProps;
}
