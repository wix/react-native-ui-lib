import React from 'react';
import { ViewStyle, ImageStyle, ImageSourcePropType, StyleProp } from 'react-native';
import { ViewProps } from '../view';
import { TextProps } from '../text';
import { ImageProps } from '../image';
declare type ContentType = TextProps & {
    text?: string;
};
export declare type CardSectionProps = ViewProps & {
    /**
     * Text content for the CardSection.
     * Example: content={[{text: 'You’re Invited!', text70: true, grey10: true}]}
     */
    content?: ContentType[];
    /**
     * Style for the content
     */
    contentStyle?: StyleProp<ViewStyle>;
    /**
     * Give the section a background color
     */
    backgroundColor?: string;
    /**
     * Image props for a leading icon to render before the text
     */
    leadingIcon?: ImageProps;
    /**
     * Image props for a trailing icon to render after the text
     */
    trailingIcon?: ImageProps;
    /**
     * Will be used for the background when provided
     */
    imageSource?: ImageSourcePropType;
    /**
     * The style for the background image
     */
    imageStyle?: StyleProp<ImageStyle>;
    /**
     * Other image props that will be passed to the image
     */
    imageProps?: Partial<ImageProps>;
};
declare const _default: React.ComponentClass<ViewProps & {
    /**
     * Text content for the CardSection.
     * Example: content={[{text: 'You’re Invited!', text70: true, grey10: true}]}
     */
    content?: ContentType[] | undefined;
    /**
     * Style for the content
     */
    contentStyle?: StyleProp<ViewStyle>;
    /**
     * Give the section a background color
     */
    backgroundColor?: string | undefined;
    /**
     * Image props for a leading icon to render before the text
     */
    leadingIcon?: ImageProps | undefined;
    /**
     * Image props for a trailing icon to render after the text
     */
    trailingIcon?: ImageProps | undefined;
    /**
     * Will be used for the background when provided
     */
    imageSource?: ImageSourcePropType | undefined;
    /**
     * The style for the background image
     */
    imageStyle?: StyleProp<ImageStyle>;
    /**
     * Other image props that will be passed to the image
     */
    imageProps?: Partial<ImageProps> | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
