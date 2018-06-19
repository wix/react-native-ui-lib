/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type CardProps = {
    width?: number | string;
    height?: number | string;
    row?: boolean;
    borderRadius?: number;
    onPress?: (...args: any[]) => any;
    enableShadow?: boolean;
    elevation?: number;
    containerStyle?: object | number | any[];
    testID?: string;
};
/**
 * @description: Card component
 * @extends: TouchableOpacity
 * @extendsnotes: (when passing onPress)
 * @extendslink: docs/TouchableOpacity
 * @modifiers: margin, padding
 * @gif: https://media.giphy.com/media/l0HU9SKWmv0VTOYMM/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
declare class Card extends BaseComponent<CardProps, {}> {
    static displayName: string;
    static defaultProps: {
        borderRadius: any;
        enableShadow: boolean;
    };
    generateStyles(): void;
    calcImagePosition(childIndex: any): any[];
    readonly elevationStyle: {
        elevation: any;
    };
    renderChildren(): any;
    render(): JSX.Element;
}
export default Card;
