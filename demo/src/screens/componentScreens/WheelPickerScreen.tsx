import _ from 'lodash';
import React, {useCallback, useState} from 'react';
import {View, Text, Dialog, WheelPicker, WheelPickerAlign, Colors, Typography, Button} from 'react-native-ui-lib';

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
item => ({label: item, value: item, align: WheelPickerAlign.RIGHT}));

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

  const onChange = useCallback((value: number | string) => {
    setYearsValue(value as number);
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
          <WheelPicker
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
          <WheelPicker
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
          <Button size={Button.sizes.medium} label={'Previous'} marginR-20 onPress={() => updateYearsInitialValue(false)}/>
          <Button size={Button.sizes.medium} label={'Next'} onPress={() => updateYearsInitialValue(true)}/>
        </View>
      </View>

      <View center marginT-40>
        <Text h3 marginB-20>Days</Text>
        <Button size={Button.sizes.small} label={'Pick Days'} onPress={onPickDaysPress}/>
        <Dialog
          width={'90%'}
          bottom
          visible={showDialog}
          onDismiss={onDialogDismissed}
          headerProps={{showKnob: false, showDivider: false}}
        >
          <WheelPicker initialValue={5} label={'Days'} items={dayItems}/>
        </Dialog>
      </View>
    </View>
  );
};
