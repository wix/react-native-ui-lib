import React from 'react';

interface TabControllerContext {
  items?: any[];
  itemStates: any[];
  selectedIndex?: number;
  asCarousel?: boolean;
  containerWidth?: number;
  pageWidth?: number;
  currentPage?: any; // SharedValue<number>;
  targetPage?: any; // SharedValue<number>;
  carouselOffset?: any; // SharedValue<number>;
}

const TabBarContext = React.createContext<TabControllerContext>({});
export default TabBarContext;
