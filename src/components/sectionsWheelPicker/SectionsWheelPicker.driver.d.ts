import type { ReactTestInstance } from 'react-test-renderer';
import { ComponentProps } from '../../testkit/new/Component.driver';
export declare const SectionsWheelPickerDriver: (props: ComponentProps) => {
    sections: import("../WheelPicker").WheelPickerProps<import("../WheelPicker").WheelPickerItemValue>[] | undefined;
    sectionsDrivers: {
        getListHeight: () => any;
        moveToItem: (index: number, itemHeight?: number, numberOfRows?: number) => void;
        getLabel: () => string | (string | ReactTestInstance)[];
        scroll: (contentOffset: Partial<import("react-native/types").NativeScrollPoint>, options?: {
            contentInset: import("react-native/types").NativeScrollRectangle;
            zoomScale: number;
            layoutMeasurement: import("react-native/types").NativeScrollSize;
            contentSize: import("react-native/types").NativeScrollSize;
            velocity?: import("react-native/types").NativeScrollVelocity | undefined;
            targetContentOffset?: import("react-native/types").NativeScrollPoint | undefined;
        } | undefined) => void;
        triggerEvent: (eventName?: string | undefined, event?: Partial<import("react-native/types").NativeScrollEvent> | undefined) => void;
        getElement: () => ReactTestInstance;
        queryElement: () => ReactTestInstance | undefined;
        exists: () => boolean;
    }[];
    getElement: () => ReactTestInstance;
    queryElement: () => ReactTestInstance | undefined;
    exists: () => boolean;
};
