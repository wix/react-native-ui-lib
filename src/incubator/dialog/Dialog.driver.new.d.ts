import { ComponentProps } from '../../testkit/new/Component.driver';
export declare const DialogDriver: (props: ComponentProps) => {
    isVisible: () => boolean;
    pressOnBackground: () => void;
    exists: () => boolean;
};
