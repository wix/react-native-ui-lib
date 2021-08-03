import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
declare enum Template {
    LIST_ITEM = "listItem",
    TEXT_CONTENT = "content"
}
declare enum Size {
    SMALL = "small",
    LARGE = "large"
}
declare enum ContentType {
    AVATAR = "avatar",
    THUMBNAIL = "thumbnail"
}
interface SkeletonProps {
    /**
     * The content has been loaded, start fading out the skeleton and fading in the content
     */
    showContent?: boolean;
    /**
     * A function that will render the content once the content is ready (i.e. showContent is true).
     * The method will be called with the Skeleton's props (i.e. renderContent(props))
     */
    renderContent?: (props: SkeletonProps) => React.ReactNode;
    /**
     * The type of the skeleton view.
     * Types: LIST_ITEM and TEXT_CONTENT (using SkeletonView.templates.###)
     */
    template?: Template;
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
declare const _default: React.ComponentClass<SkeletonProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
