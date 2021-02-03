import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, Modal as RNModal, ModalProps as RNModalProps, TouchableWithoutFeedback, GestureResponderEvent} from 'react-native';
import {Constants} from '../../helpers';
import {asBaseComponent} from '../../commons/new';
import TopBar, {ModalTopBarProps} from './TopBar';
import View from '../../components/view';

export {ModalTopBarProps};
export interface ModalProps extends RNModalProps {
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
}

/**
 * @description: Component that present content on top of the invoking screen
 * @extends: Modal
 * @extendslink: https://facebook.github.io/react-native/docs/modal.html
 * @gif: https://media.giphy.com/media/3oFzmfSX8KgvctI4Ks/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.tsx
 */
class Modal extends Component<ModalProps> {
  static displayName = 'Modal';
  static TopBar: typeof TopBar;

  renderTouchableOverlay() {
    const {testID, overlayBackgroundColor, onBackgroundPress, accessibilityLabel = 'Dismiss'} = this.props;
    if (_.isFunction(onBackgroundPress) || !!overlayBackgroundColor) {
      const isScreenReaderEnabled = Constants.accessibility.isScreenReaderEnabled;
      const accessibilityProps = isScreenReaderEnabled
        ? {accessible: true, accessibilityLabel, accessibilityRole: 'button'}
        : undefined;

      return (
        // @ts-ignore
        <View
          useSafeArea={isScreenReaderEnabled}
          style={!isScreenReaderEnabled && [styles.touchableOverlay, {backgroundColor: overlayBackgroundColor}]}
          testID={testID}
        >
          {/*
            // @ts-ignore */}
          <TouchableWithoutFeedback {...accessibilityProps} onPress={onBackgroundPress}>
            <View style={isScreenReaderEnabled ? styles.accessibleOverlayView : styles.overlayView}/>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }

  render() {
    const {visible, ...others} = this.props;

    return (
      <RNModal visible={Boolean(visible)} {...others}>
        {this.renderTouchableOverlay()}
        {this.props.children}
      </RNModal>
    );
  }
}

const styles = StyleSheet.create({
  touchableOverlay: {
    ...StyleSheet.absoluteFillObject
  },
  overlayView: {
    flex: 1
  },
  accessibleOverlayView: {
    height: 50,
    width: '100%'
  }
});

Modal.TopBar = TopBar;

export default asBaseComponent<ModalProps, typeof Modal>(Modal);
