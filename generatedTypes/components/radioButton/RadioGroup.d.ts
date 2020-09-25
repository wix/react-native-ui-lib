import React, { PureComponent, GetDerivedStateFromProps } from 'react';
import { BaseComponentInjectedProps, ForwardRefInjectedProps } from '../../commons/new';
export declare type RadioGroupPropTypes = {
    /**
     * The initial value of the selected radio button
     */
    initialValue?: string | number | boolean;
    /**
     * Invoked once when value changes, by selecting one of the radio buttons in the group
     */
    onValueChange?: (value: string | number | boolean) => void;
};
interface RadioGroupState {
    value?: RadioGroupPropTypes['initialValue'];
}
declare type Props = RadioGroupPropTypes & BaseComponentInjectedProps & ForwardRefInjectedProps;
/**
 * Wrap a group of Radio Buttons to automatically control their selection
 */
declare class RadioGroup extends PureComponent<Props, RadioGroupState> {
    static displayName: string;
    constructor(props: Props);
    static getUpdatedState: (nextProps: Props, prevState: RadioGroupState) => RadioGroupState | null;
    static getDerivedStateFromProps: GetDerivedStateFromProps<Props, RadioGroupState>;
    getContextProviderValue(): {
        value: string | number | boolean | undefined;
        onValueChange: (value: string | number | boolean | undefined) => void;
    };
    onValueChange: (value: string | number | boolean | undefined) => void;
    render(): JSX.Element;
}
export { RadioGroup };
declare const _default: React.ComponentClass<{
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
