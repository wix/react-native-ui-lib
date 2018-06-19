/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type ListItemPartProps = {
    left?: boolean;
    middle?: boolean;
    right?: boolean;
    row?: boolean;
    column?: boolean;
    containerStyle?: object | number | any[];
    testId?: string;
};
/**
 * @description: ListItem.Part, a sub ListItem component for layout-ing inside a ListItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/listScreens/BasicListScreen.js
 */
export default class ListItemPart extends BaseComponent<ListItemPartProps, {}> {
    static displayName: string;
    generateStyles(): void;
    render(): JSX.Element;
}
export {};
