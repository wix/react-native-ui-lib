import CustomKeyboardViewBase, { CustomKeyboardViewBaseProps } from './../CustomKeyboardViewBase';
export type CustomKeyboardViewProps = CustomKeyboardViewBaseProps & {
    /**
     * The reference to the actual text input (or the keyboard may not reset when instructed to, etc.)
     */
    inputRef?: any;
    useSafeArea?: boolean;
};
export default class CustomKeyboardView extends CustomKeyboardViewBase<CustomKeyboardViewProps> {
    static displayName: string;
    static defaultProps: {
        initialProps: {};
        useSafeArea: boolean;
    };
    constructor(props: CustomKeyboardViewProps);
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: CustomKeyboardViewProps): void;
    render(): null;
}
