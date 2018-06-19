/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type TextProps = {
    color?: string;
    center?: boolean;
    testID?: string;
};
/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendslink: https://facebook.github.io/react-native/docs/text.html
 * @modifiers: margins, color, typography
 */
export default class Text extends BaseComponent<TextProps, {}> {
    static displayName: string;
    generateStyles(): void;
    setNativeProps(nativeProps: any): void;
    render(): JSX.Element;
    measure(...args: any[]): void;
    measureInWindow(...args: any[]): void;
}
export {};
