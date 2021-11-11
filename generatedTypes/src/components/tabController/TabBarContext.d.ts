import React from 'react';
import Reanimated from 'react-native-reanimated';
interface TabControllerContext {
    initialIndex?: number;
    selectedIndex?: number;
    items?: any[];
    itemsCount: number;
    asCarousel?: boolean;
    containerWidth: number;
    pageWidth: number;
    /** static page index */
    currentPage: Reanimated.SharedValue<number>;
    /** transition page index (can be a fraction when transitioning between pages) */
    targetPage: Reanimated.SharedValue<number>;
    setCurrentIndex: (index: number) => void;
}
declare const TabBarContext: React.Context<TabControllerContext>;
export default TabBarContext;
