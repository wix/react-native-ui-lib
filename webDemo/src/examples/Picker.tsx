import React, {useState} from 'react';
import {Picker, Colors, View, Text} from 'react-native-ui-lib';

const options = [
  {label: 'JavaScript', value: 'js'},
  {label: 'Java', value: 'java'},
  {label: 'Python', value: 'python'},
  {label: 'C++', value: 'c++', disabled: true},
  {label: 'Perl', value: 'perl'}
];

const filters = [
  {value: 1, label: 'All'},
  {value: 2, label: 'Accessories'},
  {value: 3, label: 'Outwear'},
  {value: 4, label: 'Footwear'},
  {value: 5, label: 'Swimwear'},
  {value: 6, label: 'Tops'}
];

const PickerWrapper = () => {
  const [language, setLanguage] = useState(undefined);
  const [filter, setFilter] = useState(undefined);

  return (
    <View marginT-s2>
      <Text text80BO marginT-s1 center>Single Value Picker</Text>
      <View marginB-s2>
        <Picker
          placeholder="Favorite Language"
          floatingPlaceholder
          value={language}
          enableModalBlur={false}
          onChange={setLanguage}
          topBarProps={{title: 'Languages'}}
          showSearch
          searchPlaceholder={'Search a language'}
          searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.grey50}}
          migrateTextField
        >
          {options.map(option => (
            <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled}/>
          ))}
        </Picker>
      </View>
      <Text text80BO center>Multi Value Picker</Text>
      <View>
        <Picker
          placeholder="Favorite Filters"
          floatingPlaceholder
          value={filter}
          enableModalBlur={false}
          onChange={setFilter}
          topBarProps={{title: 'Filters'}}
          mode={Picker.modes.MULTI}
          showSearch
          searchPlaceholder={'Search a filter'}
          searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.grey50}}
          migrateTextField
        >
          {filters.map(filter => (
            <Picker.Item key={filter.value} value={filter.value} label={filter.label} disabled={filter.disabled}/>
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default PickerWrapper;
