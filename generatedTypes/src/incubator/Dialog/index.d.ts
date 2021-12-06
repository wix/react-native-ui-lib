import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ImperativeDialogProps, DialogDirections, DialogDirectionsEnum, DialogHeaderProps, DialogTextProps } from './types';
export { DialogDirections, DialogDirectionsEnum, DialogHeaderProps, DialogTextProps };
export interface DialogProps extends Omit<ImperativeDialogProps, 'initialVisibility'> {
    /**
     * The visibility of the dialog.
     */
    visible?: boolean;
    /**
     * The Dialog's header
     */
    headerProps?: DialogHeaderProps;
    /**
     * The Dialog`s container style (it is set to {position: 'absolute'})
     */
    containerStyle?: StyleProp<ViewStyle>;
}
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
