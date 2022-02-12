import { PropsWithChildren } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { AlignmentModifiers } from '../../commons/modifiers';
import { ModalProps } from '../../components/modal';
import { ViewProps } from '../../components/view';
import { TextProps } from '../../components/text';
import { PanningDirections, PanningDirectionsEnum } from '../panView';
declare type DialogDirections = PanningDirections;
declare const DialogDirectionsEnum: typeof PanningDirectionsEnum;
export { DialogDirections, DialogDirectionsEnum };
export interface _DialogProps extends AlignmentModifiers, Pick<ViewProps, 'useSafeArea'> {
    /**
     * The initial visibility of the dialog.
     */
    initialVisibility?: boolean;
    /**
     * Callback that is called after the dialog's dismiss (after the animation has ended).
     */
    onDismiss?: (props?: ImperativeDialogProps) => void;
    /**
     * The direction from which and to which the dialog is animating \ panning (default down).
     */
    direction?: DialogDirections;
    /**
     * Whether or not to ignore background press.
     */
    ignoreBackgroundPress?: boolean;
    /**
     * Additional props for the modal.
     */
    modalProps?: ModalProps;
    /**
     * Used to locate this view in end-to-end tests
     * The container has the unchanged id.
     * Currently supported inner IDs:
     * TODO: add missing <TestID>(s?)
     * <TestID>.modal - the Modal's id.
     * <TestID>.overlayFadingBackground - the fading background id.
     */
    testID?: string;
}
export declare type ImperativeDialogProps = PropsWithChildren<_DialogProps>;
export interface ImperativeDialogMethods {
    open: () => void;
    close: () => void;
}
/**
 * It is available as `Dialog.Text`
 */
export interface DialogTextProps {
    /**
     * Title
     */
    title?: string;
    /**
     * Title text style
     */
    titleStyle?: StyleProp<TextStyle>;
    /**
     * Title extra props
     */
    titleProps?: TextProps;
    /**
     * Subtitle
     */
    subtitle?: string;
    /**
     * Subtitle text style
     */
    subtitleStyle?: StyleProp<TextStyle>;
    /**
     * Subtitle extra props
     */
    subtitleProps?: TextProps;
}
export interface DialogHeaderProps extends ViewProps {
    /**
     * The dialog's default content (Dialog.Text)
     */
    text?: DialogTextProps;
    /**
     * Replace the header's default content (Dialog.Text)
     */
    renderContent?: (props: DialogHeaderProps) => React.ReactElement;
    /**
     * Show the header's knob (default is true)
     * It is available as `Dialog.Knob`
     */
    showKnob?: boolean;
    /**
     * Show the header's divider (default is true)
     * It is available as `Dialog.Divider`
     */
    showDivider?: boolean;
}
