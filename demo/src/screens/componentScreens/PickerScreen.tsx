import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {
  Assets,
  Colors,
  Typography,
  Dialog,
  View,
  Text,
  Button,
  Icon,
  Avatar,
  Picker,
  PanningProvider,
  PickerProps,
  RenderCustomModalProps,
  PickerMethods,
  SegmentedControl,
  PickerSelectionStatusProps
} from 'react-native-ui-lib'; //eslint-disable-line
import contactsData from '../../data/conversations';
import {longOptions} from './PickerScreenLongOptions';

const tagIcon = require('../../assets/icons/tags.png');
const dropdown = require('../../assets/icons/chevronDown.png');
const dropdownIcon = <Icon source={dropdown} tintColor={Colors.$iconDefault}/>;

const selectAllSegment = [{label: 'button'}, {label: 'checkbox'}];

const buttonProps = {
  onPress: (selectionValue: any) => console.log('onPress', selectionValue)
};

const checkboxProps = {
  onValueChange: (value: boolean) => console.log('onValueChange', value)
};

const renderContact = (contactValue: any, props: any) => {
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
      {props.isSelected && <Icon source={Assets.icons.demo.check} tintColor={Colors.$iconDefault}/>}
    </View>
  );
};

const contacts = _.map(contactsData, (c, index) => ({...c, value: index, label: c.name, renderItem: renderContact}));

const options = [
  {label: 'JavaScript', value: 'js', labelStyle: Typography.text65},
  {label: 'Java', value: 'java', labelStyle: Typography.text65},
  {label: 'Python', value: 'python', labelStyle: Typography.text65},
  {label: 'C++', value: 'c++', disabled: true, labelStyle: Typography.text65},
  {label: 'Perl', value: 'perl', labelStyle: Typography.text65}
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

const dialogOptions = [
  {label: 'Option 1', value: 0},
  {label: 'Option 2', value: 1},
  {label: 'Option 3', value: 2},
  {label: 'Option 4', value: 3, disabled: true},
  {label: 'Option 5', value: 4},
  {label: 'Option 6', value: 5},
  {label: 'Option 7', value: 6},
  {label: 'Option 8', value: 6}
];

const statusOptions = [
  {label: 'Overview', value: 'overview'},
  {label: 'In Progress', value: 'inProgress'},
  {label: 'Completed', value: 'completed'},
  {label: 'Pending Review', value: 'pendingReview'},
  {label: 'Approved', value: 'approved'},
  {label: 'Rejected', value: 'rejected'}
];

export default class PickerScreen extends Component {
  picker = React.createRef<PickerMethods>();
  state = {
    itemsCount: 1,
    // language: {value: 'java', label: 'Java'},
    language: undefined,
    language2: options[2].value,
    languages: [],
    option: undefined,
    wheelPickerValue: 'java',
    dialogPickerValue: 'java',
    customModalValues: [],
    filter: undefined,
    statOption: [],
    scheme: undefined,
    contact: 0,
    selectAllType: 'button' as PickerSelectionStatusProps['selectAllType']
  };

  onSegmentChange = (index: number) => {
    this.setState({selectAllType: selectAllSegment[index].label});
  };

  renderDialog: PickerProps['renderOverlay'] = (modalProps: RenderCustomModalProps) => {
    const {visible, children, toggleModal, onDone} = modalProps;
    return (
      <Dialog
        visible={visible}
        onDismiss={() => {
          onDone();
          toggleModal();
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
      </Dialog>
    );
  };

  onTopElementPress = (allOptionsSelected: boolean) => {
    if (allOptionsSelected) {
      this.setState({statOption: []});
    } else {
      const allValues = statusOptions.map(option => option.value);
      this.setState({statOption: allValues});
    }
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
            items={longOptions}
          />

          <Picker
            placeholder="Favorite Languages (up to 3)"
            value={this.state.languages}
            onChange={items => this.setState({languages: items})}
            mode={Picker.modes.MULTI}
            selectionLimit={3}
            trailingAccessory={dropdownIcon}
            items={options}
          />

          <Picker
            label="Wheel Picker"
            placeholder="Pick a Language"
            useWheelPicker
            value={this.state.wheelPickerValue}
            onChange={wheelPickerValue => this.setState({wheelPickerValue})}
            trailingAccessory={<Icon source={dropdown}/>}
            items={options}
          />

          <Picker
            label="Custom modal"
            placeholder="Pick multiple Languages"
            value={this.state.customModalValues}
            onChange={items => this.setState({customModalValues: items})}
            mode={Picker.modes.MULTI}
            trailingAccessory={dropdownIcon}
            renderOverlay={this.renderDialog}
            items={options}
          />

          <Picker
            label="Dialog Picker"
            placeholder="Favorite Language"
            mode={Picker.modes.MULTI}
            value={this.state.option}
            enableModalBlur={false}
            onChange={item => this.setState({option: item})}
            topBarProps={{title: 'Languages'}}
            useDialog
            renderHeader={({onDone, onCancel}) => (
              <View padding-s5 row spread>
                <Button link label="Cancel" onPress={onCancel}/>
                <Button link label="Done" onPress={onDone}/>
              </View>
            )}
            showSearch
            searchPlaceholder={'Search a language'}
            items={dialogOptions}
          />

          <View row spread centerV>
            <Text text70 $textDefault>
              Selection Status:
            </Text>
            <SegmentedControl segments={selectAllSegment} onChangeIndex={this.onSegmentChange}/>
          </View>
          <Picker
            placeholder="Status"
            floatingPlaceholder
            value={this.state.statOption}
            onChange={items => this.setState({statOption: items})}
            topBarProps={{title: 'Status'}}
            mode={Picker.modes.MULTI}
            items={statusOptions}
            selectionStatus={{
              selectAllType: this.state.selectAllType,
              buttonProps,
              checkboxProps
            }}
          />

          <Text marginV-10 text70 $textDefault>
            Custom Picker:
          </Text>
          <Picker
            value={this.state.filter}
            onChange={filter => this.setState({filter})}
            renderInput={(_value?: any, label?: string) => {
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
            items={filters}
          />

          <Text marginT-20 marginB-10 text70 $textDefault>
            Custom Picker Items:
          </Text>
          <Picker
            ref={this.picker}
            value={this.state.contact}
            onChange={contact => {
              this.setState({contact});
            }}
            renderInput={(contactValue?: number) => {
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
            items={contacts}
          />
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
            label="Your Posts: "
            placeholder="Filter posts"
            fieldType={Picker.fieldTypes.filter}
            marginB-s3
            items={filters}
          />
          <Picker
            value={this.state.scheme}
            onChange={value => this.setState({scheme: value})}
            label="Color Scheme"
            placeholder="Select scheme"
            fieldType={Picker.fieldTypes.settings}
            items={schemes}
          />
        </View>
      </ScrollView>
    );
  }
}
