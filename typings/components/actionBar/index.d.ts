/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type ActionBarProps = {
    height?: number;
    backgroundColor?: string;
    actions?: any[];
    centered?: boolean;
    useSafeArea?: boolean;
    keepRelative?: boolean;
    style?: object | number | any[];
};
/**
 * @description: Quick actions bar, each action support Button component props
 * @modifiers: margin, padding
 * @gif: https://media.giphy.com/media/xULW8DwxkniFDMw7TO/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ActionBarScreen.js
 */
export default class ActionBar extends BaseComponent<ActionBarProps, {}> {
    static displayName: string;
    static defaultProps: {
        height: number;
        backgroundColor: any;
        useSafeArea: boolean;
    };
    generateStyles(): void;
    getAlignment(actionIndex: any): {
        left: boolean;
        center: any;
        right: boolean;
    };
    render(): JSX.Element;
}
export {};
