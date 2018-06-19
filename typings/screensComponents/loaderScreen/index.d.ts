/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type LoaderScreenProps = {
    loaderColor?: string;
    message?: string;
    messageStyle?: object | number | any[];
    overlay?: boolean;
};
/**
 * @description: Component that shows a full screen with an activity indicator
 * @extends: Animatable.View
 * @gif: https://media.giphy.com/media/3o75212iau1oK8hznG/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreenScreens/LoadingScreen.js
 */
export default class LoaderScreen extends BaseComponent<LoaderScreenProps, {}> {
    static displayName: string;
    render(): JSX.Element;
}
export {};
