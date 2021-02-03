import React, { Component } from 'react';
import _ from 'lodash';
import TabBar from './TabBar';
import TabBarItem, { TabControllerItemProps } from './TabBarItem';
import TabPage from './TabPage';
import PageCarousel from './PageCarousel';
export { TabControllerItemProps };
export interface TabControllerProps {
    /**
     * The list of tab bar items
     */
    items: TabControllerItemProps[];
    /**
     * Initial selected index
     */
    selectedIndex: number;
    /**
     * callback for when index has change (will not be called on ignored items)
     */
    onChangeIndex?: (index: number) => void;
    /**
     * When using TabController.PageCarousel this should be turned on
     */
    asCarousel?: boolean;
    /**
     * Pass for custom carousel page width
     */
    carouselPageWidth?: number;
}
interface StateProps {
    selectedIndex: number;
    asCarousel?: boolean;
    pageWidth: number;
    items: TabControllerProps['items'];
    itemStates: any[];
    ignoredItems: any[];
    targetPage: any;
    currentPage: any;
    carouselOffset: any;
    containerWidth: any;
    registerTabItems: (tabItemsCount: number, ignoredItems: StateProps['ignoredItems']) => void;
    onChangeIndex?: (index: number) => void;
}
/**
 * @description: A performant solution for a tab controller with lazy load mechanism
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: This component is based on react-native-gesture-handler
 * @important: On Android, if using react-native-navigation, make sure to wrap your screen with gestureHandlerRootHOC
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 */
declare class TabController extends Component<TabControllerProps, StateProps> {
    static displayName: string;
    static contextType: React.Context<{}>;
    static TabBar: typeof TabBar;
    static TabBarItem: typeof TabBarItem;
    static TabPage: typeof TabPage;
    static PageCarousel: typeof PageCarousel;
    static defaultProps: {
        selectedIndex: number;
        activeOpacity: number;
    };
    constructor(props: TabControllerProps);
    static getDerivedStateFromProps(nextProps: TabControllerProps, prevState: StateProps): {
        pageWidth: number;
    } | null;
    componentDidUpdate(_prevProps: TabControllerProps, prevState: StateProps): void;
    get pageWidth(): number;
    registerTabItems: (tabItemsCount: number, ignoredItems: StateProps['ignoredItems']) => void;
    onPageChange: ([index]: readonly number[]) => void;
    renderCodeBlock: (() => JSX.Element) & _.MemoizedFunction;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<TabControllerProps & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof TabController;
export default _default;
