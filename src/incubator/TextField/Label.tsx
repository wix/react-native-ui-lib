import React, {useContext} from 'react';
import {TextStyle} from 'react-native';
import {Colors} from '../../style';
import Text, {TextPropTypes} from '../../components/text';
import {ColorType} from './types';
import {getColorByState} from './Presenter';
import FieldContext from './FieldContext';

export interface LabelProps {
  label: string;
  labelColor?: ColorType;
  labelStyle?: TextStyle;
  labelProps?: TextPropTypes;
}

export default ({
  label,
  labelColor = Colors.grey10,
  labelStyle,
  labelProps
}: LabelProps) => {
  const context = useContext(FieldContext);

  return (
    <Text
      color={getColorByState(labelColor, context)}
      style={labelStyle}
      {...labelProps}
    >
      {label}
    </Text>
  );
};
