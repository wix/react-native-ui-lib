import React from 'react';
import Reanimated from 'react-native-reanimated';
interface TabControllerContext {
    selectedIndex?: number;
    items?: any[];
    asCarousel?: boolean;
    containerWidth: Reanimated.SharedValue<number>;
    pageWidth?: number;
    /** static page index */
    currentPage: Reanimated.SharedValue<number>;
    /** transition page index (can be a fraction when transitioning between pages) */
    targetPage: Reanimated.SharedValue<number>;
    carouselOffset: Reanimated.SharedValue<number>;
}
declare const TabBarContext: React.Context<TabControllerContext>;
export default TabBarContext;
