/// <reference types="react" />
import BaseInput from "./BaseInput";
/**
 * @description: a wrapper for Text Input component to create enclosed text area
 * @extends: TextInput
 * @extendslink: https://facebook.github.io/react-native/docs/textinput.html
 * @modifiers: Typography
 * @gif: https://media.giphy.com/media/3oFzmoU8TdfHeYZNZu/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/InputsScreen.js
 */
export default class TextArea extends BaseInput {
    static displayName: string;
    static propTypes: any;
    generateStyles(): void;
    render(): JSX.Element;
}
