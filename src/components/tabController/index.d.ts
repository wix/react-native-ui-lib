import React from 'react';
import TabBar, { TabControllerBarProps } from './TabBar';
import TabBarItem, { TabControllerItemProps } from './TabBarItem';
import TabPage from './TabPage';
import PageCarousel from './PageCarousel';
import { TabControllerImperativeMethods } from './useImperativeTabControllerHandle';
export { TabControllerBarProps, TabControllerItemProps, TabControllerImperativeMethods };
interface TabControllerStatics {
    TabBar: typeof TabBar;
    TabBarItem: typeof TabBarItem;
    TabPage: typeof TabPage;
    PageCarousel: typeof PageCarousel;
}
export interface TabControllerProps {
    /**
     * The list of tab bar items
     */
    items: TabControllerItemProps[];
    /**
     * Initial selected index
     */
    initialIndex?: number;
    /**
     * callback for when index has change (will not be called on ignored items)
     */
    onChangeIndex?: (index: number, prevIndex: number | null) => void;
    /**
     * When using TabController.PageCarousel this should be turned on
     */
    asCarousel?: boolean;
    /**
     * Pass when TabController is render inside a ScrollView (with a header)
     */
    nestedInScrollView?: boolean;
    /**
     * Pass for custom carousel page width
     */
    carouselPageWidth?: number;
    /**
     * Send if a SafeView is used in the context of the TabController.
     */
    useSafeArea?: boolean;
    children?: React.ReactNode;
}
declare const _default: React.ForwardRefExoticComponent<TabControllerProps & {
    children?: React.ReactNode;
} & React.RefAttributes<any>> & TabControllerStatics;
export default _default;
