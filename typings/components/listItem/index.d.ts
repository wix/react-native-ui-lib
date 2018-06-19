/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type ListItemProps = {
    height?: number | string;
    onPress?: (...args: any[]) => any;
    onLongPress?: (...args: any[]) => any;
    containerStyle?: object | number;
    containerElement?: (...args: any[]) => any;
    testID?: string;
};
declare type ListItemState = {
    pressed: boolean;
};
/**
 * @description: List item component to render inside a ListView component
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @gif: https://media.giphy.com/media/l1IBjHowyPcOTWAY8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/listScreens/BasicListScreen.js
 */
declare class ListItem extends BaseComponent<ListItemProps, ListItemState> {
    static displayName: string;
    static defaultProps: {
        height: number;
        containerElement: any;
        underlayColor: any;
    };
    constructor(props: any);
    generateStyles(): void;
    render(): JSX.Element;
}
export default ListItem;
