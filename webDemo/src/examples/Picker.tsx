import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker, Colors, View, Text, Incubator, PickerProps, PanningProvider} from 'react-native-ui-lib';

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

const schemes = [
  {label: 'Default', value: 1},
  {label: 'Light', value: 2},
  {label: 'Dark', value: 3}
];

const PickerWrapper = () => {
  const [language, setLanguage] = useState(undefined);
  const [filter, setFilter] = useState(undefined);
  const [customModalValues, setCustomModalValues] = useState(undefined);
  const renderDialog: PickerProps['renderCustomModal'] = (modalProps: any) => {
    const {visible, children, toggleModal, onDone} = modalProps;

    return (
      <Incubator.Dialog
        visible={visible}
        onDismiss={() => {
          onDone();
          toggleModal(false);
        }}
        width="100%"
        height="45%"
        bottom
        useSafeArea
        containerStyle={{backgroundColor: Colors.$backgroundDefault}}
        direction={PanningProvider.Directions.DOWN}
        headerProps={{title: 'Custom modal'}}
      >
        <ScrollView>{children}</ScrollView>
      </Incubator.Dialog>
    );
  };

  return (
    <View marginT-s2>
      <Text text80BO marginT-s1 center>
        Single Value Picker
      </Text>
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
      <Text text80BO center>
        Multi Value Picker
      </Text>
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
      <Text text80BO center>
        Dialog Picker
      </Text>
      <View>
        <Picker
          placeholder="Pick multiple schemes"
          value={customModalValues}
          onChange={items => setCustomModalValues(items)}
          mode={Picker.modes.MULTI}
          renderCustomModal={renderDialog}
        >
          {schemes.map(option => (
            <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled}/>
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default PickerWrapper;
