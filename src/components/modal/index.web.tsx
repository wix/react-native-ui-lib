// import _ from 'lodash';
import React, {Component} from 'react';
import {createPortal} from 'react-dom';
import {ModalProps as RNModalProps, GestureResponderEvent, KeyboardAvoidingViewProps} from 'react-native';
import {BlurViewPackage} from '../../optionalDependencies';
import {asBaseComponent} from '../../commons/new';
import TopBar, {ModalTopBarProps} from './TopBar';
import View from '../../components/view';

const BlurView = BlurViewPackage?.BlurView;

export {ModalTopBarProps};
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
   * Wrapper id for web implementation
   */
  wrapperId?: string;
}

/**
 * @description: Component that present content on top of the invoking screen
 * @extends: Modal
 * @extendsLink: https://reactnative.dev/docs/modal
 * @gif: https://media.giphy.com/media/3oFzmfSX8KgvctI4Ks/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.tsx
 */
class Modal extends Component<ModalProps> {
  static displayName = 'Modal';
  static TopBar: typeof TopBar;

  static defaultProps = {
    wrapperId: 'emulator-root'
  };

  constructor(props: ModalProps) {
    super(props);

    if (props.enableModalBlur && !BlurView) {
      console.error(`RNUILib Modal's "enableModalBlur" prop requires installing "@react-native-community/blur" dependency`);
    }
  }

  createWrapperAndAppendToBody(wrapperId: string) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  }

  renderModalWeb() {
    const {visible} = this.props;
    if (visible) {
      return (
        <View absF nativeID={'modal-root'}>
          {this.props.children}
        </View>
      );
    }
  }

  render() {
    const {wrapperId} = Modal.defaultProps;
    let wrapper = document.getElementById(wrapperId);
    if (!wrapper) {
      wrapper = this.createWrapperAndAppendToBody(wrapperId);
    }
    return createPortal(this.renderModalWeb(), wrapper);
  }
}

Modal.TopBar = TopBar;

export default asBaseComponent<ModalProps, typeof Modal>(Modal);
