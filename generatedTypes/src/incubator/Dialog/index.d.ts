/// <reference types="react" />
import { DialogProps, DialogDirections, DialogDirectionsEnum, DialogHeaderProps } from './types';
export { DialogProps, DialogDirections, DialogDirectionsEnum, DialogHeaderProps };
declare const Dialog: {
    (props: DialogProps): JSX.Element;
    displayName: string;
    directions: typeof import("../panView").PanningDirectionsEnum;
    Header: (props?: DialogHeaderProps) => JSX.Element | null;
};
export default Dialog;
