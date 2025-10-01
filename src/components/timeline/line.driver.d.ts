import { ComponentProps } from '../../testkit/new/Component.driver';
export declare const LineDriver: (props: ComponentProps) => {
    getLine: () => {
        exists: () => boolean;
        getStyle: () => any;
        isVisible: () => boolean;
        isEntryPointExists: () => boolean;
        getEntryPointStyle: () => any;
    };
};
