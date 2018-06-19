/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type TabBarItemProps = {
    label?: string;
    labelStyle?: any;
    maxLines?: number;
    selectedLabelStyle?: any;
    selected?: boolean;
    onPress?: (...args: any[]) => any;
    showDivider?: boolean;
    width?: number;
    onLayout?: (...args: any[]) => any;
};
declare type TabBarItemState = {
    fontStyle: any;
};
/**
 * @description: TabBar.Item, inner component of TabBar for configuring the tabs
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabBarScreen.js
 */
export default class TabBarItem extends BaseComponent<TabBarItemProps, TabBarItemState> {
    static displayName: string;
    static defaultProps: {
        maxLines: number;
    };
    constructor(props: any);
    getFontStyle(props: any): any;
    generateStyles(): void;
    onLayout: (event: any) => void;
    render(): JSX.Element;
}
export {};
