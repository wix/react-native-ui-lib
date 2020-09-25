import React, {useContext} from 'react';
import {TextStyle} from 'react-native';
import {Colors} from '../../style';
import Text, {TextPropTypes} from '../../components/text';
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
  labelProps?: TextPropTypes;
  validationMessagePosition?: ValidationMessagePosition;
}

const Label = ({
  label,
  labelColor = Colors.grey10,
  labelStyle,
  labelProps,
  validationMessagePosition
}: LabelProps) => {
  const context = useContext(FieldContext);

  const forceHidingLabel =
    !context.isValid &&
    validationMessagePosition === ValidationMessagePosition.TOP;

  if (label && !forceHidingLabel) {
    return (
      <Text
        color={getColorByState(labelColor, context)}
        style={labelStyle}
        {...labelProps}
      >
        {label}
      </Text>
    );
  }

  return null;
};

Label.displayName = 'Incubator.TextField';
export default Label;
