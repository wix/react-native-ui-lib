import _ from 'lodash';
import React, {useCallback, useState} from 'react';
import {View, Text, Incubator, Colors, Typography, Button} from 'react-native-ui-lib';

const monthItems = _.map([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
],
item => ({label: item, value: item, align: Incubator.WheelPickerAlign.RIGHT}));

const yearItems = _.times(2050, i => i)
  .reverse()
  .map(item => ({label: `${item}`, value: item}));
const dayItems = _.times(31, i => i + 1).map(day => ({label: `${day}`, value: day}));

export default () => {
  const [showDialog, setShowDialog] = useState(false);
  const [yearsValue, setYearsValue] = useState(2022);

  const updateYearsInitialValue = useCallback((increaseYears: boolean) => {
    increaseYears ? setYearsValue(Math.min(yearsValue + 1, 2049)) : setYearsValue(Math.max(yearsValue - 1, 0));
  },
  [yearsValue]);

  const onChange = useCallback((value) => {
    setYearsValue(value);
  }, []);

  const onPickDaysPress = useCallback(() => {
    setShowDialog(true);
  }, []);

  const onDialogDismissed = useCallback(() => {
    setShowDialog(false);
  }, []);

  return (
    <View flex padding-page>
      <Text h1>Wheel Picker</Text>

      <View row center marginT-30>
        <View center>
          <Text h3>Months</Text>
          <Incubator.WheelPicker
            initialValue={'February'}
            activeTextColor={Colors.$textPrimary}
            inactiveTextColor={Colors.$textNeutralHeavy}
            items={monthItems}
            textStyle={Typography.text60R}
            numberOfVisibleRows={3} 
          />
        </View>

        <View center>
          <Text h3>Years</Text>
          <Incubator.WheelPicker
            numberOfVisibleRows={3} 
            initialValue={yearsValue} 
            items={yearItems}
            onChange={onChange}
          />
        </View>
      </View>

      <View center marginT-30>
        <Text body>
          Move the wheel programmatically
        </Text>
        <Text bodySmall $textNeutral>
          (by updating the initialValue prop)
        </Text>
        <View marginT-10 row>
          <Button size="medium" label={'Previous'} marginR-20 onPress={() => updateYearsInitialValue(false)}/>
          <Button size="medium" label={'Next'} onPress={() => updateYearsInitialValue(true)}/>
        </View>
      </View>

      <View center marginT-40>
        <Text h3 marginB-20>Days</Text>
        <Button size="small" label={'Pick Days'} onPress={onPickDaysPress}/>
        <Incubator.Dialog
          width={'90%'}
          bottom
          visible={showDialog}
          onDismiss={onDialogDismissed}
          headerProps={{showKnob: false, showDivider: false}}
        >
          <Incubator.WheelPicker initialValue={5} label={'Days'} items={dayItems}/>
        </Incubator.Dialog>
      </View>
    </View>
  );
};
