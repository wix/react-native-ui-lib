import _ from 'lodash';
import React, {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {Text, View, SectionsWheelPicker, SegmentedControl, Button} from 'react-native-ui-lib';
import {WheelPickerProps} from '../../../../src/incubator/WheelPicker';

const SectionsWheelPickerScreen = () => {
  const [showMinutes, setShowMinutes] = useState(false);

  const [selectedDays, setSelectedDays] = useState(0);
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  const days = _.times(10, i => i);
  const hours = _.times(24, i => i);
  const minutes = _.times(60, i => i);

  const getItems = useCallback(values => {
    return _.map(values, item => ({label: '' + item, value: item}));
  }, []);

  const onDaysChange = (item: number | string) => {
    setSelectedDays(item as number);
  };

  const onHoursChange = (item: number | string) => {
    setSelectedHours(item as number);
  };

  const onMinutesChange = (item: number | string) => {
    setSelectedMinutes(item as number);
  };

  const onSavePress = () => {
    const days = selectedDays === 1 ? 'day' : 'days';
    const hours = selectedHours === 1 ? 'hour' : 'hours';
    const minutes = selectedMinutes === 1 ? 'minute' : 'minutes';

    showMinutes
      ? Alert.alert('Your chosen duration is:\n' +
            selectedDays +
            ' ' +
            days +
            ', ' +
            selectedHours +
            ' ' +
            hours +
            ' and ' +
            selectedMinutes +
            ' ' +
            minutes)
      : Alert.alert('Your chosen duration is:\n' + selectedDays + ' ' + days + ' and ' + selectedHours + ' ' + hours);
  };

  const onResetPress = () => {
    setSelectedDays(0);
    setSelectedHours(0);
    setSelectedMinutes(0);
  };

  const getLabel = (label: string) => {
    switch (label) {
      case 'days':
        return selectedDays === 1 ? 'Day' : 'Days';
      case 'hours':
        return selectedHours === 1 ? 'Hr' : 'Hrs';
      case 'minutes':
      default:
        return selectedMinutes === 1 ? 'Min' : 'Mins';
    }
  };

  const sections: WheelPickerProps[] = [
    {items: getItems(days), onChange: onDaysChange, selectedValue: selectedDays, label: getLabel('days')},
    {items: getItems(hours), onChange: onHoursChange, selectedValue: selectedHours, label: getLabel('hours')},
    {
      items: getItems(minutes),
      onChange: onMinutesChange,
      selectedValue: selectedMinutes,
      label: getLabel('minutes')
    }
  ];

  const sectionsToPresent = showMinutes ? sections : _.slice(sections, 0, 2);

  const onChangeIndex = (index: number) => {
    return index === 0 ? setShowMinutes(false) : setShowMinutes(true);
  };

  return (
    <View>
      <Text text40 marginL-10 marginT-20>
        Sections Wheel Picker
      </Text>
      <View centerH marginT-40>
        <SegmentedControl segments={[{label: '2 sections'}, {label: '3 sections'}]} onChangeIndex={onChangeIndex}/>
        <Text text50 marginV-20>
          Pick a duration
        </Text>
      </View>
      <SectionsWheelPicker sections={sectionsToPresent}/>
      <Button marginH-150 marginT-300 label={'Save'} onPress={onSavePress}/>
      <Button marginH-150 marginT-15 label={'Reset'} onPress={onResetPress}/>
    </View>
  );
};

export default SectionsWheelPickerScreen;
