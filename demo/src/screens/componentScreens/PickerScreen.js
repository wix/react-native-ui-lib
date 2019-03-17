import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, Image} from 'react-native';
import {View, Colors, Text, Stepper, Typography, Picker, Avatar, Assets, TagsInput} from 'react-native-ui-lib'; //eslint-disable-line
import contacts from '../../data/conversations';
import tagIcon from '../../assets/icons/tags.png';
import dropdown from '../../assets/icons/chevronDown.png';

const options = [
  {label: 'JavaScript', value: 'js'},
  {label: 'Java', value: 'java'},
  {label: 'Python', value: 'python'},
  {label: 'C++', value: 'c++', disabled: true},
  {label: 'Perl', value: 'perl'},
];
const filters = [
  {label: 'All', value: 0},
  {label: 'Draft', value: 1},
  {label: 'Published', value: 2},
  {label: 'Scheduled', value: 3},
];

export default class PickerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsCount: 1,
      // language: {value: 'java', label: 'Java'},
      language: undefined,
      languages: [],
      filter: filters[0],
      contact: contacts[0],
      tags: [{label: 'Amit'}, {label: 'Ethan'}],
      tags2: ['Tags', 'Input'],
      tags3: ['Non', 'Removable', 'Tags'],
    };
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View flex padding-20>
          <Text text40 marginB-20>
            Picker
          </Text>
          <Picker
            placeholder="Pick a single language"
            floatingPlaceholder
            value={this.state.language}
            enableModalBlur={false}
            onChange={item => this.setState({language: item})}
            topBarProps={{title: 'Languages'}}
            style={{color: Colors.red20}}
            showSearch
            searchPlaceholder={'Search a language'}
            searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.dark50}}
            // onSearchChange={value => console.warn('value', value)}
          >
            {_.map(options, option => (
              <Picker.Item key={option.value} value={option} disabled={option.disabled} />
            ))}
          </Picker>

          <View marginT-20>
            <Picker
              placeholder="Pick multiple Languages"
              value={this.state.languages}
              onChange={items => this.setState({languages: items})}
              mode={Picker.modes.MULTI}
              rightIconSource={dropdown}
              hideUnderline
            >
              {_.map(options, option => (
                <Picker.Item key={option.value} value={option} disabled={option.disabled} />
              ))}
            </Picker>
          </View>

          <Picker
            title="Native Picker"
            placeholder="Pick a Language"
            useNativePicker
            value={this.state.nativePickerValue}
            onChange={nativePickerValue => this.setState({nativePickerValue})}
            rightIconSource={dropdown}
            containerStyle={{marginTop: 20}}
            // renderNativePicker={(props) => {
            //   return (
            //     <View flex bg-red50>
            //       <Text>CUSTOM NATIVE PICKER</Text>
            //     </View>
            //   );
            // }}
            // topBarProps={{doneLabel: 'YES', cancelLabel: 'NO'}}
          >
            {_.map(options, option => (
              <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled} />
            ))}
          </Picker>

          <Text marginT-20 marginB-10 text70 dark60>
            Custom Picker:
          </Text>
          <Picker
            value={this.state.filter}
            onChange={filter => this.setState({filter})}
            renderPicker={({label}) => {
              return (
                <View row center>
                  <Image style={{marginRight: 1, height: 16, resizeMode: 'contain'}} source={tagIcon} />
                  <Text dark10 text80>
                    {label} Posts
                  </Text>
                </View>
              );
            }}
          >
            {_.map(filters, filter => (
              <Picker.Item key={filter.value} value={filter} />
            ))}
          </Picker>

          <Text marginT-20 marginB-10 text70 dark60>
            Custom Picker Items:
          </Text>
          <Picker
            value={this.state.contact}
            onChange={contact => this.setState({contact})}
            getItemValue={contact => contact.name}
            renderPicker={contact => {
              return (
                <View row center>
                  <Avatar size={30} imageSource={{uri: contact.thumbnail}} />
                  <Text text70 marginL-10>
                    {contact.name}
                  </Text>
                </View>
              );
            }}
          >
            {_.map(contacts, contact => (
              <Picker.Item
                key={contact.name}
                value={contact}
                renderItem={(item, props) => (
                  <View
                    style={{
                      height: 56,
                      borderBottomWidth: 1,
                      borderColor: Colors.dark80,
                    }}
                    paddingH-15
                    row
                    centerV
                    spread
                  >
                    <View row centerV>
                      <Avatar size={35} imageSource={{uri: item.thumbnail}} />
                      <Text marginL-10 text70 dark10>
                        {item.name}
                      </Text>
                    </View>
                    {props.isSelected && <Image source={Assets.icons.check} />}
                  </View>
                )}
                getItemLabel={item => item.name}
              />
            ))}
          </Picker>
        </View>
      </ScrollView>
    );
  }
}
