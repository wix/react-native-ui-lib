/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type TouchableOpacityProps = {
    throttleTime?: number;
    throttleOptions?: {
        leading?: boolean;
        trailing?: boolean;
    };
    activeBackgroundColor?: string;
};
declare type TouchableOpacityState = {
    active: boolean;
};
/**
 * @description: A wrapper for TouchableOpacity component. Support onPress, throttling and activeBackgroundColor
 * @extends: TouchableOpacity
 * @extendslink: https://facebook.github.io/react-native/docs/touchableopacity.html
 * @gif: https://media.giphy.com/media/xULW8AMIgw7l31zjm8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/src/components/touchableOpacity/index.js
 */
export default class TouchableOpacity extends BaseComponent<TouchableOpacityProps, TouchableOpacityState> {
    static displayName: string;
    constructor(props: any);
    state: {
        active: boolean;
    };
    onPressIn(...args: any[]): void;
    onPressOut(...args: any[]): void;
    readonly backgroundStyle: {
        backgroundColor: any;
    };
    render(): JSX.Element;
    onPress(): void;
}
export {};
