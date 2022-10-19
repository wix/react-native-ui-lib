import React, {useState} from 'react';
import Picker from 'react-native-ui-lib/Picker';
import {Colors} from 'react-native-ui-lib/style';

const options = [
  {label: 'JavaScript', value: 'js'},
  {label: 'Java', value: 'java'},
  {label: 'Python', value: 'python'},
  {label: 'C++', value: 'c++', disabled: true},
  {label: 'Perl', value: 'perl'}
];

const PickerWrapper = () => {

  const [language, setLanguage] = useState(undefined);

  return (
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
        <Picker.Item key={option.value} value={option} label={''} disabled={option.disabled}/>
      ))}
    </Picker>
  );
};

export default PickerWrapper;
