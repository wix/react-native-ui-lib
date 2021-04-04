import React, { PureComponent } from 'react';
import _ from 'lodash';
import Animated from 'react-native-reanimated';
/**
 * @description: TabController's Page Carousel
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: You must pass `asCarousel` flag to TabController and render your TabPages inside a PageCarousel
 */
declare class PageCarousel extends PureComponent {
    static displayName: string;
    static contextType: React.Context<{}>;
    carousel: React.RefObject<Animated.ScrollView>;
    onScroll: (...args: any[]) => void;
    componentDidMount(): void;
    onTabChange: ([index]: readonly number[]) => void;
    scrollToPage: (pageIndex: number) => void;
    renderCodeBlock: (() => JSX.Element) & _.MemoizedFunction;
    render(): JSX.Element;
}
export default PageCarousel;
