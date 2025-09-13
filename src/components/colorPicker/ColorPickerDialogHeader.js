import _get from "lodash/get";
import React from 'react';
import { StyleSheet } from 'react-native';
import View from "../view";
import Button from "../button";
import Assets from "../../assets";
import { Colors } from "../../style";
import { BORDER_RADIUS } from "./ColorPickerPresenter";
const ColorPickerDialogHeader = props => {
  const {
    onDismiss,
    accessibilityLabels,
    testID,
    doneButtonColor,
    valid,
    onDonePressed
  } = props;
  return <View row spread bg-$backgroundDefault paddingH-20 style={styles.header}>
      <Button link iconSource={Assets.internal.icons.x} iconStyle={{
      tintColor: Colors.$iconDefault
    }} onPress={onDismiss} accessibilityLabel={_get(accessibilityLabels, 'dismissButton')} testID={`${testID}.dialog.cancel`} />
      <Button color={doneButtonColor} disabled={!valid} link iconSource={Assets.internal.icons.check} onPress={onDonePressed} accessibilityLabel={_get(accessibilityLabels, 'doneButton')} testID={`${testID}.dialog.done`} />
    </View>;
};
export default ColorPickerDialogHeader;
const styles = StyleSheet.create({
  header: {
    height: 56,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS
  }
});