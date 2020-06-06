import { PureComponent } from 'react';
import { ImageSourcePropType, ViewProps } from 'react-native';
import { ImageProps } from '../image';
export declare type CardImagePropTypes = ViewProps & ImageProps & {
    /**
     * Image source, either remote source or local. Note: for remote pass object {uri: <remote_uri_string>}
     */
    imageSource?: ImageSourcePropType;
    /**
     * Image width
     */
    width?: number | string;
    /**
     * Image height
     */
    height?: number | string;
    /**
     * The Image position which determines the appropriate flex-ness of the image and border radius (for Android)
     * this prop derived automatically from Card parent component if it rendered as a direct child of the
     * Card component
     */
    position?: string[];
    /**
     * border radius, basically for Android since overflow doesn't work well
     */
    borderRadius?: number;
};
/**
 * @description: Card.Image, part of the Card component belongs inside a Card (better be a direct child)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
declare class CardImage extends PureComponent<CardImagePropTypes> {
    styles: any;
    static displayName: string;
    static defaultProps: {
        borderRadius: number;
    };
    constructor(props: CardImagePropTypes);
    render(): JSX.Element | null;
}
export default CardImage;
