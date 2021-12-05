import {PropsWithChildren} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {AlignmentModifiers} from '../../commons/modifiers';
import {ModalProps} from '../../components/modal';
import {ViewProps} from '../../components/view';
import {PanningDirections, PanningDirectionsEnum} from '../panView';
type DialogDirections = PanningDirections;
const DialogDirectionsEnum = PanningDirectionsEnum;
export {DialogDirections, DialogDirectionsEnum};

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
   * The direction from which and to which the dialog is animating \ panning (default bottom).
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
   * The Dialog`s container style (it is set to {position: 'absolute'})
   */
  containerStyle?: StyleProp<ViewStyle>;
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

export type ImperativeDialogProps = PropsWithChildren<_DialogProps>;

export interface ImperativeDialogMethods {
  open: () => void;
  close: () => void;
}
