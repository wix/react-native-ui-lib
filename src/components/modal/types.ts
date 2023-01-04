import {
  ModalProps as RNModalProps,
  GestureResponderEvent,
  KeyboardAvoidingViewProps,
  StyleProp,
  TextStyle,
  ImageSourcePropType
} from 'react-native';
import {ButtonProps} from '../../components/button';
import {ViewProps} from '../../components/view';

export type topBarButtonProp = {
  onPress?: (props: any) => void;
  label?: string;
  icon?: ImageSourcePropType;
  accessibilityLabel?: string;
  buttonProps?: Omit<ButtonProps, 'onPress'>;
};

export interface ModalProps extends RNModalProps {
  /**
   * Blurs the modal background when transparent (iOS only)
   */
  enableModalBlur?: boolean;
  /**
   * A custom view to use as a BlueView instead of the default one
   */
  blurView?: JSX.Element;
  /**
   * allow dismissing a modal when clicking on its background
   */
  onBackgroundPress?: (event: GestureResponderEvent) => void;
  /**
   * the background color of the overlay
   */
  overlayBackgroundColor?: string;
  /**
   * The modal's end-to-end test identifier
   */
  testID?: string;
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element. By default, the
   * label is constructed by traversing all the children and accumulating all the Text nodes separated by space.
   */
  accessibilityLabel?: string;
  /**
   * Should add a GestureHandlerRootView (Android only)
   */
  useGestureHandlerRootView?: boolean;
  /**
   * Should add a KeyboardAvoidingView (iOS only)
   */
  useKeyboardAvoidingView?: boolean;
  /**
   * Send additional props to the KeyboardAvoidingView (iOS only)
   */
  keyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
  /**
   * The modal's container identifier for web implementation, the container id will be the parent element/div for the modal's to render in.
   */
  portalContainerId?: string;
}

export interface ModalTopBarProps {
  /**
   * title to display in the center of the top bar
   */
  title?: string;
  /**
   * title custom style
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * done action props (Button props)
   */
  doneButtonProps?: Omit<ButtonProps, 'onPress'>;
  /**
   * done action label
   */
  doneLabel?: string;
  /**
   * done action icon
   */
  doneIcon?: ImageSourcePropType;
  /**
   * done action callback
   */
  onDone?: (props?: any) => void;
  /**
   * cancel action props (Button props)
   */
  cancelButtonProps?: Omit<ButtonProps, 'onPress'>;
  /**
   * cancel action label
   */
  cancelLabel?: string;
  /**
   * cancel action icon
   */
  cancelIcon?: ImageSourcePropType;
  /**
   * cancel action callback
   */
  onCancel?: (props?: any) => void;
  /**
   * buttons to render on the right side of the top bar
   */
  rightButtons?: topBarButtonProp | topBarButtonProp[];
  /**
   * buttons to render on the left side of the top bar
   */
  leftButtons?: topBarButtonProp | topBarButtonProp[];
  /**
   * whether to include status bar or not (height claculations)
   */
  includeStatusBar?: boolean;
  /**
   * style for the TopBar container
   */
  containerStyle?: ViewProps['style'];
  /**
   * Whether or not to handle SafeArea
   */
  useSafeArea?: boolean;
}
