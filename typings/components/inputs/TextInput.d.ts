/// <reference types="react" />
import BaseInput from "./BaseInput";
/**
 * @description: A wrapper for Text Input component with extra functionality like floating placeholder
 * @extends: TextInput
 * @extendslink: https://facebook.github.io/react-native/docs/textinput.html
 * @modifiers: Typography
 * @gif: https://media.giphy.com/media/xULW8su8Cs5Z9Fq4PS/giphy.gif, https://media.giphy.com/media/3ohc1dhDcLS9FvWLJu/giphy.gif, https://media.giphy.com/media/oNUSOxnHdMP5ZnKYsh/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/InputsScreen.js
 */
export default class TextInput extends BaseInput {
    static displayName: string;
    static propTypes: any;
    static defaultProps: {
        placeholderTextColor: any;
        enableErrors: boolean;
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    generatePropsWarnings(props: any): void;
    generateStyles(): void;
    getStateColor(colorProp: any, isUnderline: any): any;
    getCharCount(): any;
    isCounterLimit(): boolean;
    hasText(value: any): boolean;
    shouldShowHelperText(): any;
    shouldFakePlaceholder(): boolean;
    getHeight(): any;
    getLinesHeightLimit(): number;
    renderPlaceholder(): JSX.Element;
    renderTitle(): JSX.Element;
    renderCharCounter(): JSX.Element;
    renderError(): JSX.Element;
    renderExpandableModal(): any;
    renderExpandableInput(): JSX.Element;
    renderTextInput(): JSX.Element;
    render(): JSX.Element;
    toggleExpandableModal(value: any): void;
    updateFloatingPlaceholderState(withoutAnimation: any): void;
    onDoneEditingExpandableInput(): void;
    onChangeText(text: any): void;
    onFocus(...args: any[]): void;
    onBlur(...args: any[]): void;
}
