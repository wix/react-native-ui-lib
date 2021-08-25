import React, { PropsWithChildren } from 'react';
import { TabControllerItemProps } from './TabBarItem';
export { TabControllerItemProps };
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
     * DEPRECATED: use initialIndex instead
     */
    selectedIndex?: number;
    /**
     * callback for when index has change (will not be called on ignored items)
     */
    onChangeIndex?: (index: number, prevIndex: number | null) => void;
    /**
     * When using TabController.PageCarousel this should be turned on
     */
    asCarousel?: boolean;
    /**
     * Pass for custom carousel page width
     */
    carouselPageWidth?: number;
}
/**
 * @description: A performant solution for a tab controller with lazy load mechanism
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: This component is based on react-native-gesture-handler
 * @important: On Android, if using react-native-navigation, make sure to wrap your screen with gestureHandlerRootHOC
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 */
declare function TabController({ initialIndex, selectedIndex, asCarousel, items, onChangeIndex, carouselPageWidth, children }: PropsWithChildren<TabControllerProps>): JSX.Element;
declare namespace TabController {
    var TabBar: React.ComponentClass<import("./TabBar").TabControllerBarProps & {
        useCustomTheme?: boolean | undefined;
    }, any>;
    var TabBarItem: typeof import("./TabBarItem").default;
    var TabPage: typeof import("./TabPage").default;
    var PageCarousel: typeof import("./PageCarousel").default;
}
declare const _default: React.ComponentClass<TabControllerProps & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof TabController;
export default _default;
