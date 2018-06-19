/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type CardSectionProps = {
    enableBlur?: boolean;
    blurOptions?: object;
    body?: boolean;
    footer?: boolean;
    testId?: string;
};
/**
 * @description: Card.Section, a sub Card component for layout-ing inside a card
 * @extends: BlurView
 * @extendsnotes: (iOS only)
 * @extendslink: https://github.com/react-native-community/react-native-blur/blob/master/src/BlurView.ios.js
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
export default class CardSection extends BaseComponent<CardSectionProps, {}> {
    static displayName: string;
    generateStyles(): void;
    render(): JSX.Element;
}
export {};
