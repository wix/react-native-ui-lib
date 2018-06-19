/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type CardImageProps = {
    imageSource?: object | number;
    width?: number | string;
    height?: number | string;
    position?: string | string[];
    borderRadius?: number;
    testID?: string;
};
/**
 * @description: Card.Image, part of the Card component belongs inside a Card (better be a direct child)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
export default class CardImage extends BaseComponent<CardImageProps, {}> {
    static displayName: string;
    static defaultProps: {
        borderRadius: any;
    };
    generateStyles(): void;
    render(): JSX.Element;
}
export {};
