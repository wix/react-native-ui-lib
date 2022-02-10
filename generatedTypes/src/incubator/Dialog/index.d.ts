import React from 'react';
import { DialogProps, DialogDirections, DialogDirectionsEnum, DialogHeaderProps } from './types';
export { DialogDirections, DialogDirectionsEnum, DialogProps, DialogHeaderProps };
declare const Dialog: {
    (props: DialogProps): JSX.Element;
    displayName: string;
    directions: typeof import("../panView").PanningDirectionsEnum;
    Header: React.ComponentClass<DialogHeaderProps & {
        useCustomTheme?: boolean | undefined;
    }, any>;
};
export default Dialog;
