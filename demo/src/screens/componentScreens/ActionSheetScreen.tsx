import React, {Component} from 'react';
import {Alert, Modal, Platform, View as RNView} from 'react-native';
import {View, Text, Button, ActionSheet, Dialog} from 'react-native-ui-lib'; //eslint-disable-line
import _ from 'lodash';

const useCases = [
  {label: 'Default (Android/iOS)', useNativeIOS: false, icons: false},
  {label: 'Default with icons', useNativeIOS: false, icons: true},
  {label: 'Native IOS', useNativeIOS: true}
];
const collectionsIcon = require('../../assets/icons/collections.png');
const starIcon = require('../../assets/icons/star.png');
const shareIcon = require('../../assets/icons/share.png');

interface State {
  showNative: boolean;
  showCustom: boolean;
  showCustomIcons: boolean;
  showModal: boolean;
  modalKey: number;
  showDialog: boolean;
  pickedOption?: string;
}

export default class ActionSheetScreen extends Component<{}, State> {
  state: State = {
    showNative: false,
    showCustom: false,
    showCustomIcons: false,
    showModal: false,
    modalKey: 0,
    showDialog: false,
    pickedOption: undefined
  };

  pickOption(index: string) {
    this.setState({
      pickedOption: index
    });
  }

  showReactNativeModal = () => {
    this.setState(prevState => ({
      showModal: true,
      modalKey: prevState.modalKey + 1
    }));
  };

  dismissReactNativeModal = () => {
    this.setState({showModal: false});
  };

  render() {
    const {showCustom, showCustomIcons, showNative, showModal, modalKey, showDialog, pickedOption} = this.state;
    return (
      <View flex padding-25>
        <Text text30>Action Sheet</Text>
        <View left marginT-40>
          {_.map(useCases, (useCase, index) => {
            return (
              <Button
                key={index}
                link
                size={Button.sizes.small}
                text50
                marginB-10
                grey10
                label={`> ${useCase.label}`}
                onPress={() =>
                  this.setState({
                    showNative: useCase.useNativeIOS,
                    showCustom: !useCase.useNativeIOS && !useCase.icons,
                    showCustomIcons: !useCase.useNativeIOS && !!useCase.icons
                  })}
              />
            );
          })}
        </View>
        {!_.isUndefined(pickedOption) && (
          <View>
            <Text>User picked {pickedOption}</Text>
          </View>
        )}

        <View flex bottom>
          <Button
            marginB-10
            label="Show Action Sheet"
            onPress={() => this.setState({showCustom: true})}
          />
          <Button
            marginB-10
            label="Show React Native Dialog"
            onPress={() => this.setState({showDialog: true})}
          />
          <Button
            marginB-10
            label="Show React Native Modal"
            onPress={this.showReactNativeModal}
          />
          <Button
            label="Show React Native Alert"
            onPress={() =>
              Alert.alert('React Native Alert', 'This is a native Alert from React Native', [{text: 'OK'}])}
          />
        </View>

        <Dialog
          visible={showDialog}
          ignoreBackgroundPress
          modalProps={{
            onBackgroundPress: () => this.setState({showDialog: false}),
            onRequestClose: () => this.setState({showDialog: false}),
            onDismiss: () => this.setState({showDialog: false})
          }}
          onDismiss={() => this.setState({showDialog: false})}
        >
          <View padding-25 bg-white br40>
            <Text text60 marginB-10>React Native UI Lib Dialog</Text>
            <Text marginB-20>This is a Dialog from react-native-ui-lib</Text>
            <Button label="Close" onPress={() => this.setState({showDialog: false})}/>
          </View>
        </Dialog>
        {showModal && (
          <RNView key={`rn-modal-${modalKey}`}>
            <Modal
              visible
              animationType={Platform.OS === 'android' ? 'none' : 'slide'}
              hardwareAccelerated
              transparent
              onRequestClose={this.dismissReactNativeModal}
            >
              <View flex center backgroundColor="rgba(0,0,0,0.5)">
                <View padding-25 bg-white br40 center>
                  <Text text60 marginB-10>React Native Modal</Text>
                  <Text marginB-20>This is a native Modal from React Native</Text>
                  <Button label="Close" onPress={this.dismissReactNativeModal}/>
                </View>
              </View>
            </Modal>
          </RNView>
        )}
        <ActionSheet
          title={'Title'}
          message={'Message of action sheet'}
          cancelButtonIndex={3}
          destructiveButtonIndex={0}
          useNativeIOS={false}
          options={[
            {label: 'option 1', onPress: () => this.pickOption('option 1')},
            {label: 'option 2', onPress: () => this.pickOption('option 2')},
            {label: 'option 3', onPress: () => this.pickOption('option 3')},
            {label: 'cancel', onPress: () => this.pickOption('cancel')}
          ]}
          visible={showCustom}
          onDismiss={() => this.setState({showCustom: false})}
        />

        <ActionSheet
          title={'Title'}
          message={'Message of action sheet'}
          cancelButtonIndex={3}
          destructiveButtonIndex={0}
          options={[
            {label: 'option 1', onPress: () => this.pickOption('option 1'), iconSource: collectionsIcon},
            {label: 'option 2', onPress: () => this.pickOption('option 2'), iconSource: shareIcon},
            // `icon` prop will be deprecated, please use `iconSource`
            {label: 'option 3', onPress: () => this.pickOption('option 3'), icon: starIcon},
            {label: 'cancel', onPress: () => this.pickOption('cancel')}
          ]}
          visible={showCustomIcons}
          onDismiss={() => this.setState({showCustomIcons: false})}
        />

        <ActionSheet
          title={'Title'}
          message={'Message of action sheet'}
          cancelButtonIndex={3}
          destructiveButtonIndex={0}
          options={[
            {label: 'option 1', onPress: () => this.pickOption('option 1')},
            {label: 'option 2', onPress: () => this.pickOption('option 2')},
            {label: 'option 3', onPress: () => this.pickOption('option 3')},
            {label: 'cancel', onPress: () => this.pickOption('cancel')}
          ]}
          visible={showNative}
          useNativeIOS
          onDismiss={() => this.setState({showNative: false})}
        />
      </View>
    );
  }
}
