/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type StateScreenProps = {
    imageSource?: object | number;
    title: string;
    subtitle?: any;
    ctaLabel?: string;
    onCtaPress?: (...args: any[]) => any;
    testId?: string;
};
/**
 * @description: Component that shows a full screen for a certain state, like an empty state
 * @image: https://user-images.githubusercontent.com/33805983/34672894-f262ab84-f488-11e7-83f0-4ee0f0ac34ba.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/EmptyStateScreen.js
 */
export default class StateScreen extends BaseComponent<StateScreenProps, {}> {
    static displayName: string;
    generateStyles(): void;
    render(): JSX.Element;
}
export {};
