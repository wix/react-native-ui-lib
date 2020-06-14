import React from 'react';
import { ViewStyle, ImageSourcePropType } from 'react-native';
import { ViewPropTypes } from '../view';
import { TextPropTypes } from '../text';
import { ImageProps } from '../image';
import { OverlayTypeType } from '../overlay';
declare type ContentType = TextPropTypes & {
    text?: string;
};
export declare type CardSectionProps = ViewPropTypes & {
    /**
     * Text content for the CardSection.
     * Example: content={[{text: 'You’re Invited!', text70: true, dark10: true}]}
     */
    content?: ContentType[];
    /**
     * Style for the content
     */
    contentStyle?: ViewStyle;
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
     * The type of overly to place on top of the image. Note: the image MUST have proper size, see examples in:
     * https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/OverlaysScreen.js
     */
    overlayType?: OverlayTypeType;
    /**
     * The style for the background image
     */
    imageStyle?: ViewStyle;
};
declare const _default: React.ComponentClass<CardSectionProps, any> | React.FunctionComponent<CardSectionProps>;
export default _default;
