import { ComponentProps } from '../../testkit/new/Component.driver';
import { ScrollProps } from '../../testkit/new/useScrollable.driver';
export declare const CarouselDriver: (props: ComponentProps) => {
    scroll: (props: ScrollProps) => void;
    triggerEvent: (eventName?: string | undefined, event?: Partial<import("react-native/types").NativeScrollEvent> | undefined) => void;
    getElement: () => import("react-test-renderer").ReactTestInstance;
    queryElement: () => import("react-test-renderer").ReactTestInstance | undefined;
    exists: () => boolean;
};
