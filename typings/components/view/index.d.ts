/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type ViewProps = {
    useSafeArea?: boolean;
};
/**
 * @description: Wrapper component for React Native View component
 * @extends: View
 * @extendslink: https://facebook.github.io/react-native/docs/view.html
 * @modifiers: margins, paddings, alignments, background, borderRadius
 */
export default class View extends BaseComponent<ViewProps, {}> {
    static displayName: string;
    generateStyles(): void;
    setNativeProps(nativeProps: any): void;
    renderView(): JSX.Element;
    render(): JSX.Element;
    measure(...args: any[]): void;
    measureInWindow(...args: any[]): void;
}
export {};
