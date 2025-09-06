import React from 'react';
import { HintPositions, HintProps } from './types';
declare const Hint: {
    (props: HintProps): string | number | true | React.JSX.Element | Iterable<React.ReactNode> | null;
    displayName: string;
    defaultProps: {
        position: HintPositions;
        useModal: boolean;
    };
    positions: typeof HintPositions;
};
export { HintProps, Hint };
declare const _default: React.ForwardRefExoticComponent<HintProps & React.RefAttributes<any>> & {
    (props: HintProps): string | number | true | React.JSX.Element | Iterable<React.ReactNode> | null;
    displayName: string;
    defaultProps: {
        position: HintPositions;
        useModal: boolean;
    };
    positions: typeof HintPositions;
};
export default _default;
