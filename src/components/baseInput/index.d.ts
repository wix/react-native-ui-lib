import 'react';
import { BaseComponent } from '../../commons';
export default class BaseInput extends BaseComponent {
    static displayName: string;
    static propTypes: any;
    static defaultProps: {
        validateOnBlur: boolean;
    };
    constructor(props: any);
    componentDidMount(): void;
    /** Events */
    onFocus: (...args: any[]) => void;
    onBlur: (...args: any[]) => void;
    onChange: (event: any) => void;
    onChangeText: (text: any) => void;
    /** Actions */
    getTypography(): any;
    hasText(): any;
    isFocused(): any;
    focus(): void;
    blur(): void;
    clear(): void;
    validate: any;
    isRequiredField(): boolean;
    getRequiredPlaceholder(placeholder: any): any;
    getErrorMessage(): any;
    getColor(value: string): string;
    toggleExpandableModal(...args: any[]): any;
}
