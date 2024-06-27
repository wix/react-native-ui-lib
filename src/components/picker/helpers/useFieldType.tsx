import _ from 'lodash';
import React, {useMemo} from 'react';
import Icon from '../../icon';
import Text from '../../text';
import View from '../../view';
import {PickerProps, PickerFieldTypes} from '../types';
import {Typography} from '../../../style';

type UseFieldTypeProps = Pick<
  PickerProps,
  'fieldType' | 'preset' | 'trailingAccessory' | 'label' | 'placeholder' | 'style' | 'labelStyle' | 'testID'
>;

const dropdown = require('../assets/dropdown.png');

const useFieldType = (props: UseFieldTypeProps) => {
  const {fieldType, preset, trailingAccessory, label, placeholder, style, labelStyle, testID} = props;

  const propsByFieldType = useMemo(() => {
    if (fieldType === PickerFieldTypes.filter) {
      return {
        preset: preset || null,
        containerStyle: {flexDirection: 'row'},
        labelStyle: Typography.text70,
        trailingAccessory: trailingAccessory ?? <Icon marginL-s1 source={dropdown}/>
      };
    } else if (fieldType === PickerFieldTypes.settings) {
      return {
        preset: preset || null,
        label: undefined
      };
    }
  }, [fieldType, preset, trailingAccessory]);

  const pickerInnerInput = useMemo(() => {
    if (fieldType === PickerFieldTypes.filter) {
      return (
        <Text text70 numberOfLines={1} style={style} testID={`${testID}.filter.type.label`}>
          {_.isEmpty(label) ? placeholder : label}
        </Text>
      );
    } else if (fieldType === PickerFieldTypes.settings) {
      return (
        <View flexG row spread>
          <Text text70 style={labelStyle} testID={`${testID}.settings.type.label`}>
            {label}
          </Text>
          <Text text70 $textPrimary style={style} testID={`${testID}.settings.type.placeholder`}>
            {_.isEmpty(label) ? placeholder : label}
          </Text>
        </View>
      );
    }
  }, [style, labelStyle, fieldType, placeholder, label]);

  return {propsByFieldType, pickerInnerInput};
};

export default useFieldType;
