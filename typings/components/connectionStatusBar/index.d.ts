/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type ConnectionStatusBarProps = {
    label?: string;
    onConnectionChange?: (...args: any[]) => any;
    allowDismiss?: boolean;
};
declare type ConnectionStatusBarState = {
    isConnected: boolean;
    isCancelled: boolean;
};
/**
 * @description: Top bar to show a "no internet" connection status. Note: Run on real device for best results
 * @image: https://user-images.githubusercontent.com/33805983/34683190-f3b1904c-f4a9-11e7-9d46-9a340bd35448.png, https://user-images.githubusercontent.com/33805983/34484206-edc6c6e4-efcb-11e7-88b2-cd394c19dd5e.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ConnectionStatusBarScreen.js
 */
export default class ConnectionStatusBar extends BaseComponent<ConnectionStatusBarProps, ConnectionStatusBarState> {
    static displayName: string;
    static defaultProps: {
        label: string;
        allowDismiss: boolean;
    };
    static onConnectionLost: any;
    static registerGlobalOnConnectionLost(callback: any): void;
    static unregisterGlobalOnConnectionLost(): void;
    constructor(props: any);
    generateStyles(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onConnectionChange(state: any): void;
    getInitialConnectionState(): Promise<void>;
    isStateConnected(state: any): boolean;
    render(): false | JSX.Element;
}
export {};
