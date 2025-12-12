import _ from 'lodash';
import React, {useState, useCallback, useMemo} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {
  Text,
  View,
  SectionsWheelPicker,
  SegmentedControl,
  Button,
  WheelPicker,
  WheelPickerProps,
  Constants,
  Switch,
  Colors
} from 'react-native-ui-lib';

const DAYS = _.times(10, i => i);
const HOURS = _.times(24, i => i);
const MINUTES = _.times(60, i => i);

const SectionsWheelPickerScreen = () => {
  const [numOfSections, setNumOfSections] = useState(1);
  const [disableRTL, setDisableRTL] = useState(false);
  const [selectedDays, setSelectedDays] = useState(0);
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  const shouldDisableRTL = useMemo(() => {
    return Constants.isRTL && disableRTL;
  }, [disableRTL]);

  const getItems = useCallback((values: (number | string)[]) => {
    return _.map(values, item => ({label: '' + item, value: item}));
  }, []);

  const onDaysChange = useCallback((item: number | string) => {
    setSelectedDays(item as number);
  }, []);

  const onHoursChange = useCallback((item: number | string) => {
    setSelectedHours(item as number);
  }, []);

  const onMinutesChange = useCallback((item: number | string) => {
    setSelectedMinutes(item as number);
  }, []);

  const onSavePress = useCallback(() => {
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
  }, [numOfSections, selectedDays, selectedHours, selectedMinutes]);

  const onResetPress = useCallback(() => {
    setSelectedDays(0);
    setSelectedHours(0);
    setSelectedMinutes(0);
  }, []);

  const sections: WheelPickerProps<string | number>[] = useMemo(() => {
    return [
      {
        items: getItems(DAYS),
        onChange: onDaysChange,
        initialValue: selectedDays,
        label: Constants.isRTL ? 'ימים' : 'Days',
        align:
          numOfSections === 1
            ? WheelPicker.alignments.CENTER
            : shouldDisableRTL
              ? WheelPicker.alignments.LEFT
              : WheelPicker.alignments.RIGHT,
        style: {
          flex: 1,
          flexDirection: numOfSections !== 1 && Constants.isRTL && !disableRTL ? 'row-reverse' : undefined
        }
      },
      {
        items: getItems(HOURS),
        onChange: onHoursChange,
        initialValue: selectedHours,
        label: Constants.isRTL ? 'שעות' : 'Hrs',
        align:
          numOfSections === 2
            ? shouldDisableRTL
              ? WheelPicker.alignments.RIGHT
              : WheelPicker.alignments.LEFT
            : WheelPicker.alignments.CENTER,
        style: numOfSections === 2 ? {flex: 1, flexDirection: shouldDisableRTL ? 'row-reverse' : 'row'} : undefined
      },
      {
        items: getItems(MINUTES),
        onChange: onMinutesChange,
        initialValue: selectedMinutes,
        label: Constants.isRTL ? 'דקות' : 'Mins',
        align: shouldDisableRTL ? WheelPicker.alignments.RIGHT : WheelPicker.alignments.LEFT,
        style: {flex: 1, flexDirection: shouldDisableRTL ? 'row-reverse' : 'row'}
      }
    ];
  }, [
    getItems,
    disableRTL,
    selectedDays,
    selectedHours,
    selectedMinutes,
    onDaysChange,
    onHoursChange,
    onMinutesChange,
    numOfSections,
    shouldDisableRTL
  ]);

  const sectionsToPresent = useMemo(() => _.slice(sections, 0, numOfSections), [numOfSections, sections]);

  const timeSections = useMemo(() => {
    return [
      {
        items: getItems(_.times(24, i => i + 1))
      },
      {
        items: getItems(_.times(12, i => {
          if (i < 2) {
            return `0${i * 5}`;
          }
          return i * 5;
        }))
      }
    ];
  }, [getItems]);

  const onChangeIndex = useCallback((index: number) => {
    return setNumOfSections(index + 1);
  }, []);

  const updateDisableRTLValue = useCallback((value: boolean) => {
    setDisableRTL(value);
  }, []);

  return (
    <View>
      <Text text40 marginL-10 marginT-20>
        Sections Wheel Picker
      </Text>
      <View row center style={styles.bottomDivider}>
        <Text margin-s5> Disable RTL</Text>
        <Switch value={shouldDisableRTL} onValueChange={updateDisableRTLValue}/>
      </View>
      <View centerH marginT-20>
        <Text text60 marginB-20>
          Pick a duration
        </Text>
        <SegmentedControl
          segments={[{label: '1 section'}, {label: '2 sections'}, {label: '3 sections'}]}
          onChangeIndex={onChangeIndex}
          throttleTime={400}
        />
      </View>
      <SectionsWheelPicker numberOfVisibleRows={4} disableRTL={disableRTL} sections={sectionsToPresent}/>
      <View paddingB-20 center spread row style={styles.bottomDivider}>
        <Button marginR-40 link label={'Save'} onPress={onSavePress}/>
        <Button label={'Reset'} link onPress={onResetPress}/>
      </View>
      <View>
        <Text center text60 marginV-20>
          Pick a time
        </Text>
        <SectionsWheelPicker disableRTL={disableRTL} sections={timeSections}/>
      </View>
    </View>
  );
};

export default SectionsWheelPickerScreen;

const styles = StyleSheet.create({
  bottomDivider: {
    borderBottomColor: Colors.$outlineDefault,
    borderBottomWidth: 4
  }
});
