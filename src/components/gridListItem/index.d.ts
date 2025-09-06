import React, { Component } from 'react';
import { type DimensionValue, StyleProp, ViewStyle } from 'react-native';
import { ViewProps } from '../view';
import { TouchableOpacityProps } from '../touchableOpacity';
import { type TextProps } from '../text';
import { ImageProps } from '../image';
export declare enum HorizontalAlignment {
    left = "left",
    center = "center",
    right = "right"
}
export interface GridListItemProps {
    /**
     * Image props object for rendering an image item
     */
    imageProps?: ImageProps;
    /**
     * Props to pass on to the touchable container
     */
    containerProps?: Omit<TouchableOpacityProps | ViewProps, 'style'>;
    /**
     * Custom GridListItem to be rendered in the GridView
     */
    renderCustomItem?: () => React.ReactElement;
    /**
     * The item size
     */
    itemSize?: number | ImageSize;
    /**
     * Title content text
     */
    title?: string | React.ReactElement;
    /**
     * Title content typography
     */
    titleTypography?: string;
    /**
     * Title content color
     */
    titleColor?: string;
    /**
     * Title content number of lines
     */
    titleLines?: number;
    /**
     * Subtitle content text
     */
    subtitle?: string | React.ReactElement;
    /**
     * Subtitle content typography
     */
    subtitleTypography?: string;
    /**
     * Subtitle content color
     */
    subtitleColor?: string;
    /**
     * Subtitle content number of lines
     */
    subtitleLines?: number;
    /**
     * Description content text
     */
    description?: string | React.ReactElement;
    /**
     * Description content typography
     */
    descriptionTypography?: string;
    /**
     * Description content color
     */
    descriptionColor?: string;
    /**
     * Description content number of lines
     */
    descriptionLines?: number;
    /**
     * Renders the title, subtitle and description inside the item
     */
    overlayText?: boolean;
    /**
     * Custom container styling for inline text
     */
    overlayTextContainerStyle?: StyleProp<ViewStyle>;
    /**
     * Should content be align to start (default is center)
     */
    alignToStart?: boolean;
    /**
     * Content horizontal alignment (default is center)
     */
    horizontalAlignment?: HorizontalAlignment | `${HorizontalAlignment}`;
    /**
     * Custom container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * The item's action handler
     */
    onPress?: TouchableOpacityProps['onPress'];
    /**
     * Renders an overlay on top of the image
     */
    renderOverlay?: () => React.ReactElement;
    /**
     * Test ID for component
     */
    testID?: string;
    children?: React.ReactElement | React.ReactElement[];
}
/**
 * @description: A single grid view/list item component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx
 */
declare class GridListItem extends Component<GridListItemProps> {
    static displayName: string;
    static horizontalAlignment: typeof HorizontalAlignment;
    static defaultProps: {
        itemSize: number;
    };
    state: {};
    onItemPress: () => void;
    getItemSizeObj(): ImageSize;
    getContainerHorizontalAlignment: (this: any, horizontalAlignment: any) => "center" | "flex-start" | "flex-end" | undefined;
    renderContent(text: string | React.ReactElement | undefined, textProps: Partial<TextProps>): React.JSX.Element | undefined;
    render(): React.JSX.Element;
}
export default GridListItem;
interface ImageSize {
    width?: DimensionValue;
    height?: DimensionValue;
}
