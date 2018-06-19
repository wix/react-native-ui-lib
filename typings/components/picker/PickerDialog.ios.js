import React from "react";
import { StyleSheet } from "react-native";
import _ from "lodash";
import { BaseComponent } from "../../commons";
import Dialog from "../dialog";
import View from "../view";
import Text from "../text";
import { Colors } from "../../style";
import WheelPicker from "../../nativeComponents/WheelPicker";
class PickerDialog extends BaseComponent {
    constructor() {
        super(...arguments);
        this.state = {};
    }
    renderHeader() {
        const { onDone, onCancel, topBarProps } = this.props;
        return (<View style={styles.header}>
        <Text text70 blue30 onPress={onCancel}>
          {_.get(topBarProps, "cancelLabel", "Cancel")}
        </Text>
        <Text text70 blue30 onPress={onDone}>
          {_.get(topBarProps, "doneLabel", "Done")}
        </Text>
      </View>);
    }
    renderPicker() {
        const { children, onValueChange, selectedValue, renderNativePicker } = this.props;
        if (_.isFunction(renderNativePicker)) {
            return renderNativePicker(this.props);
        }
        return (<WheelPicker onValueChange={onValueChange} selectedValue={selectedValue}>
        {children}
      </WheelPicker>);
    }
    render() {
        const dialogProps = Dialog.extractOwnProps(this.props);
        return (<Dialog {...dialogProps} visible height={250} width="100%" bottom animationConfig={{ duration: 300 }}>
        <View flex bg-white>
          {this.renderHeader()}
          <View centerV flex>
            {this.renderPicker()}
          </View>
        </View>
      </Dialog>);
    }
}
const styles = StyleSheet.create({
    header: {
        height: 44,
        backgroundColor: Colors.dark80,
        paddingHorizontal: 17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});
export default PickerDialog;
