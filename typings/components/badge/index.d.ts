/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type BadgeProps = {
    label?: string;
    backgroundColor?: string;
    size?: "default" | "small";
    borderWidth?: number;
    borderColor?: string;
    containerStyle?: object;
    testId?: string;
};
/**
 * @description: Round colored badge, typically used to show a number
 * @extends: Animatable.View
 * @extendslink: https://github.com/oblador/react-native-animatable
 * @image: https://user-images.githubusercontent.com/33805983/34480753-df7a868a-efb6-11e7-9072-80f5c110a4f3.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BadgesScreen.js
 */
export default class Badge extends BaseComponent<BadgeProps, {}> {
    static displayName: string;
    static defaultProps: {
        size: string;
    };
    generateStyles(): void;
    getBadgeSizeStyle(): {
        width: number;
        height: number;
    };
    render(): JSX.Element;
}
export {};
