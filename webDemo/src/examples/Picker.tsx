import React, {useState} from 'react';
import Picker from 'react-native-ui-lib/Picker';
import {Colors} from 'react-native-ui-lib/style';
import View from 'react-native-ui-lib/View';

const options = [
  {value: 'js', label: 'JavaScript'},
  {value: 'java', label: 'Java'},
  {value: 'python', label: 'Python'},
  {value: 'c++', label: 'C++', disabled: true},
  {value: 'perl', label: 'Perl'}
];

const PickerWrapper = () => {

  const [language, setLanguage] = useState(undefined);
  const [multiLanguage, setMultiLanguage] = useState(undefined);

  return (
    <View>
      <View>
        <Picker
          placeholder="Favorite Language"
          floatingPlaceholder
          value={language}
          enableModalBlur={false}
          onChange={setLanguage}
          topBarProps={{title: 'Languages'}}
          showSearch
          fieldType={Picker.fieldTypes.filter}
          searchPlaceholder={'Search a language'}
          searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.grey50}}
          migrateTextField
        >
          {options.map(option => (
            <Picker.Item key={option.value} value={option} label={''} disabled={option.disabled}/>
          ))}
        </Picker>
      </View>
      <View marginT-25>
        <Picker
          placeholder="Favorite Language (Multi)"
          floatingPlaceholder
          value={multiLanguage}
          enableModalBlur={false}
          onChange={setMultiLanguage}
          topBarProps={{title: 'Languages'}}
          showSearch
          mode={Picker.modes.MULTI}
          selectionLimit={3}
          fieldType={Picker.fieldTypes.filter}
          searchPlaceholder={'Search a language'}
          searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.grey50}}
          migrateTextField
        >
          {options.map(option => (
            <Picker.Item key={option.value} value={option} label={''} disabled={option.disabled}/>
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default PickerWrapper;

