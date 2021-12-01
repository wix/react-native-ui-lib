/// <reference types="react" />
import { ImperativeDialogProps, DialogDirections, DialogDirectionsEnum } from './ImperativeDialog';
export { DialogDirections, DialogDirectionsEnum };
export interface DialogProps extends Omit<ImperativeDialogProps, 'initialVisibility'> {
    /**
     * The visibility of the dialog.
     */
    visible?: boolean;
}
declare const Dialog: {
    (props: DialogProps): JSX.Element;
    displayName: string;
    directions: typeof import("../panView").PanningDirectionsEnum;
};
export default Dialog;
