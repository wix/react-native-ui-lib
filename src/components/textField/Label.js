import React, { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from "../../style";
import Text from "../text";
import { ValidationMessagePosition } from "./types";
import { getColorByState } from "./Presenter";
import FieldContext from "./FieldContext";
const DEFAULT_LABEL_COLOR = {
  default: Colors.$textDefault,
  readonly: Colors.$textNeutral
};
const Label = ({
  label,
  labelColor = DEFAULT_LABEL_COLOR,
  labelStyle,
  labelProps,
  validationMessagePosition,
  floatingPlaceholder,
  showMandatoryIndication,
  enableErrors,
  testID
}) => {
  const context = useContext(FieldContext);
  const forceHidingLabel = enableErrors && !context.isValid && validationMessagePosition === ValidationMessagePosition.TOP;
  const style = useMemo(() => {
    return [styles.label, labelStyle, floatingPlaceholder && styles.dummyPlaceholder];
  }, [labelStyle, floatingPlaceholder]);
  const shouldRenderIndication = context.isMandatory && showMandatoryIndication;
  if ((label || floatingPlaceholder) && !forceHidingLabel) {
    return <Text testID={testID} color={getColorByState(labelColor, context)} style={style} recorderTag={'unmask'} {...labelProps}>
        {shouldRenderIndication ? label?.concat('*') : label}
      </Text>;
  }
  return null;
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