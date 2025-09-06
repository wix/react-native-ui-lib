import React, { Component } from 'react';
import { Animated, StyleProp, TouchableOpacityProps, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { TextProps } from '../text';
export interface CheckboxProps extends TouchableOpacityProps {
    /**
     * The value of the Checkbox. If true the switch will be turned on. Default value is false.
     */
    value?: boolean;
    /**
     * Invoked with the new value when the value changes.
     */
    onValueChange?: (value: boolean) => void;
    /**
     * Whether the checkbox is required
     */
    required?: boolean;
    /**
     * Callback for when field validity has changed (only after invoking validate())
     */
    onChangeValidity?: (isValid?: boolean) => void;
    /**
     * Whether the checkbox should be disabled
     */
    disabled?: boolean;
    /**
     * The Checkbox color
     */
    color?: string;
    /**
     * alternative Checkbox outline style
     */
    outline?: boolean;
    /**
     * The size of the checkbox. affect both width and height
     */
    size?: number;
    /**
     * The Checkbox border radius
     */
    borderRadius?: number;
    /**
     * The icon asset to use for the selected indication (accept only local assets)
     */
    selectedIcon?: number;
    /**
     * The selected icon color
     */
    iconColor?: string;
    /**
     * The label of the checkbox
     */
    label?: string;
    /**
     * The style of the label
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Props that will be passed to the checkbox Text label.
     */
    labelProps?: Omit<TextProps, 'style'>;
    /**
     * Additional styling
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Additional styling for checkbox and label container
     */
    containerStyle?: StyleProp<ViewStyle>;
    indeterminate?: boolean;
}
interface CheckboxMethods {
    validate: () => void;
    isValid: () => boolean;
}
export type CheckboxRef = Checkbox & CheckboxMethods;
interface CheckboxState {
    isChecked: Animated.Value;
    showError?: boolean;
    isValid?: boolean;
}
declare class Checkbox extends Component<CheckboxProps, CheckboxState> {
    static displayName: string;
    styles: {
        container: StyleProp<ViewStyle>;
        selectedIcon: StyleProp<ImageStyle>;
        checkboxLabel: StyleProp<TextStyle>;
    };
    animationStyle: {
        opacity: CheckboxState['isChecked'];
        transform: [
            {
                scaleX: CheckboxState['isChecked'];
            },
            {
                scaleY: CheckboxState['isChecked'];
            }
        ];
    };
    constructor(props: CheckboxProps);
    validationState: boolean;
    componentDidUpdate(prevProps: CheckboxProps): void;
    getAccessibilityProps(): {
        accessible: boolean;
        accessibilityLabel: string;
        accessibilityRole: string;
        accessibilityState: {
            disabled: boolean | undefined;
            checked: boolean | undefined;
        };
    };
    animateCheckbox(value: CheckboxProps['value']): void;
    setValidation(newValue: boolean): void;
    onPress: () => void;
    getColor: () => string;
    getBackgroundColor: () => string;
    getTintColor: () => string;
    getBorderStyle(): (StyleProp<ViewStyle> | {
        borderColor: string;
    })[];
    getLabelStyle: () => {
        color: string;
    };
    renderCheckbox(): React.JSX.Element;
    render(): React.JSX.Element;
    validate: () => boolean;
    isValid: () => boolean | undefined;
}
declare const _default: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<any>>;
export default _default;
