/// <reference types="react" />
import CustomKeyboardViewBase, { CustomKeyboardViewBaseProps } from '../CustomKeyboardViewBase';
export default class CustomKeyboardView extends CustomKeyboardViewBase<CustomKeyboardViewBaseProps> {
    static displayName: string;
    componentDidUpdate(prevProps: CustomKeyboardViewBaseProps): Promise<void>;
    render(): JSX.Element;
}
