import { ComponentProps } from '../../testkit/new/Component.driver';
export declare const PointDriver: (props: ComponentProps) => {
    getPoint: () => {
        exists: () => boolean;
        getStyle: () => any;
        getContentStyle: () => any;
    };
};
