/**
 * Created by artald on 15/05/2016.
 */
import React, { PureComponent } from 'react';
import { KeyboardTrackingViewProps } from './index';
/**
 * @description: A UI component that enables “keyboard tracking" for this view and it's sub-views.
 * Would typically be used when you have a TextField or TextInput inside this view.
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/KeyboardTrackingViewScreen.js
 * @notes: This view is useful only for iOS.
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/KeyboardTrackingView/KeyboardTrackingView.gif?raw=true
 */
declare class KeyboardTrackingView extends PureComponent<KeyboardTrackingViewProps> {
    static displayName: string;
    static defaultProps: {
        useSafeArea: boolean;
    };
    ref?: any;
    render(): React.JSX.Element;
    getNativeProps(): Promise<any>;
    scrollToStart(): void;
}
export default KeyboardTrackingView;
