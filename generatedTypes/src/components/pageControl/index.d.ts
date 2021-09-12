import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface PageControlProps {
    /**
     * Limit the number of page indicators shown.
     * enlargeActive prop is disabled in this state,
     * When set to true there will be maximum of 7 shown.
     * Only relevant when numOfPages > 5.
     */
    limitShownPages?: boolean;
    /**
     * Additional styles for the top container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Total number of pages
     */
    numOfPages: number;
    /**
     * Zero-based index of the current page
     */
    currentPage: number;
    /**
     * Action handler for clicking on a page indicator
     */
    onPagePress?: (index: number) => void;
    /**
     * Color of the selected page dot and, if inactiveColor not passed, the border of the not selected pages
     */
    color?: string;
    /**
     * Color of the unselected page dots and the border of the not selected pages
     */
    inactiveColor?: string;
    /**
     * The size of the page indicator.
     * When setting limitShownPages the medium sized will be 2/3 of size and the small will be 1/3 of size.
     * An alternative is to send an array [smallSize, mediumSize, largeSize].
     */
    size?: number | [number, number, number];
    /**
     * Whether to enlarge the active page indicator
     * Irrelevant when limitShownPages is in effect.
     */
    enlargeActive?: boolean;
    /**
     * The space between the siblings page indicators
     */
    spacing?: number;
    /**
     * Used to identify the pageControl in tests
     */
    testID?: string;
}
declare const _default: React.ComponentClass<PageControlProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
