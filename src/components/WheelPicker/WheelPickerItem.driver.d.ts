import { ComponentProps } from '../../testkit/new/Component.driver';
export declare const WheelPickerItemDriver: (props: ComponentProps) => {
    getLabel: () => string | (string | import("react-test-renderer").ReactTestInstance)[];
    getLabelStyle: () => import("react-native/types").TextStyle;
    getElement: () => import("react-test-renderer").ReactTestInstance;
    queryElement: () => import("react-test-renderer").ReactTestInstance | undefined;
    exists: () => boolean;
};
