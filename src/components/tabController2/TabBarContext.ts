import React from 'react';

interface TabControllerContext {
  selectedIndex?: number;
  asCarousel?: boolean;
  containerWidth?: number;
  pageWidth?: number;
  currentPage?: any; // SharedValue<number>;
  carouselOffset?: any; // SharedValue<number>;
}

const TabBarContext = React.createContext<TabControllerContext>({});
export default TabBarContext;
