/// <reference types="react" />
import BaseInput from '../baseInput';
/**
 * @description: A wrapper for TextInput component with extra functionality like floating placeholder and validations (This is an uncontrolled component)
 * @modifiers: Typography
 * @extends: TextInput
 * @extendsLink: https://reactnative.dev/docs/textinput
 * @gif: https://media.giphy.com/media/xULW8su8Cs5Z9Fq4PS/giphy.gif, https://media.giphy.com/media/3ohc1dhDcLS9FvWLJu/giphy.gif, https://media.giphy.com/media/oNUSOxnHdMP5ZnKYsh/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextFieldScreen/BasicTextFieldScreen.js
 */
export default class TextField extends BaseInput {
    static displayName: string;
    static propTypes: any;
    static defaultProps: {
        enableErrors: boolean;
        validateOnBlur: boolean;
    };
    constructor(props: any);
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    componentDidUpdate(_prevProps: any, prevState: any): void;
    onPlaceholderLayout: (event: any) => void;
    /** Actions */
    generatePropsWarnings(props: any): void;
    generateStyles(): void;
    getAccessibilityInfo(): {
        accessibilityLabel: any;
        accessibilityState: {
            disabled: boolean;
        } | undefined;
    };
    toggleExpandableModal: (value: any) => void;
    updateFloatingPlaceholderState: (withoutAnimation: any) => void;
    getPlaceholderText: (this: any, placeholder: any, helperText: any) => any;
    getStateColor(colorProp?: {}): any;
    getCharCount(): any;
    setCharCountColor(key: any): void;
    getCharCountColor(): any;
    getTopPaddings(): 25 | undefined;
    getTopErrorsPosition(): {
        top: number;
    } | undefined;
    isDisabled(): boolean;
    isCounterLimit(): boolean;
    hasText(value: any): boolean;
    shouldShowHelperText(): any;
    shouldFloatOnFocus(): any;
    shouldFloatPlaceholder(text: any): any;
    shouldFakePlaceholder(): boolean;
    shouldShowError(): any;
    getErrorMessage(): any;
    shouldShowTopError(): any;
    shouldDisplayRightButton(): any;
    shouldRenderTitle(): any;
    onPressRightButton: () => void;
    /** Renders */
    renderPlaceholder(): JSX.Element | undefined;
    renderPrefix(): JSX.Element | undefined;
    renderTitle(): JSX.Element | undefined;
    renderCharCounter(): JSX.Element | undefined;
    renderError(visible: any): JSX.Element | undefined;
    renderExpandableModal(): any;
    renderExpandableInput(): any;
    renderTextInput(): JSX.Element;
    renderRightButton(): JSX.Element | undefined;
    renderRightIcon(): JSX.Element | undefined;
    render(): JSX.Element;
    /** Events */
    onDoneEditingExpandableInput: () => void;
    onKeyPress: (event: any) => void;
    onChangeText: (text: any) => void;
}
