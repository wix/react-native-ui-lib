import React from 'react';
import Reanimated from 'react-native-reanimated';

interface TabControllerContext {
  initialIndex?: number;
  items?: any[];
  itemsCount: number;
  asCarousel?: boolean;
  nestedInScrollView?: boolean;
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
