import React, { PropsWithChildren } from 'react';
import { ForwardRefInjectedProps, BaseComponentInjectedProps } from '../../commons/new';
import { PickerProps, PickerItemProps, PickerValue, PickerModes, PickerSearchStyle } from './types';
declare const Picker: {
    (props: PropsWithChildren<PickerProps> & ForwardRefInjectedProps & BaseComponentInjectedProps): JSX.Element;
    Item: {
        (props: PickerItemProps): JSX.Element;
        displayName: string;
    };
    defaultProps: any;
    modes: typeof PickerModes;
    extractPickerItems(props: PropsWithChildren<PickerProps>): {
        value: any;
        label: any;
    }[] | null | undefined;
};
export { PickerProps, PickerItemProps, PickerValue, PickerModes, PickerSearchStyle };
export { Picker };
declare const _default: React.ComponentClass<(import("./types").PickerPropsWithSingle | import("./types").PickerPropsWithMulti) & {
    useCustomTheme?: boolean | undefined;
}, any> & {
    (props: React.PropsWithChildren<import("./types").PickerPropsWithSingle | import("./types").PickerPropsWithMulti> & ForwardRefInjectedProps & BaseComponentInjectedProps): JSX.Element;
    Item: {
        (props: PickerItemProps): JSX.Element;
        displayName: string;
    };
    defaultProps: any;
    modes: typeof PickerModes;
    extractPickerItems(props: React.PropsWithChildren<import("./types").PickerPropsWithSingle | import("./types").PickerPropsWithMulti>): {
        value: any;
        label: any;
    }[] | null | undefined;
};
export default _default;
