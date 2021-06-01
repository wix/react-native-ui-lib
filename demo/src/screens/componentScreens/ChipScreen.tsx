import _ from 'lodash';
import React, {Component} from 'react';
import {Alert} from 'react-native';
import {Chip, Colors, Spacings, Text, Typography, View, Dialog, WheelPickerDialog, Image} from 'react-native-ui-lib';

const avatarImage = {
  uri: 'https://randomuser.me/api/portraits/women/24.jpg'
};
const checkmark = require('../../assets/icons/check-small.png');
const chevron = require('../../assets/icons/chevronDown.png');
const bell = require('../../assets/icons/bell.png');

export default class ChipScreen extends Component {
  colors = [
    {value: Colors.red10, label: 'Red'},
    {value: Colors.blue10, label: 'Blue'},
    {value: Colors.purple10, label: 'Purple'},
    {value: Colors.green10, label: 'Green'},
    {value: Colors.yellow10, label: 'Yellow'}
  ];

  state = {
    showDialog: false,
    selectedValue: this.colors[2].label
  };

  toggleDialog = (showDialog: boolean) => {
    this.setState({showDialog});
  };

  openDialog = () => {
    this.toggleDialog(true);
  };

  closeDialog = () => {
    this.toggleDialog(false);
  };

  onSelect = (itemValue: string) => {
    const values = _.filter(this.colors, {value: itemValue});
    if (values.length > 0) {
      this.setState({selectedValue: values[0].label});
    }
    this.closeDialog();
  };

  renderItem = ({item: color}) => {
    return (
      <Text text50 margin-20 color={color.value}>
        {color.label}
      </Text>
    );
  };

  renderContent = () => {
    const {selectedValue} = this.state;

    return (
      <WheelPickerDialog
        items={this.colors}
        selectedValue={selectedValue}
        onSelect={this.onSelect}
        onCancel={this.closeDialog}
        wheelPickerProps={{
          style: {width: 200}
        }}
      />
    );
  };

  renderPickerDialog = () => {
    const {showDialog} = this.state;

    return (
      <Dialog migrate visible={showDialog} useSafeArea bottom onDismiss={this.closeDialog}>
        {this.renderContent()}
      </Dialog>
    );
  };

  renderExample = (text: string, chip: JSX.Element) => {
    return (
      <View row spread marginB-12>
        <Text text70>{text}</Text>
        {chip}
      </View>
    );
  };

  render() {
    return (
      <View style={{padding: 20}}>
        {this.state.showDialog && this.renderPickerDialog()}
        <Text marginB-20 text40>
          Chip
        </Text>
        <Text marginB-10 text70BO>
          Default
        </Text>
        {this.renderExample('Label', <Chip label={'Chip'}/>)}
        {this.renderExample('Label + onPress', <Chip label={'Chip'} onPress={() => Alert.alert('onPress')}/>)}
        {this.renderExample('Label + onDismiss',
          <Chip
            label={'Chip'}
            iconColor={Colors.black}
            onDismiss={() => Alert.alert('onDismiss')}
            onPress={() => Alert.alert('onPress')}
            dismissIconStyle={{width: 10, height: 10}}
          />)}
        {this.renderExample('Icon',
          <Chip iconSource={checkmark} iconStyle={{width: 24, height: 24}} iconProps={{tintColor: Colors.black}}/>)}
        {this.renderExample('Left icon',
          <Chip
            label={'Chip'}
            iconSource={checkmark}
            iconStyle={{width: 24, height: 24}}
            iconProps={{tintColor: Colors.black}}
          />)}
        {this.renderExample('Right icon + onPress + dynamic label',
          <Chip
            label={this.state.selectedValue}
            rightIconSource={chevron}
            iconStyle={{margin: 8}}
            onPress={this.openDialog}
          />)}
        {this.renderExample('Label + Avatar', <Chip label={'Chip'} avatarProps={{source: avatarImage, size: 20}}/>)}
        {this.renderExample('Label + Counter',
          <Chip
            label={'Chip'}
            labelStyle={{
              marginRight: undefined
            }}
            useCounter
            badgeProps={{
              label: '4',
              labelStyle: {
                ...Typography.text80R,
                color: Colors.grey20
              }
            }}
          />)}
        {this.renderExample('Label + Badge',
          <Chip
            label={'Chip'}
            badgeProps={{
              label: '4',
              backgroundColor: 'red'
            }}
          />)}

        <Text marginT-20 marginB-10 text70BO>
          Custom
        </Text>
        <View center row>
          <Chip
            label={'Chip'}
            labelStyle={{color: Colors.green20}}
            iconSource={checkmark}
            iconProps={{tintColor: Colors.green20}}
            containerStyle={{borderColor: Colors.green20}}
          />
          <Chip
            iconSource={checkmark}
            label={'Chip'}
            labelStyle={{color: Colors.white}}
            containerStyle={{borderColor: Colors.green20, backgroundColor: Colors.green20, marginLeft: Spacings.s3}}
          />
          <Chip
            resetSpacings
            borderRadius={22}
            label={'Chip'}
            labelStyle={{color: Colors.red20, marginHorizontal: Spacings.s3, ...Typography.text70BO}}
            iconStyle={{width: 16, height: 16}}
            iconColor={Colors.black}
            avatarProps={{source: avatarImage, size: 28}}
            onDismiss={() => Alert.alert('onDismiss')}
            dismissIconStyle={{width: 10, height: 10, marginRight: Spacings.s3}}
            dismissColor={Colors.red20}
            containerStyle={{
              borderColor: Colors.red20,
              borderBottomRightRadius: 0,
              marginLeft: Spacings.s3
            }}
          />
          <Chip
            resetSpacings
            label={'Chip'}
            labelStyle={{marginRight: Spacings.s1}}
            badgeProps={{
              label: '44',
              backgroundColor: Colors.white,
              borderWidth: 2,
              borderColor: Colors.black,
              labelStyle: {color: Colors.black}
            }}
            containerStyle={{
              borderWidth: 0,
              marginLeft: Spacings.s3
            }}
          />
        </View>
        <View center row marginT-10>
          <Chip
            rightElement={<Image tintColor={Colors.yellow30} source={bell} width={24} height={24}/>}
            label={'Chip'}
          />
          <Chip
            marginL-s3
            rightElement={<Image tintColor={Colors.green20} source={bell} width={20} height={20}/>}
            leftElement={<Image tintColor={Colors.green20} source={bell} width={20} height={20}/>}
            label={'Chip'}
          />
          <Chip
            marginL-s3
            leftElement={
              <View center row marginL-s1>
                <Image tintColor={Colors.blue30} source={bell}/>
                <Image tintColor={Colors.blue30} source={bell} width={20} height={20}/>
                <Image tintColor={Colors.blue30} source={bell} width={24} height={24}/>
              </View>
            }
            label={'Chip'}
          />
          <Chip
            marginL-s3
            paddingR-s2
            rightIconSource={chevron}
            rightElement={<Image tintColor={Colors.red30} source={bell} width={20} height={20}/>}
            label={'Chip'}
          />
        </View>
      </View>
    );
  }
}
