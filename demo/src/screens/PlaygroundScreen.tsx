import React, {Component} from 'react';
import {View, Button, Incubator} from 'react-native-ui-lib';

export default class PlaygroundScreen extends Component {
  state = {
    visible: false,
    selectedOption: undefined
  };

  pickOption(index: string) {
    console.log(`picked option ${index}`);
  }

  OPTIONS = [
    {label: 'option 1', onPress: () => this.pickOption('option 1')},
    {label: 'option 2', onPress: () => this.pickOption('option 2')},
    {label: 'option 3', onPress: () => this.pickOption('option 3')},
    {label: 'option 1', onPress: () => this.pickOption('option 1')},
    {label: 'option 2', onPress: () => this.pickOption('option 2')},
    {label: 'option 3', onPress: () => this.pickOption('option 3')},
    {label: 'option 1', onPress: () => this.pickOption('option 1')},
    {label: 'option 2', onPress: () => this.pickOption('option 2')},
    {label: 'option 3', onPress: () => this.pickOption('option 3')},
    {label: 'option 1', onPress: () => this.pickOption('option 1')},
    {label: 'option 2', onPress: () => this.pickOption('option 2')},
    {label: 'option 3', onPress: () => this.pickOption('option 3')},
    {label: 'option 1', onPress: () => this.pickOption('option 1')},
    {label: 'option 2', onPress: () => this.pickOption('option 2')},
    {label: 'option 3', onPress: () => this.pickOption('option 3')},
    {label: 'cancel', onPress: () => this.pickOption('cancel')}
  ];

  render() {
    return (
      <View bg-grey80 flex padding-20>
        <Button
          label="Show Action Sheet"
          onPress={() => {
            console.log(`Button pressed`);
            this.setState({visible: true});
          }}
        />

        <Incubator.ActionSheet
          visible={this.state.visible}
          options={this.OPTIONS}
          onDismiss={() => {
            console.log(`props onDismiss called!`);
            this.setState({visible: false});
          }}
          dialogProps={{
            bottom: true,
            centerH: true,
            width: '90%',
            headerProps: {title: 'Action Sheet', subtitle: 'sub'}
          }}
        />
      </View>
    );
  }
}
