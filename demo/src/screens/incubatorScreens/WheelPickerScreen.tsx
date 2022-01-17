import React, {useCallback, useState} from 'react';
import {View, Text, Incubator, Colors, Typography, Button, Dialog} from 'react-native-ui-lib';
import _ from 'lodash';

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
item => ({label: item, value: item}));

const yearItems = _.times(2030, i => i)
  .reverse()
  .map(item => ({label: `${item}`, value: item}));
const dayItems = _.times(31, i => i + 1).map(day => ({label: `${day}`, value: day}));

export default () => {
  const [showDialog, setShowDialog] = useState(false);

  const onPickDaysPress = useCallback(() => {
    setShowDialog(true);
  }, []);

  const onDialogDismissed = useCallback(() => {
    setShowDialog(false);
  }, []);

  return (
    <View flex padding-page>
      <Text h1>Wheel Picker</Text>

      <View marginT-s5 centerH>
        <Text h3>Months</Text>
        <Incubator.WheelPicker
          initialValue={'February'}
          activeTextColor={Colors.primary}
          inactiveTextColor={Colors.grey20}
          items={monthItems}
          textStyle={Typography.text60R}
        />

        <Text h3>Years</Text>
        <Text bodySmall grey30>
          (Uncontrolled, initialValue passed)
        </Text>
        <View width={'100%'} marginT-s3>
          <Incubator.WheelPicker numberOfVisibleRows={3} initialValue={2022} items={yearItems}/>
        </View>
      </View>

      <View marginB-s10>
        <Button marginT-40 label={'Pick Days'} marginH-100 onPress={onPickDaysPress}/>
        <Dialog width={'90%'} height={260} bottom visible={showDialog} onDismiss={onDialogDismissed}>
          <Incubator.WheelPicker initialValue={5} label={'Days'} items={dayItems}/>
        </Dialog>
      </View>
    </View>
  );
};
