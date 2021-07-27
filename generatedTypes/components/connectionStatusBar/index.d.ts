import React, { PureComponent } from 'react';
import { ConnectionStatusBarProps, ConnectionStatusBarState } from './Types';
export { ConnectionStatusBarProps };
/**
 * @description: Top bar to show a "no internet" connection status. Note: Run on real device for best results
 * @image: https://user-images.githubusercontent.com/33805983/34683190-f3b1904c-f4a9-11e7-9d46-9a340bd35448.png, https://user-images.githubusercontent.com/33805983/34484206-edc6c6e4-efcb-11e7-88b2-cd394c19dd5e.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ConnectionStatusBarScreen.tsx
 * @notes: The component requires installing the '@react-native-community/netinfo' native library
 */
declare class ConnectionStatusBar extends PureComponent<ConnectionStatusBarProps, ConnectionStatusBarState> {
    static displayName: string;
    static defaultProps: {
        label: string;
        allowDismiss: boolean;
        useAbsolutePosition: boolean;
    };
    styles?: any;
    unsubscribe?: any;
    static onConnectionLost?: () => void;
    static registerGlobalOnConnectionLost(callback: () => void): void;
    static unregisterGlobalOnConnectionLost(): void;
    constructor(props: ConnectionStatusBarProps);
    generateStyles(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onConnectionChange(state: ConnectionStatusBarState): void;
    getInitialConnectionState(): Promise<void>;
    isStateConnected(state: ConnectionStatusBarState): boolean;
    render(): false | JSX.Element;
}
export { ConnectionStatusBar };
declare const _default: React.ComponentClass<ConnectionStatusBarProps & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof ConnectionStatusBar;
export default _default;
