import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {
  View,
  Colors,
  Icon,
  Dialog,
  Text,
  Picker,
  Avatar,
  Assets,
  PanningProvider,
  Typography,
  PickerProps,
  PickerMethods,
  DialogProps,
  Button
} from 'react-native-ui-lib'; //eslint-disable-line
import contactsData from '../../data/conversations';
import {longOptions} from './PickerScreenLongOptions';

const tagIcon = require('../../assets/icons/tags.png');
const dropdown = require('../../assets/icons/chevronDown.png');

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

export default class PickerScreen extends Component {
  picker = React.createRef<PickerMethods>();
  state = {
    itemsCount: 1,
    // language: {value: 'java', label: 'Java'},
    language: undefined,
    language2: options[2].value, // for migrated picker example
    languages: [],
    nativePickerValue: 'java',
    customModalValues: [],
    filter: filters[0],
    contact: 0
  };

  dialogHeader: DialogProps['renderPannableHeader'] = props => {
    const {title} = props;
    return (
      <Text margin-15 text60>
        {title}
      </Text>
    );
  };

  renderDialog: PickerProps['renderCustomModal'] = modalProps => {
    const {visible, children, toggleModal, onDone} = modalProps;

    return (
      <Dialog
        visible={visible}
        onDismiss={() => {
          onDone();
          toggleModal(false);
        }}
        width="100%"
        height="45%"
        bottom
        useSafeArea
        containerStyle={{backgroundColor: Colors.white}}
        renderPannableHeader={this.dialogHeader}
        panDirection={PanningProvider.Directions.DOWN}
        pannableHeaderProps={{title: 'Custom modal'}}
      >
        <ScrollView>{children}</ScrollView>
      </Dialog>
    );
  };

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View flex padding-20>
          <Text text40>Picker</Text>
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
              <Picker.Item key={option.value} value={option} label={''} disabled={option.disabled}/>
            ))}
          </Picker>

          <Picker
            placeholder="Favorite Languages (up to 3)"
            value={this.state.languages}
            onChange={items => this.setState({languages: items})}
            mode={Picker.modes.MULTI}
            selectionLimit={3}
            rightIconSource={dropdown}
          >
            {_.map(options, option => (
              <Picker.Item key={option.value} value={option} label={''} disabled={option.disabled}/>
            ))}
          </Picker>

          <Picker
            title="Native Picker"
            placeholder="Pick a Language"
            useNativePicker
            value={this.state.nativePickerValue}
            onChange={nativePickerValue => this.setState({nativePickerValue})}
            rightIconSource={dropdown}
            // containerStyle={{marginTop: 20}}
            // renderPicker={() => {
            //   return (
            //     <View>
            //       <Text>Open Native Picker!</Text>
            //     </View>
            //   );
            // }}
            // renderNativePicker={props => {
            //   return (
            //     <View flex bg-red50>
            //       <Text>CUSTOM NATIVE PICKER</Text>
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
            title="Custom modal"
            placeholder="Pick multiple Languages"
            value={this.state.customModalValues}
            onChange={items => this.setState({customModalValues: items})}
            mode={Picker.modes.MULTI}
            rightIconSource={dropdown}
            renderCustomModal={this.renderDialog}
          >
            {_.map(options, option => (
              <Picker.Item
                key={option.value}
                value={option}
                label={option.label}
                labelStyle={Typography.text65}
                disabled={option.disabled}
              />
            ))}
          </Picker>

          <Text marginB-10 text70>
            Custom Picker:
          </Text>
          <Picker
            value={this.state.filter}
            onChange={filter => this.setState({filter})}
            renderPicker={(_value?: any, label?: string) => {
              return (
                <View row>
                  <Icon style={{marginRight: 1, height: 16, resizeMode: 'contain'}} source={tagIcon}/>
                  <Text grey10 text80>
                    {label} Posts
                  </Text>
                </View>
              );
            }}
          >
            {_.map(filters, filter => (
              <Picker.Item key={filter.value} value={filter} label={''}/>
            ))}
          </Picker>

          <Text text60 marginT-s5>
            Migrated Pickers
          </Text>

          <Text marginT-20 marginB-10 text70>
            Custom Picker Items:
          </Text>
          <Picker
            migrate
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
                      <Text text70 marginL-10>
                        {contact?.name}
                      </Text>
                    </>
                  ) : (
                    <Text text70 grey30>
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
                        borderColor: Colors.grey80
                      }}
                      paddingH-15
                      row
                      centerV
                      spread
                    >
                      <View row centerV>
                        <Avatar size={35} source={{uri: contact?.thumbnail}}/>
                        <Text marginL-10 text70 grey10>
                          {contact?.name}
                        </Text>
                      </View>
                      {props.isSelected && <Icon source={Assets.icons.check}/>}
                    </View>
                  );
                }}
                getItemLabel={contactValue => contacts[contactValue as number]?.name}
              />
            ))}
          </Picker>

          <Picker
            migrate
            // @ts-expect-error
            ref={this.picker}
            migrateTextField
            label="Language"
            placeholder="Favorite Language"
            value={this.state.language2}
            onChange={value => this.setState({language2: value})}
            topBarProps={{title: 'Languages'}}
            showSearch
            searchPlaceholder={'Search a language'}
            searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.grey50}}
            marginT-s4
            enableErrors={false}
            // mode={Picker.modes.MULTI}
            // useNativePicker
          >
            {_.map(options, option => (
              <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled}/>
            ))}
          </Picker>
          <Button
            label="Open Picker Manually"
            link
            style={{alignSelf: 'flex-start'}}
            onPress={() => this.picker.current?.openExpandable?.()}
          />
        </View>
      </ScrollView>
    );
  }
}
