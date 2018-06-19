/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type ProgressBarProps = {
    height?: number;
    backgroundColor?: string;
    progressBackgroundColor?: string;
};
/**
 * @description: Animated progress bar
 * @gif:https://media.giphy.com/media/3o752o08oY0oCvOxR6/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/animationScreens/ProgressBarScreen.js
 */
export default class ProgressBar extends BaseComponent<ProgressBarProps, {}> {
    static displayName: string;
    static defaultProps: {
        backgroundColor: any;
        progressBackgroundColor: any;
    };
    render(): JSX.Element;
}
export {};
