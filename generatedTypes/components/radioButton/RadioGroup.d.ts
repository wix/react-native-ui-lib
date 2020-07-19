import React from 'react';
export declare type RadioGroupPropTypes = {
    /**
     * The initial value of the selected radio button
     */
    initialValue?: string | number | boolean;
    /**
     * Invoked once when value changes, by selecting one of the radio buttons in the group
     */
    onValueChange?: (value: string | number | boolean) => void;
};
declare const _default: React.ComponentClass<RadioGroupPropTypes & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
