import React from 'react';
import Reanimated from 'react-native-reanimated';

interface TabControllerContext {
  initialIndex?: number;
  // DEPRECATED: use initialIndex instead
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
  /* carouselOffset: Reanimated.SharedValue<number>; */
  setCurrentIndex: (index: number) => void;
}

// @ts-expect-error
const TabBarContext = React.createContext<TabControllerContext>({});
export default TabBarContext;
