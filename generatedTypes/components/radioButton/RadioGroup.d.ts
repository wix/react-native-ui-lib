import React from 'react';
interface RadioGroupPropTypes {
    /**
     * The initial value of the selected radio button
     */
    initialValue?: string | boolean;
    /**
     * Invoked once when value changes, by selecting one of the radio buttons in the group
     */
    onValueChange?: Function;
}
declare const _default: React.ComponentType<RadioGroupPropTypes>;
export default _default;
