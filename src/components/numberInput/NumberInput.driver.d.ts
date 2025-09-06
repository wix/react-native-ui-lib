import { ComponentProps } from '../../testkit/new/Component.driver';
export declare const NumberInputDriver: (props: ComponentProps) => {
    exists: () => boolean;
    changeText: (text: string) => Promise<void>;
    getValue: () => string | undefined;
};
