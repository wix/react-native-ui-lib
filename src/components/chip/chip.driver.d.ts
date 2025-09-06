import { ComponentProps } from '../../testkit/new/Component.driver';
export declare const ChipDriver: (props: ComponentProps) => {
    getLabel: () => {
        getText: () => string | (string | import("react-test-renderer").ReactTestInstance)[];
        getStyle: () => import("react-native").TextStyle;
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
    getDismissIcon: () => {
        exists: () => boolean;
        getStyle: () => any;
        getElement: () => import("react-test-renderer").ReactTestInstance;
        queryElement: () => import("react-test-renderer").ReactTestInstance | undefined;
    };
    getIcon: () => {
        exists: () => boolean;
        getStyle: () => any;
        getElement: () => import("react-test-renderer").ReactTestInstance;
        queryElement: () => import("react-test-renderer").ReactTestInstance | undefined;
    };
    getElement: () => import("react-test-renderer").ReactTestInstance;
    queryElement: () => import("react-test-renderer").ReactTestInstance | undefined;
    exists: () => boolean;
};
