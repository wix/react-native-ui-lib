/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type ActionSheetProps = {
    visible?: boolean;
    title?: string;
    message?: string;
    cancelButtonIndex?: number;
    destructiveButtonIndex?: number;
    options?: any[];
    onDismiss?: (...args: any[]) => any;
    useNativeIOS?: boolean;
    showCancelButton?: boolean;
};
/**
 * @description: Cross platform Action sheet, with a support for native iOS solution
 * @gif: https://media.giphy.com/media/l0HUpXOR6RqB2ct5S/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ActionSheetScreen.js
 */
export default class ActionSheet extends BaseComponent<ActionSheetProps, {}> {
    static displayName: string;
    constructor(props: any);
    static defaultProps: {
        title: any;
        message: any;
        showCancelButton: boolean;
    };
    renderSheet(): JSX.Element;
    renderTitle(): JSX.Element;
    renderActions(): JSX.Element;
    renderAction(option: any, index: any): JSX.Element;
    componentWillReceiveProps(nextProps: any): void;
    onOptionPress(optionIndex: any): void;
    render(): JSX.Element;
}
export {};
