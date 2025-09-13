import { type ComponentProps } from '../../testkit/new/Component.driver';
export declare const ExpandableOverlayDriver: (props: ComponentProps, useDialog: boolean) => {
    exists: () => boolean;
    open: () => void;
    isOpen: () => boolean;
    pressOnBackground: () => void;
};
