import React from 'react';
import TabBar from './TabBar';
import TabBarItem, { TabBarItemProps } from './TabBarItem';
import TabPage from './TabPage';
import PageCarousel from './PageCarousel';
export { TabBarItemProps };
export interface TabControllerProps {
    /**
     * The list of tab bar items
     */
    items: TabBarItemProps[];
    /**
     * Initial selected index
     */
    selectedIndex: number;
    /**
     * callback for when index has change (will not be called on ignored items)
     */
    onChangeIndex: (index: number) => void;
    /**
     * When using TabController.PageCarousel this should be turned on
     */
    asCarousel?: boolean;
    /**
     * Pass for custom carousel page width
     */
    carouselPageWidth?: number;
}
declare const _default: React.ComponentClass<TabControllerProps & {
    useCustomTheme?: boolean | undefined;
}, any> & {
    TabBar: typeof TabBar;
    TabBarItem: typeof TabBarItem;
    TabPage: typeof TabPage;
    PageCarousel: typeof PageCarousel;
};
export default _default;
