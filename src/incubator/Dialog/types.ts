import {PropsWithChildren, ReactElement} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {AlignmentModifiers} from '../../commons/modifiers';
import {DialogProps as DialogPropsOld} from '../../components/dialog';
import {ModalProps} from '../../components/modal';
import {ViewProps} from '../../components/view';
import {TextProps} from '../../components/text';
import {PanningDirections, PanningDirectionsEnum} from '../panView';
type DialogDirections = PanningDirections;
const DialogDirectionsEnum = PanningDirectionsEnum;
export {DialogDirections, DialogDirectionsEnum};

export interface DialogHeaderProps extends ViewProps {
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
  /**
   * Show the header's knob (default is true)
   */
  showKnob?: boolean;
  /**
   * Show the header's divider (default is true)
   */
  showDivider?: boolean;
  /**
   * Pass to render a leading element
   */
  leadingAccessory?: ReactElement;
  /**
   * Pass to render a trailing element
   */
  trailingAccessory?: ReactElement;
  /**
   * Pass to render a top element above the title
   */
  topAccessory?: ReactElement;
  /**
   * Pass to render a bottom element below the subtitle
   */
  bottomAccessory?: ReactElement;
  /**
   * Style for the leading + content + trailing components (without the topAccessory\bottomAccessory)
   */
  contentContainerStyle?: ViewProps['style'];
  /**
   * onPress callback for the inner content
   */
  onPress?: () => void;
}

export interface _DialogProps extends AlignmentModifiers, Pick<ViewProps, 'useSafeArea'> {
  /**
   * The visibility of the dialog.
   */
  visible?: boolean;
  /**
   * The Dialog's header (title, subtitle etc)
   */
  headerProps?: DialogHeaderProps;
  /**
   * The Dialog`s container style (it is set to {position: 'absolute'})
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Extra props for the container
   */
  containerProps?: Omit<ViewProps, 'reanimated' | 'animated' | 'style' | 'onLayout' | 'ref' | 'testID'>;
  /**
   * The dialog width.
   */
  width?: string | number;
  /**
   * The dialog height.
   */
  height?: string | number;

  /**
   * Callback that is called after the dialog's dismiss (after the animation has ended).
   */
  onDismiss?: () => void;
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

export type DialogProps = PropsWithChildren<_DialogProps>;

// For migration purposes
export interface _DialogPropsOld {
  /**
   * The props to pass to the dialog expandable container
   */
  dialogProps?: DialogPropsOld;
  migrateDialog?: false;
}

export interface _DialogPropsNew {
  /**
   * The props to pass to the dialog expandable container
   */
  dialogProps?: DialogProps;
  /**
   * Migrate the Dialog to DialogNew (make sure you use only new props in dialogProps)
   */
  migrateDialog: true;
}

export type DialogMigrationProps = _DialogPropsOld | _DialogPropsNew;
