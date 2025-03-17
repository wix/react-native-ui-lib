import _ from 'lodash';
import React, {useMemo} from 'react';
import {Typography, Colors} from '../../../style';
import View from '../../view';
import Text from '../../text';
import Icon from '../../icon';
import Assets from '../../../assets';
import {PickerProps, PickerFieldTypes} from '../types';

type UseFieldTypeProps = Pick<
  PickerProps,
  'fieldType' | 'preset' | 'trailingAccessory' | 'value' | 'label' | 'placeholder' | 'style' | 'labelStyle' | 'testID'
>;

const useFieldType = (props: UseFieldTypeProps) => {
  const {fieldType, preset, trailingAccessory, value, placeholder, style, label, labelStyle, testID} = props;

  const propsByFieldType = useMemo(() => {
    if (fieldType === PickerFieldTypes.filter) {
      return {
        preset: preset || null,
        containerStyle: {flexDirection: 'row'},
        label,
        labelStyle: {...Typography.text70, color: Colors.$textNeutral},
        trailingAccessory: trailingAccessory ?? <Icon marginL-s1 source={Assets.internal.icons.chevronDown}/>
      };
    } else if (fieldType === PickerFieldTypes.settings) {
      return {
        preset: preset || null,
        label: undefined
      };
    }
  }, [fieldType, preset, trailingAccessory, label]);

  const pickerInnerInput = useMemo(() => {
    if (fieldType === PickerFieldTypes.filter) {
      return (
        <Text text70 numberOfLines={1} style={style} testID={`${testID}.filter.type.label`}>
          {_.isEmpty(value) ? placeholder : value}
        </Text>
      );
    } else if (fieldType === PickerFieldTypes.settings) {
      return (
        <View flexG row spread>
          <Text text70 style={labelStyle} testID={`${testID}.settings.type.label`}>
            {label || placeholder}
          </Text>
          <Text text70 $textPrimary style={style} testID={`${testID}.settings.type.placeholder`}>
            {_.isEmpty(value) ? placeholder : value}
          </Text>
        </View>
      );
    }
  }, [style, labelStyle, fieldType, placeholder, value, label, testID]);

  return {propsByFieldType, pickerInnerInput};
};

export default useFieldType;
