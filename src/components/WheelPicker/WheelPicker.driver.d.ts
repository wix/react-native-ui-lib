import { ComponentProps } from '../../testkit/new/Component.driver';
export declare const WheelPickerDriver: (props: ComponentProps) => {
    getListHeight: () => any;
    moveToItem: (index: number, itemHeight?: number, numberOfRows?: number) => void;
    getLabel: () => string | (string | import("react-test-renderer").ReactTestInstance)[];
    scroll: (contentOffset: Partial<import("react-native/types").NativeScrollPoint>, options?: {
        contentInset: import("react-native/types").NativeScrollRectangle;
        zoomScale: number;
        layoutMeasurement: import("react-native/types").NativeScrollSize;
        contentSize: import("react-native/types").NativeScrollSize;
        velocity?: import("react-native/types").NativeScrollVelocity | undefined;
        targetContentOffset?: import("react-native/types").NativeScrollPoint | undefined;
    } | undefined) => void;
    triggerEvent: (eventName?: string | undefined, event?: Partial<import("react-native/types").NativeScrollEvent> | undefined) => void;
    getElement: () => import("react-test-renderer").ReactTestInstance;
    queryElement: () => import("react-test-renderer").ReactTestInstance | undefined;
    exists: () => boolean;
};
