import React from 'react';
import { DialogProps, DialogDirections, DialogDirectionsEnum, DialogHeaderProps, DialogTextProps } from './types';
export { DialogProps, DialogDirections, DialogDirectionsEnum, DialogHeaderProps, DialogTextProps };
declare const Dialog: {
    (props: DialogProps): JSX.Element;
    displayName: string;
    directions: typeof import("../panView").PanningDirectionsEnum;
    Header: (props?: DialogHeaderProps) => JSX.Element | null;
    Text: React.MemoExoticComponent<(props: Pick<DialogHeaderProps, "text">) => JSX.Element | null>;
    Knob: React.MemoExoticComponent<(props: Pick<DialogHeaderProps, "showKnob">) => JSX.Element | null>;
    Divider: React.MemoExoticComponent<(props: Pick<DialogHeaderProps, "showDivider">) => JSX.Element | null>;
};
export default Dialog;
