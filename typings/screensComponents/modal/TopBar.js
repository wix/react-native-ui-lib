import React from "react";
import { StyleSheet } from "react-native";
import { BaseComponent } from "../../commons";
import { Constants } from "../../helpers";
import Assets from "../../assets";
import { Colors, Typography } from "../../style";
import View from "../../components/view";
import Button from "../../components/button";
import Text from "../../components/text";
const DEFAULT_BUTTON_PROPS = {
    color: Colors.blue30
};
/**
 * @description: Modal.TopBar, inner component for configuring the Modal component's title, buttons and statusBar
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.js
 */
export default class TopBar extends BaseComponent {
    generateStyles() {
        this.styles = createStyles(this.props);
    }
    renderTopBarButton({ onPress, label, icon, buttonProps }) {
        if (onPress && (label || icon)) {
            const { iconStyle, labelStyle, ...otherButtonProps } = buttonProps;
            return (<Button link onPress={onPress} label={label} labelStyle={[this.styles.actionLabel, labelStyle]} iconSource={icon} iconStyle={[this.styles.icon, iconStyle]} {...DEFAULT_BUTTON_PROPS} {...otherButtonProps} hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}/>);
        }
    }
    renderDone() {
        const { doneButtonProps, doneLabel, doneIcon, onDone } = this.props;
        return this.renderTopBarButton({
            onPress: onDone,
            label: doneLabel,
            icon: doneIcon,
            buttonProps: doneButtonProps
        });
    }
    renderCancel() {
        const { cancelButtonProps, cancelLabel, cancelIcon, onCancel } = this.props;
        return this.renderTopBarButton({
            onPress: onCancel,
            label: cancelLabel,
            icon: cancelIcon,
            buttonProps: cancelButtonProps
        });
    }
    render() {
        const { title, titleStyle, includeStatusBar } = this.props;
        return (<View>
        {includeStatusBar && <View style={this.styles.statusBar}/>}
        <View style={this.styles.container}>
          <View row flex bottom paddingL-15 centerV>
            {this.renderCancel()}
          </View>
          <View row flex-3 bottom centerH centerV>
            <Text numberOfLines={1} text70 style={[this.styles.title, titleStyle]}>
              {title}
            </Text>
          </View>
          <View row flex bottom right paddingR-15 centerV>
            {this.renderDone()}
          </View>
        </View>
      </View>);
    }
}
TopBar.displayName = "Modal.TopBar";
TopBar.defaultProps = {
    doneLabel: "Save",
    cancelIcon: Assets.icons.x,
    doneButtonProps: {},
    cancelButtonProps: {},
    includeStatusBar: Constants.isIOS
};
function createStyles() {
    return StyleSheet.create({
        container: {
            flexDirection: "row",
            height: 32 + Constants.statusBarHeight
        },
        statusBar: {
            height: Constants.statusBarHeight
        },
        title: {
            fontWeight: "500"
        },
        actionLabel: {
            ...Typography.text70
        },
        icon: {
            width: 16,
            height: 16,
            tintColor: Colors.dark10,
            marginBottom: 2
        }
    });
}
