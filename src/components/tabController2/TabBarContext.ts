import React from 'react';
import Reanimated from 'react-native-reanimated';

interface TabControllerContext {
  initialIndex?: number;
  // DEPRECATED: use initialIndex instead
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

// @ts-expect-error
const TabBarContext = React.createContext<TabControllerContext>({});
export default TabBarContext;
