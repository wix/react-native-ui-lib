import { ComponentProps } from '../../testkit/new/Component.driver';
export declare const ModalDriver: (props: ComponentProps) => {
    isVisible: () => boolean;
    pressOnBackground: () => void;
    getElement: () => import("react-test-renderer").ReactTestInstance;
    queryElement: () => import("react-test-renderer").ReactTestInstance | undefined;
    exists: () => boolean;
};
