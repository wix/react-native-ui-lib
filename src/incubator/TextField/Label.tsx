import React, {useContext, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../style';
import Text from '../../components/text';
import {LabelProps, ValidationMessagePosition} from './types';
import {getColorByState} from './Presenter';
import FieldContext from './FieldContext';


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

  const style = useMemo(() => {
    return [styles.label, labelStyle, floatingPlaceholder && styles.dummyPlaceholder];
  }, [labelStyle, floatingPlaceholder]);

  if ((label || floatingPlaceholder) && !forceHidingLabel) {
    return (
      <Text
        testID={testID}
        color={getColorByState(labelColor, context)}
        style={style}
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
