import React, { PureComponent, GetDerivedStateFromProps } from 'react';
import { ViewProps } from 'react-native';
import { BaseComponentInjectedProps, ForwardRefInjectedProps } from '../../commons/new';
export declare type RadioGroupProps = ViewProps & {
    /**
     * The initial value of the selected radio button
     */
    initialValue?: string | number | boolean;
    /**
     * Invoked once when value changes, by selecting one of the radio buttons in the group
     */
    onValueChange?: ((value: string) => void) | ((value: number) => void) | ((value: boolean) => void);
};
export declare type RadioGroupPropTypes = RadioGroupProps;
interface RadioGroupState {
    value?: RadioGroupProps['initialValue'];
}
declare type Props = RadioGroupProps & BaseComponentInjectedProps & ForwardRefInjectedProps;
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
    onValueChange: (value: RadioGroupProps['initialValue']) => void;
    render(): JSX.Element;
}
export { RadioGroup };
declare const _default: React.ComponentClass<ViewProps & {
    /**
     * The initial value of the selected radio button
     */
    initialValue?: string | number | boolean | undefined;
    /**
     * Invoked once when value changes, by selecting one of the radio buttons in the group
     */
    onValueChange?: ((value: string) => void) | ((value: number) => void) | ((value: boolean) => void) | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
