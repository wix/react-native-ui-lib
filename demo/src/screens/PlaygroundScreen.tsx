import React, {useState} from 'react';
import {View, Text, Checkbox, Picker, PickerValue} from 'react-native-ui-lib';

const STATUS = [
  {value: 1, label: 'Curious'},
  {value: 2, label: 'Engaged'},
  {value: 3, label: 'Satisfied'},
  {value: 4, label: 'Anticipative'},
  {value: 5, label: 'Elated'},
  {value: 6, label: 'Disappointed'}
];

export default function PlaygroundScreen() {
  const [statOption, setStatOption] = useState<PickerValue>([]);

  const onTopElementPress = (allOptionsSelected: boolean, setMultiDraftValue: any) => {
    if (allOptionsSelected) {
      setMultiDraftValue([]);
    } else {
      const allValues = STATUS.map(option => option.value);
      setMultiDraftValue(allValues);
    }
  };

  const renderCustomTopElement = (value?: PickerValue, setMultiDraftValue?: any) => {
    console.log(`inside renderCustomTopElement: ${value}`);
    const allOptionsSelected = Array.isArray(value) && value.length === STATUS.length;
    return (
      <View>
        <View padding-page spread row>
          <Text bodyBold>
            {value?.length} Selected Items{allOptionsSelected && `(All)`}
          </Text>
          <Checkbox
            indeterminate={!allOptionsSelected && value?.length > 0}
            value={value?.length > 0}
            onValueChange={() => onTopElementPress(allOptionsSelected, setMultiDraftValue)}
          />
        </View>
      </View>
    );
  };
  return (
    <View flex padding-page>
      <Picker
        mode={Picker.modes.MULTI}
        onChange={(items: PickerValue) => setStatOption(items as PickerValue)}
        placeholder="Choose Multiple Statuses"
        value={statOption}
        items={STATUS}
        renderCustomTopElement={renderCustomTopElement}
        showSearch
      />
    </View>
  );
}
