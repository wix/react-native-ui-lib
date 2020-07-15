import React, {useContext} from 'react';
import {Colors} from '../../style';
import Text, {TextPropTypes} from '../../components/text';
import {ColorType} from './types';
import {getColorByState} from './Presenter';
import FieldContext from './FieldContext';

export interface LabelProps {
  label: string;
  labelColor?: ColorType;
  labelProps?: TextPropTypes;
}

export default ({
  label,
  labelColor = Colors.grey10,
  labelProps
}: LabelProps) => {
  const context = useContext(FieldContext);

  return (
    <Text {...labelProps} color={getColorByState(labelColor, context)}>
      {label}
    </Text>
  );
};
