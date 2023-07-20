import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {
  View,
  Colors,
  Icon,
  Incubator,
  Text,
  Picker,
  Avatar,
  Assets,
  PanningProvider,
  Typography,
  PickerProps,
  PickerMethods,
  Button
} from 'react-native-ui-lib'; //eslint-disable-line
import contactsData from '../../data/conversations';
import {longOptions} from './PickerScreenLongOptions';

const tagIcon = require('../../assets/icons/tags.png');
const dropdown = require('../../assets/icons/chevronDown.png');
const dropdownIcon = <Icon source={dropdown} tintColor={Colors.$iconDefault}/>;

const contacts = _.map(contactsData, (c, index) => ({...c, value: index, label: c.name}));

const options = [
  {label: 'JavaScript', value: 'js'},
  {label: 'Java', value: 'java'},
  {label: 'Python', value: 'python'},
  {label: 'C++', value: 'c++', disabled: true},
  {label: 'Perl', value: 'perl'}
];
const filters = [
  {label: 'All', value: 0},
  {label: 'Draft', value: 1},
  {label: 'Published', value: 2},
  {label: 'Scheduled', value: 3}
];

const schemes = [
  {label: 'Default', value: 1},
  {label: 'Light', value: 2},
  {label: 'Dark', value: 3}
];

export default class PickerScreen extends Component {
  picker = React.createRef<PickerMethods>();
  state = {
    itemsCount: 1,
    // language: {value: 'java', label: 'Java'},
    language: undefined,
    language2: options[2].value,
    languages: [],
    nativePickerValue: 'java',
    customModalValues: [],
    filter: filters[0].value,
    scheme: schemes[0].value,
    contact: 0
  };

  renderDialog: PickerProps['renderCustomModal'] = modalProps => {
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

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View flex padding-20>
          <Text text40 $textDefault>
            Picker
          </Text>
          <Picker
            placeholder="Favorite Language"
            floatingPlaceholder
            value={this.state.language}
            enableModalBlur={false}
            onChange={item => this.setState({language: item})}
            topBarProps={{title: 'Languages'}}
            // style={{color: Colors.red20}}
            showSearch
            searchPlaceholder={'Search a language'}
            searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.grey50}}
            // onSearchChange={value => console.warn('value', value)}
          >
            {_.map(longOptions, option => (
              <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled}/>
            ))}
          </Picker>

          <Picker
            placeholder="Favorite Languages (up to 3)"
            value={this.state.languages}
            onChange={items => this.setState({languages: items})}
            mode={Picker.modes.MULTI}
            selectionLimit={3}
            trailingAccessory={dropdownIcon}
          >
            {_.map(options, option => (
              <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled}/>
            ))}
          </Picker>

          <Picker
            label="Wheel Picker"
            placeholder="Pick a Language"
            useWheelPicker
            // useWheelPicker
            value={this.state.nativePickerValue}
            onChange={nativePickerValue => this.setState({nativePickerValue})}
            trailingAccessory={<Icon source={dropdown}/>}
            // containerStyle={{marginTop: 20}}
            // renderPicker={() => {
            //   return (
            //     <View>
            //       <Text>Open Native Picker!</Text>
            //     </View>
            //   );
            // }}
            // topBarProps={{doneLabel: 'YES', cancelLabel: 'NO'}}
          >
            {_.map(options, option => (
              <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled}/>
            ))}
          </Picker>

          <Picker
            label="Custom modal"
            placeholder="Pick multiple Languages"
            value={this.state.customModalValues}
            onChange={items => this.setState({customModalValues: items})}
            mode={Picker.modes.MULTI}
            trailingAccessory={dropdownIcon}
            renderCustomModal={this.renderDialog}
          >
            {_.map(options, option => (
              <Picker.Item
                key={option.value}
                value={option.value}
                label={option.label}
                labelStyle={Typography.text65}
                disabled={option.disabled}
              />
            ))}
          </Picker>

          <Text marginB-10 text70 $textDefault>
            Custom Picker:
          </Text>
          <Picker
            value={this.state.filter}
            onChange={filter => this.setState({filter})}
            renderPicker={(_value?: any, label?: string) => {
              return (
                <View row>
                  <Icon
                    style={{marginRight: 1, height: 16, resizeMode: 'contain'}}
                    source={tagIcon}
                    tintColor={Colors.$iconDefault}
                  />
                  <Text $textDefault text80>
                    {label} Posts
                  </Text>
                </View>
              );
            }}
          >
            {_.map(filters, filter => (
              <Picker.Item key={filter.value} value={filter.value} label={filter.label}/>
            ))}
          </Picker>

          <Text marginT-20 marginB-10 text70 $textDefault>
            Custom Picker Items:
          </Text>
          <Picker
            ref={this.picker}
            value={this.state.contact}
            onChange={contact => {
              this.setState({contact});
            }}
            // getItemValue={contact => contact?.value}
            renderPicker={(contactValue?: number) => {
              const contact = contacts[contactValue!] ?? undefined;
              return (
                <View row>
                  {contact ? (
                    <>
                      <Avatar size={30} source={{uri: contact?.thumbnail}}/>
                      <Text text70 marginL-10 $textDefault>
                        {contact?.name}
                      </Text>
                    </>
                  ) : (
                    <Text text70 $textNeutral>
                      Pick a contact
                    </Text>
                  )}
                </View>
              );
            }}
          >
            {_.map(contacts, contact => (
              <Picker.Item
                key={contact.name}
                value={contact.value}
                label={contact.label}
                renderItem={(contactValue, props) => {
                  const contact = contacts[contactValue as number];
                  return (
                    <View
                      style={{
                        height: 56,
                        borderBottomWidth: 1,
                        borderColor: Colors.$backgroundNeutral
                      }}
                      paddingH-15
                      row
                      centerV
                      spread
                    >
                      <View row centerV>
                        <Avatar size={35} source={{uri: contact?.thumbnail}}/>
                        <Text marginL-10 text70 $textDefault>
                          {contact?.name}
                        </Text>
                      </View>
                      {props.isSelected && <Icon source={Assets.icons.check} tintColor={Colors.$iconDefault}/>}
                    </View>
                  );
                }}
                getItemLabel={contactValue => contacts[contactValue as number]?.name}
              />
            ))}
          </Picker>

          <Button
            label="Open Picker Manually"
            link
            style={{alignSelf: 'flex-start'}}
            onPress={() => this.picker.current?.openExpandable?.()}
          />

          <Text text60 marginT-s5>
            Different Field Types
          </Text>
          <Text text80 marginB-s5>
            (Form/Filter/Settings)
          </Text>

          <Picker
            value={this.state.filter}
            onChange={value => this.setState({filter: value})}
            placeholder="Filter posts"
            fieldType={Picker.fieldTypes.filter}
            marginB-s3
          >
            {filters.map(filter => (
              <Picker.Item key={filter.value} {...filter}/>
            ))}
          </Picker>

          <Picker
            value={this.state.scheme}
            onChange={value => this.setState({scheme: value})}
            label="Color Scheme"
            placeholder="Filter posts"
            fieldType={Picker.fieldTypes.settings}
          >
            {schemes.map(scheme => (
              <Picker.Item key={scheme.value} {...scheme}/>
            ))}
          </Picker>
        </View>
      </ScrollView>
    );
  }
}
