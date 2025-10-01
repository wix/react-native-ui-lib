import React from 'react';
import DialogHeader from './DialogHeader';
import { DialogProps, DialogDirections, DialogDirectionsEnum, DialogHeaderProps, DialogMigrationProps } from './types';
export { DialogProps, DialogDirections, DialogDirectionsEnum, DialogHeaderProps, DialogMigrationProps };
export interface DialogStatics {
    directions: typeof DialogDirectionsEnum;
    Header: typeof DialogHeader;
}
export interface DialogImperativeMethods {
    dismiss: () => void;
}
declare const _default: React.ForwardRefExoticComponent<import("./types")._DialogProps & {
    children?: React.ReactNode;
} & React.RefAttributes<any>> & DialogStatics;
export default _default;
