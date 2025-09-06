import React, { PureComponent, GetDerivedStateFromProps } from 'react';
import { BaseComponentInjectedProps, ForwardRefInjectedProps } from '../../commons/new';
import { ViewProps } from '../view';
export type RadioGroupProps = ViewProps & {
    /**
     * The initial value of the selected radio button
     */
    initialValue?: string | number | boolean;
    /**
     * Invoked once when value changes, by selecting one of the radio buttons in the group
     */
    onValueChange?: ((value?: string) => void) | ((value?: number) => void) | ((value?: boolean) => void) | ((value?: any) => void);
};
interface RadioGroupState {
    initialValue?: RadioGroupProps['initialValue'];
    value?: RadioGroupProps['initialValue'];
}
type Props = RadioGroupProps & BaseComponentInjectedProps & ForwardRefInjectedProps;
/**
 * @description: Wrap a group of Radio Buttons to automatically control their selection
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Default.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Alignment.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Custom.gif?raw=true
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Individual.png?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/RadioButtonScreen.js
 */
declare class RadioGroup extends PureComponent<Props, RadioGroupState> {
    static displayName: string;
    constructor(props: Props);
    static getDerivedStateFromProps: GetDerivedStateFromProps<Props, RadioGroupState>;
    getContextProviderValue(): {
        value: string | number | boolean | undefined;
        onValueChange: (value: string | number | boolean | undefined) => void;
    };
    onValueChange: (value: RadioGroupProps['initialValue']) => void;
    render(): React.JSX.Element;
}
export { RadioGroup };
declare const _default: React.ForwardRefExoticComponent<ViewProps & {
    /**
     * The initial value of the selected radio button
     */
    initialValue?: string | number | boolean | undefined;
    /**
     * Invoked once when value changes, by selecting one of the radio buttons in the group
     */
    onValueChange?: ((value?: string | undefined) => void) | ((value?: number | undefined) => void) | ((value?: boolean | undefined) => void) | ((value?: any) => void) | undefined;
} & React.RefAttributes<any>>;
export default _default;
