/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type TopBarProps = {
    title?: string;
    titleStyle?: object | number | any[];
    doneButtonProps?: any;
    doneLabel?: string;
    doneIcon?: object | number;
    onDone?: (...args: any[]) => any;
    cancelButtonProps?: any;
    cancelLabel?: string;
    cancelIcon?: object | number;
    onCancel?: (...args: any[]) => any;
    includeStatusBar?: boolean;
};
/**
 * @description: Modal.TopBar, inner component for configuring the Modal component's title, buttons and statusBar
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.js
 */
export default class TopBar extends BaseComponent<TopBarProps, {}> {
    static displayName: string;
    static defaultProps: {
        doneLabel: string;
        cancelIcon: any;
        doneButtonProps: {};
        cancelButtonProps: {};
        includeStatusBar: any;
    };
    generateStyles(): void;
    renderTopBarButton({ onPress, label, icon, buttonProps }: {
        onPress: any;
        label: any;
        icon: any;
        buttonProps: any;
    }): JSX.Element;
    renderDone(): JSX.Element;
    renderCancel(): JSX.Element;
    render(): JSX.Element;
}
export {};
