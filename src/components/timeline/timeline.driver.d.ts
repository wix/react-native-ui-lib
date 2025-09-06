import { ComponentProps } from '../../testkit/new/Component.driver';
export declare const TimelineDriver: (props: ComponentProps) => {
    getPoint: () => {
        exists: () => boolean;
        getStyle: () => any;
        getContentStyle: () => any;
    };
    getTopLine: () => {
        exists: () => boolean;
        getStyle: () => any;
        isVisible: () => boolean;
        isEntryPointExists: () => boolean;
        getEntryPointStyle: () => any;
    };
    getBottomLine: () => {
        exists: () => boolean;
        getStyle: () => any;
        isVisible: () => boolean;
        isEntryPointExists: () => boolean;
        getEntryPointStyle: () => any;
    };
    getElement: () => import("react-test-renderer").ReactTestInstance;
    queryElement: () => import("react-test-renderer").ReactTestInstance | undefined;
    exists: () => boolean;
};
