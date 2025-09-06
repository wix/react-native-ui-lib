import { ComponentProps } from '../../testkit';
export declare const DateTimePickerDriver: (props: ComponentProps) => {
    open: () => void;
    close: () => void;
    select: () => void;
    changeDateTo: (date: Date) => void;
};
