import React, { Component } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ViewProps } from '../view';
import { TouchableOpacityProps } from '../touchableOpacity';
import { ImageProps } from '../image';
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
}
interface RenderContentType {
    text?: string | React.ReactElement;
    typography?: string;
    color?: string;
    numberOfLines?: number;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
/**
 * @description: A single grid view/list item component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx
 */
declare class GridListItem extends Component<GridListItemProps> {
    static displayName: string;
    static defaultProps: {
        itemSize: number;
    };
    state: {};
    onItemPress: () => void;
    getItemSizeObj(): ImageSize;
    renderContent({ text, typography, color, numberOfLines, style, testID }: RenderContentType): JSX.Element | undefined;
    render(): JSX.Element;
}
export default GridListItem;
interface ImageSize {
    width?: number;
    height?: number;
}
