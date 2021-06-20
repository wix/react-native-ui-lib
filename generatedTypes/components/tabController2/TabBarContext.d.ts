import React from 'react';
import Reanimated from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';
interface TabControllerContext {
    selectedIndex?: number;
    items?: any[];
    itemStates: Reanimated.SharedValue<State[]>;
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
