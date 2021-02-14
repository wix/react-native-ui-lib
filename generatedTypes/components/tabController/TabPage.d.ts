import React, { PureComponent } from 'react';
import Reanimated from 'react-native-reanimated';
import _ from 'lodash';
export interface TabControllerPageProps {
    /**
     * The index of the the TabPage
     */
    index: number;
    /**
     * Whether this page should be loaded lazily
     */
    lazy?: boolean;
    /**
     * How long to wait till lazy load complete (good for showing loader screens)
     */
    lazyLoadTime?: number;
    /**
     * Render a custom loading page when lazy loading
     */
    renderLoading?: () => JSX.Element;
    /**
     * Used as a testing identifier
     */
    testID?: string;
}
/**
 * @description: TabController's TabPage
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 */
export default class TabPage extends PureComponent<TabControllerPageProps> {
    static displayName: string;
    static contextType: React.Context<{}>;
    static defaultProps: {
        lazy: boolean;
        activeOpacity: number;
        lazyLoadTime: number;
        renderLoading: (...args: any[]) => void;
    };
    state: {
        loaded: boolean;
    };
    _loaded: Reanimated.Value<number>;
    _opacity: Reanimated.Value<0>;
    _zIndex: Reanimated.Value<0>;
    _pageStyle: ({
        position: "absolute";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    } | {
        width: number;
        flex: number;
        opacity: number;
    } | {
        opacity: Reanimated.Value<0>;
        width?: undefined;
        zIndex?: undefined;
    } | {
        width: any;
        opacity?: undefined;
        zIndex?: undefined;
    } | {
        zIndex: Reanimated.Value<0>;
        opacity?: undefined;
        width?: undefined;
    } | undefined)[];
    lazyLoad: () => void;
    renderCodeBlock: (() => JSX.Element) & _.MemoizedFunction;
    render(): JSX.Element;
}
