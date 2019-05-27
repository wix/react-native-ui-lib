import React from "react";
import { Modal as RNModal, TouchableWithoutFeedback, StyleSheet } from "react-native";
import _ from "lodash";
import { BlurView } from "@react-native-community/blur";
import { Constants } from "../../helpers";
import { BaseComponent } from "../../commons";
import TopBar from "./TopBar";
import View from "../../components/view";
/**
 * @description: Component that present content on top of the invoking screen
 * @extends: Modal
 * @extendslink: https://facebook.github.io/react-native/docs/modal.html
 * @gif: https://media.giphy.com/media/3oFzmfSX8KgvctI4Ks/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.js
 */
export default class Modal extends BaseComponent {
    renderTouchableOverlay() {
        const { overlayBackgroundColor, onBackgroundPress } = this.props;
        if (_.isFunction(onBackgroundPress) || !!overlayBackgroundColor) {
            return (<View style={[
                styles.touchableOverlay,
                { backgroundColor: overlayBackgroundColor }
            ]}>
          <TouchableWithoutFeedback onPress={onBackgroundPress}>
            <View flex/>
          </TouchableWithoutFeedback>
        </View>);
        }
    }
    render() {
        const { blurView, enableModalBlur, visible, ...others } = this.props;
        const defaultContainer = enableModalBlur && Constants.isIOS ? BlurView : View;
        const Container = blurView ? blurView : defaultContainer;
        return (<RNModal visible={Boolean(visible)} {...others}>
        <Container style={{ flex: 1 }} blurType="light">
          {this.renderTouchableOverlay()}
          {this.props.children}
        </Container>
      </RNModal>);
    }
}
Modal.displayName = "Modal";
const styles = StyleSheet.create({
    touchableOverlay: {
        ...StyleSheet.absoluteFillObject
    }
});
Modal.TopBar = TopBar;
