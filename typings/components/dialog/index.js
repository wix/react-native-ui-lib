import React from "react";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import _ from "lodash";
import { BaseComponent } from "../../commons";
import { Colors } from "../../style";
import Modal from "../../screensComponents/modal";
import View from "../view";
/*eslint-disable*/
/**
 * @description: Dialog component for displaying custom content inside a popup dialog
 * @notes: Use alignment modifiers to control the dialog positon (top, bottom, centerV, centerH, etc... by default the dialog is align to center)
 * @modifiers: alignment
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DialogScreen.js
 * @gif: https://media.giphy.com/media/9S58XdLCoUiLzAc1b1/giphy.gif
 */
/*eslint-enable*/
class Dialog extends BaseComponent {
    generateStyles() {
        this.styles = createStyles(this.props);
    }
    getAnimationConfig() {
        const { animationConfig } = this.props;
        return {
            animation: "slideInUp",
            duration: 400,
            useNativeDriver: true,
            ...animationConfig
        };
    }
    render() {
        const { visible, overlayBackgroundColor, style, onDismiss } = this.getThemeProps();
        const { alignments } = this.state;
        const centerByDefault = _.isEmpty(alignments);
        return (<Modal transparent visible={visible} animationType={"fade"} onBackgroundPress={onDismiss} onRequestClose={onDismiss} overlayBackgroundColor={overlayBackgroundColor}>
        <View center={centerByDefault} style={[this.styles.overlay, alignments]} pointerEvents="box-none">
          <Animatable.View style={[this.styles.dialogContainer, style]} {...this.getAnimationConfig()}>
            {this.props.children}
          </Animatable.View>
        </View>
      </Modal>);
    }
}
Dialog.displayName = "Dialog";
Dialog.defaultProps = {
    overlayBackgroundColor: Colors.rgba(Colors.dark10, 0.6),
    width: "90%",
    height: "70%"
};
function createStyles({ width, height }) {
    return StyleSheet.create({
        overlay: {
            flex: 1
        },
        dialogContainer: {
            width,
            height
        }
    });
}
export default Dialog;
