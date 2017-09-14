import React, {Component} from 'react';
import {View, Text, Button, ActionSheet} from 'react-native-ui-lib'; //eslint-disable-line
import _ from 'lodash';

const useCases = [{label: 'Default (Android/iOS)', useNativeIOS: false}, {label: 'Native IOS', useNativeIOS: true}];

export default class ActionSheetScreen extends Component {
  state = {
    showNative: false,
    showCustom: false,
  };

  pickOption(index) {
    this.setState({
      pickedOption: index,
    });
  }

  render() {
    const {showCustom, showNative, pickedOption} = this.state;
    return (
      <View flex padding-25>
        <Text text30>Action Sheet</Text>
        <View left marginT-40>
          {_.map(useCases, (useCase, index) => {
            return (
              <Button
                key={index}
                link
                size="small"
                text50
                marginB-10
                dark10
                label={`> ${useCase.label}`}
                onPress={() =>
                  this.setState({
                    showNative: useCase.useNativeIOS,
                    showCustom: !useCase.useNativeIOS,
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

        <ActionSheet
          title="Title"
          message="Message of action sheet"
          cancelButtonIndex={3}
          destructiveButtonIndex={0}
          options={[
            {label: 'option 1', onPress: () => this.pickOption('option 1')},
            {label: 'option 2', onPress: () => this.pickOption('option 2')},
            {label: 'option 3', onPress: () => this.pickOption('option 3')},
            {label: 'cancel', onPress: () => this.pickOption('cancel')},
          ]}
          visible={showCustom}
          onDismiss={() => this.setState({showCustom: false})}
        />

        <ActionSheet
          title="Title"
          message="Message of action sheet"
          cancelButtonIndex={3}
          destructiveButtonIndex={0}
          options={[
            {label: 'option 1', onPress: () => this.pickOption('option 1')},
            {label: 'option 2', onPress: () => this.pickOption('option 2')},
            {label: 'option 3', onPress: () => this.pickOption('option 3')},
            {label: 'cancel', onPress: () => this.pickOption('cancel')},
          ]}
          visible={showNative}
          useNativeIOS
          onDismiss={() => this.setState({showNative: false})}
        />
      </View>
    );
  }
}
