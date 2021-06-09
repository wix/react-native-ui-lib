import _pt from "prop-types";
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from "../../style";
import Text from "../../components/text";
import { ValidationMessagePosition } from "./types";
import { getColorByState } from "./Presenter";
import FieldContext from "./FieldContext";

const Label = ({
  label,
  labelColor = Colors.grey10,
  labelStyle,
  labelProps,
  validationMessagePosition,
  floatingPlaceholder
}) => {
  const context = useContext(FieldContext);
  const forceHidingLabel = !context.isValid && validationMessagePosition === ValidationMessagePosition.TOP;

  if ((label || floatingPlaceholder) && !forceHidingLabel) {
    return <Text color={getColorByState(labelColor, context)} style={[styles.label, labelStyle, floatingPlaceholder && styles.dummyPlaceholder]} {...labelProps}>
        {label}
      </Text>;
  }

  return null;
};

Label.propTypes = {
  /**
     * Field label
     */
  label: _pt.string,
  floatingPlaceholder: _pt.bool
};
const styles = StyleSheet.create({
  label: {
    minHeight: 20
  },
  dummyPlaceholder: {
    opacity: 0
  }
});
Label.displayName = 'Incubator.TextField';
export default Label;