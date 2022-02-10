import React, {useContext} from 'react';
import {StyleSheet, TextStyle} from 'react-native';
import {Colors} from '../../style';
import Text, {TextProps} from '../../components/text';
import {ColorType, ValidationMessagePosition} from './types';
import {getColorByState} from './Presenter';
import FieldContext from './FieldContext';

export interface LabelProps {
  /**
   * Field label
   */
  label?: string;
  /**
   * Field label color. Either a string or color by state map ({default, focus, error, disabled})
   */
  labelColor?: ColorType;
  /**
   * Custom style for the field label
   */
  labelStyle?: TextStyle;
  /**
   * Pass extra props to the label Text element
   */
  labelProps?: TextProps;
  validationMessagePosition?: ValidationMessagePosition;
  floatingPlaceholder?: boolean;
  testID?: string;
}

const Label = ({
  label,
  labelColor = Colors.$textDefault,
  labelStyle,
  labelProps,
  validationMessagePosition,
  floatingPlaceholder,
  testID
}: LabelProps) => {
  const context = useContext(FieldContext);

  const forceHidingLabel = !context.isValid && validationMessagePosition === ValidationMessagePosition.TOP;

  if ((label || floatingPlaceholder) && !forceHidingLabel) {
    return (
      <Text
        testID={testID}
        color={getColorByState(labelColor, context)}
        style={[styles.label, labelStyle, floatingPlaceholder && styles.dummyPlaceholder]}
        {...labelProps}
      >
        {label}
      </Text>
    );
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
