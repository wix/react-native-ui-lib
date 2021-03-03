import React, { Component, ElementRef, RefObject } from 'react';
import { ScrollView, StyleProp, ViewStyle, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ScrollBarProps } from '../scrollBar';
import TabBarItem, { TabBarItemProps } from './TabBarItem';
export declare type TabBarProps = ScrollBarProps & {
    /**
     * Show Tab Bar bottom shadow
     */
    enableShadow?: boolean;
    /**
     * The minimum number of tabs to render in scroll mode
     */
    minTabsForScroll?: number;
    /**
     * current selected tab index
     */
    selectedIndex?: number;
    /**
     * callback for when index has change (will not be called on ignored items)
     */
    onChangeIndex?: (index: number) => void;
    /**
     * callback for when tab selected
     */
    onTabSelected?: (index: number) => void;
    /**
     * custom style for the selected indicator
     */
    indicatorStyle?: StyleProp<ViewStyle>;
    /**
     * Tab Bar height
     */
    height?: number;
    /**
     * Pass when container width is different than the screen width
     */
    containerWidth?: number;
    /**
     * The background color
     */
    backgroundColor?: string;
    /**
     * set darkTheme style
     */
    darkTheme?: boolean;
    children?: React.ReactNode;
    style?: ViewStyle;
    testID?: string;
};
interface State {
    scrollEnabled: boolean;
    currentIndex: number;
}
/**
 * @description: TabBar Component
 * @modifiers: alignment, flex, padding, margin, background, typography, color (list of supported modifiers)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabBarScreen.tsx
 * @extends: ScrollBar
 * @extendsLink:https://github.com/wix/react-native-ui-lib/blob/master/src/components/scrollBar/index.js
 * @notes: This is screen width component.
 */
declare class TabBar extends Component<TabBarProps, State> {
    static displayName: string;
    static defaultProps: Partial<TabBarProps>;
    static Item: React.ComponentClass<TabBarItemProps & {
        useCustomTheme?: boolean | undefined;
    }, any>;
    scrollContentWidth?: number;
    contentOffset: {
        x: number;
        y: number;
    };
    scrollBar: RefObject<ScrollView>;
    itemsRefs: ElementRef<typeof TabBarItem>[];
    constructor(props: TabBarProps);
    componentDidUpdate(prevProps: TabBarProps, prevState: State): void;
    get childrenCount(): number;
    get scrollContainerWidth(): number;
    isIgnored(index: number): any;
    hasOverflow(): boolean | 0 | undefined;
    shouldBeMarked: (index: number) => boolean;
    updateIndicator(index?: number): void;
    scrollToSelected(animated?: boolean): void;
    onChangeIndex(index: number): void;
    onTabSelected(index: number): void;
    onItemPress: (index: number, props: TabBarItemProps) => void;
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onContentSizeChange: (width: number) => void;
    renderTabBar(): JSX.Element;
    renderChildren(): React.DetailedReactHTMLElement<any, HTMLElement>[] | null | undefined;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<ScrollBarProps & {
    /**
     * Show Tab Bar bottom shadow
     */
    enableShadow?: boolean | undefined;
    /**
     * The minimum number of tabs to render in scroll mode
     */
    minTabsForScroll?: number | undefined;
    /**
     * current selected tab index
     */
    selectedIndex?: number | undefined;
    /**
     * callback for when index has change (will not be called on ignored items)
     */
    onChangeIndex?: ((index: number) => void) | undefined;
    /**
     * callback for when tab selected
     */
    onTabSelected?: ((index: number) => void) | undefined;
    /**
     * custom style for the selected indicator
     */
    indicatorStyle?: StyleProp<ViewStyle>;
    /**
     * Tab Bar height
     */
    height?: number | undefined;
    /**
     * Pass when container width is different than the screen width
     */
    containerWidth?: number | undefined;
    /**
     * The background color
     */
    backgroundColor?: string | undefined;
    /**
     * set darkTheme style
     */
    darkTheme?: boolean | undefined;
    children?: React.ReactNode;
    style?: ViewStyle | undefined;
    testID?: string | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof TabBar;
export default _default;
