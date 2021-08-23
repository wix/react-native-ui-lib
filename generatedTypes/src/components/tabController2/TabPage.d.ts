import { PropsWithChildren } from 'react';
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
export default function TabPage({ testID, index, lazy, renderLoading, ...props }: PropsWithChildren<TabControllerPageProps>): JSX.Element;
