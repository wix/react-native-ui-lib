import React, {Component} from 'react';
import {createPortal} from 'react-dom';
import {asBaseComponent} from '../../commons/new';
import {ModalProps} from './types';
import TopBar from './TopBar';
import View from '../../components/view';

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

  createWrapperAndAppendToBody(wrapperId: string) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  }

  renderWebModal() {
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
    const {portalContainerId} = this.props;
    let wrapper = document.getElementById(portalContainerId!);
    if (!wrapper) {
      wrapper = this.createWrapperAndAppendToBody(portalContainerId!);
    }
    return createPortal(this.renderWebModal(), wrapper);
  }
}

Modal.TopBar = TopBar;

export default asBaseComponent<ModalProps, typeof Modal>(Modal);
