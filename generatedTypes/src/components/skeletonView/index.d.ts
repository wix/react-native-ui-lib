import React, { Component } from 'react';
import { Animated, StyleProp, ViewStyle, AccessibilityProps } from 'react-native';
export declare enum Template {
    LIST_ITEM = "listItem",
    TEXT_CONTENT = "content"
}
export declare enum Size {
    SMALL = "small",
    LARGE = "large"
}
export declare enum ContentType {
    AVATAR = "avatar",
    THUMBNAIL = "thumbnail"
}
export interface SkeletonListProps {
    /**
     * The size of the skeleton view.
     * Types: SMALL and LARGE (using SkeletonView.sizes.###)
     */
    size?: Size;
    /**
     * Add content to the skeleton.
     * Types: AVATAR and THUMBNAIL (using SkeletonView.contentTypes.###)
     */
    contentType?: ContentType;
    /**
     * Whether to hide the list item template separator
     */
    hideSeparator?: boolean;
    /**
     * Whether to show the last list item template separator
     */
    showLastSeparator?: boolean;
    /**
     * Extra content to be rendered on the end of the list item
     */
    renderEndContent?: () => React.ReactElement | undefined;
}
export interface SkeletonViewProps extends AccessibilityProps {
    /**
     * The content has been loaded, start fading out the skeleton and fading in the content
     */
    showContent?: boolean;
    /**
     * A function that will render the content once the content is ready (i.e. showContent is true).
     * The method will be called with the Skeleton's customValue (i.e. renderContent(props?.customValue))
     */
    renderContent?: (customValue?: any) => React.ReactNode;
    /**
     * Custom value of any type to pass on to SkeletonView and receive back in the renderContent callback.
     */
    customValue?: any;
    /**
     * @deprecated
     * - Please use customValue instead.
     * - Custom value of any type to pass on to SkeletonView and receive back in the renderContent callback.
     */
    contentData?: any;
    /**
     * The type of the skeleton view.
     * Types: LIST_ITEM and TEXT_CONTENT (using SkeletonView.templates.###)
     */
    template?: Template;
    /**
     * Props that are available when using template={SkeletonView.templates.LIST_ITEM}
     */
    listProps?: SkeletonListProps;
    /**
     * An object that holds the number of times the skeleton will appear, and (optionally) the key.
     * The key will actually be `${key}-${index}` if a key is given or `${index}` if no key is given.
     * IMPORTANT: your data (i.e. children \ renderContent) will NOT be duplicated.
     * Note: testID will be `${testID}-${index}`
     */
    times?: number;
    /**
     * A key for the duplicated SkeletonViews.
     * This is needed because the `key` prop is not accessible.
     */
    timesKey?: string;
    /**
     * @deprecated
     * - Pass via listProps instead.
     * - The size of the skeleton view.
     * - Types: SMALL and LARGE (using SkeletonView.sizes.###)
     */
    size?: Size;
    /**
     * @deprecated
     * - Pass via listProps instead.
     * - Add content to the skeleton.
     * - Types: AVATAR and THUMBNAIL (using SkeletonView.contentTypes.###)
     */
    contentType?: ContentType;
    /**
     * @deprecated
     * - Pass via listProps instead.
     * - Whether to hide the list item template separator
     */
    hideSeparator?: boolean;
    /**
     * @deprecated
     * - Pass via listProps instead.
     * - Whether to show the last list item template separator
     */
    showLastSeparator?: boolean;
    /**
     * The height of the skeleton view
     */
    height?: number;
    /**
     * The width of the skeleton view
     */
    width?: number;
    /**
     * The border radius of the skeleton view
     */
    borderRadius?: number;
    /**
     * Whether the skeleton is a circle (will override the borderRadius)
     */
    circle?: boolean;
    /**
     * Override container styles
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Used to locate this view in end-to-end tests
     */
    testID?: string;
}
interface SkeletonState {
    isAnimating: boolean;
    opacity: Animated.Value;
}
/**
 * @description: Allows showing a temporary skeleton view while your real view is loading.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SkeletonViewScreen.tsx
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Skeleton/Skeleton.gif?raw=true
 * @notes: View requires installing the 'react-native-shimmer-placeholder' and 'react-native-linear-gradient' library
 */
declare class SkeletonView extends Component<SkeletonViewProps, SkeletonState> {
    static defaultProps: {
        size: Size;
        borderRadius: number;
    };
    static templates: typeof Template;
    static sizes: typeof Size;
    static contentTypes: typeof ContentType;
    fadeInAnimation?: Animated.CompositeAnimation;
    constructor(props: SkeletonViewProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: SkeletonViewProps): void;
    fade(isFadeIn: boolean, onAnimationEnd?: Animated.EndCallback): Animated.CompositeAnimation;
    showChildren: () => void;
    getAccessibilityProps: (accessibilityLabel: any) => {
        accessible: boolean;
        accessibilityLabel: any;
    };
    getDefaultSkeletonProps: (input?: {
        circleOverride: boolean;
        style: StyleProp<ViewStyle>;
    } | undefined) => {
        shimmerColors: string[];
        isReversed: boolean;
        style: StyleProp<ViewStyle>[];
        width: number;
        height: number;
    };
    get size(): Size | undefined;
    get contentSize(): 48 | 40;
    get contentType(): ContentType | undefined;
    get hideSeparator(): boolean | undefined;
    get showLastSeparator(): boolean | undefined;
    renderListItemLeftContent: () => JSX.Element | undefined;
    renderStrip: (isMain: boolean, length: number, marginTop: number) => JSX.Element;
    renderListItemContentStrips: () => JSX.Element;
    renderListItemTemplate: () => JSX.Element;
    renderTextContentTemplate: () => JSX.Element;
    renderTemplate: () => JSX.Element;
    renderAdvanced: () => JSX.Element;
    renderWithFading: (skeleton: any) => React.ReactNode;
    renderSkeleton(): React.ReactNode;
    renderNothing: () => null;
    render(): React.ReactNode;
}
declare const _default: React.ComponentClass<SkeletonViewProps & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof SkeletonView;
export default _default;
