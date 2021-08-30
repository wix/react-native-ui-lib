export default class TextInputKeyboardManager {
    static setInputComponent: (textInputRef: any, { component, initialProps, useSafeArea }: {
        component?: string | undefined;
        initialProps: any;
        useSafeArea?: boolean | undefined;
    }) => void;
    static removeInputComponent: (textInputRef: any) => void;
    static dismissKeyboard: () => void;
    static toggleExpandKeyboard: (textInputRef: any, expand: boolean, performLayoutAnimation?: boolean) => void;
}
