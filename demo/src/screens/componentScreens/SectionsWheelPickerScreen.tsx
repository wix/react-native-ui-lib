import _ from 'lodash';
import React, {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {Text, View, SectionsWheelPicker, SegmentedControl, Button, Incubator} from 'react-native-ui-lib';

const SectionsWheelPickerScreen = () => {
  const [numOfSections, setNumOfSections] = useState(1);

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

    numOfSections === 3
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
      : numOfSections === 2
        ? Alert.alert('Your chosen duration is:\n' + selectedDays + ' ' + days + ' and ' + selectedHours + ' ' + hours)
        : Alert.alert('Your chosen duration is:\n' + selectedDays + ' ' + days);
  };

  const onResetPress = () => {
    setSelectedDays(0);
    setSelectedHours(0);
    setSelectedMinutes(0);
  };

  const sections: Incubator.WheelPickerProps[] = [
    {
      items: getItems(days),
      onChange: onDaysChange,
      selectedValue: selectedDays,
      label: 'Days',
      style: numOfSections === 1 ? {flex: 1} : {flex: 1, alignItems: 'flex-end'}
    },
    {
      items: getItems(hours),
      onChange: onHoursChange,
      selectedValue: selectedHours,
      label: 'Hrs',
      style: numOfSections === 2 ? {flex: 1, alignItems: 'flex-start'} : undefined
    },
    {
      items: getItems(minutes),
      onChange: onMinutesChange,
      selectedValue: selectedMinutes,
      label: 'Mins',
      style: {flex: 1, alignItems: 'flex-start'}
    }
  ];

  const sectionsToPresent = _.slice(sections, 0, numOfSections);

  const onChangeIndex = (index: number) => {
    return setNumOfSections(index + 1);
  };

  return (
    <View>
      <Text text40 marginL-10 marginT-20>
        Sections Wheel Picker
      </Text>
      <View centerH marginT-40>
        <SegmentedControl
          segments={[{label: '1 section'}, {label: '2 sections'}, {label: '3 sections'}]}
          onChangeIndex={onChangeIndex}
        />
        <Text text50 marginV-20>
          Pick a duration
        </Text>
      </View>
      <SectionsWheelPicker sections={sectionsToPresent}/>
      <Button marginH-150 marginT-40 label={'Save'} onPress={onSavePress}/>
      <Button marginH-150 marginT-15 label={'Reset'} onPress={onResetPress}/>
    </View>
  );
};

export default SectionsWheelPickerScreen;
