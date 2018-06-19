/// <reference types="react" />
import BaseInput from "./BaseInput";
/**
 * @description: Mask Input to create custom looking inputs with custom formats
 * @extends: TextInput
 * @extendslink: docs/TagsInput
 * @gif: https://camo.githubusercontent.com/61eedb65e968845d5eac713dcd21a69691571fb1/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f4b5a5a7446666f486f454b334b2f67697068792e676966
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/MaskedInputScreen.js
 */
export default class MaskedInput extends BaseInput {
    static displayName: string;
    static propTypes: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderMaskedText(): any;
    render(): JSX.Element;
}
