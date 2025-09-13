import { ViewStyle } from 'react-native';
import { ComponentProps } from '../../testkit/new/Component.driver';
export declare const SwitchDriver: (props: ComponentProps) => {
    getStyle: () => ViewStyle;
    isDisabled: () => boolean;
    isChecked: () => any;
    press: () => void;
    hasOnPress: () => boolean;
    onPressIn: () => void;
    hasOnPressIn: () => boolean;
    onPressOut: () => void;
    hasOnPressOut: () => boolean;
    onLongPress: () => void;
    hasOnLongPress: () => boolean;
    getElement: () => import("react-test-renderer").ReactTestInstance;
    queryElement: () => import("react-test-renderer").ReactTestInstance | undefined;
    exists: () => boolean;
};
