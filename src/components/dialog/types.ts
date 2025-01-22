import {PropsWithChildren, ReactElement} from 'react';
import {type DimensionValue, type StyleProp, type TextStyle, type ViewStyle} from 'react-native';
import {AlignmentModifiers} from '../../commons/modifiers';
import {ButtonProps} from '../../components/button';
import {ModalProps} from '../../components/modal';
import {PanningDirections, PanningDirectionsEnum} from '../../incubator/panView';
import {TextProps} from '../../components/text';
import {ViewProps} from '../../components/view';
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

export interface DialogCloseButtonProps {
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
   * Whether to show the close button or not
   */
  showCloseButton?: boolean;
  /**
   * The close button props
   */
  closeButtonProps?: Pick<ButtonProps, 'label' | 'labelProps' | 'iconProps'>;
}

export interface _DialogProps extends AlignmentModifiers, Pick<ViewProps, 'useSafeArea'>, DialogCloseButtonProps {
  /**
   * The visibility of the dialog.
   */
  visible?: boolean;
  /**
   * The dialog width.
   */
  width?: DimensionValue;
  /**
   * The dialog height.
   */
  height?: DimensionValue;
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
