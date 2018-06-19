/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type PageControlProps = {
    containerStyle?: object | number | any[];
    numOfPages?: number;
    currentPage?: number;
    onPagePress?: (...args: any[]) => any;
    color?: string;
    inactiveColor?: string;
    size?: number;
    enlargeActive?: boolean;
    spacing?: number;
};
/**
 * @description: Page indicator, typically used in paged scroll-views
 * @image: https://user-images.githubusercontent.com/33805983/34663655-76698110-f460-11e7-854b-243d27f66fec.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PageControlScreen.js
 */
export default class PageControl extends BaseComponent<PageControlProps, {}> {
    static displayName: string;
    static defaultProps: {
        size: number;
        spacing: number;
        enlargeActive: boolean;
    };
    render(): JSX.Element;
}
export {};
