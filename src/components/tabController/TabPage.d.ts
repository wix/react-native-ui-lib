import React, { PropsWithChildren } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
     * How long to wait till lazy load complete (good for showing loader screens and when loading big pages)
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
    /**
     * add style properties to tab page
     */
    style?: StyleProp<ViewStyle>;
}
/**
 * @description: TabController's TabPage
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 */
export default function TabPage({ testID, index, lazy, renderLoading, style, lazyLoadTime, ...props }: PropsWithChildren<TabControllerPageProps>): React.JSX.Element;
