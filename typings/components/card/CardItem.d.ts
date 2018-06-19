/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type CardItemProps = {
    row?: boolean;
    column?: boolean;
};
/**
 * @description: Card.Item, a sub Card component for layout-ing inside a card
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
export default class CardItem extends BaseComponent<CardItemProps, {}> {
    static displayName: string;
    static defaultProps: {
        row: boolean;
    };
    generateStyles(): void;
    render(): JSX.Element;
}
export {};
