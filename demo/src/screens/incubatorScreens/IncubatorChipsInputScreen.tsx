import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Card, TextField, Button, Colors, Incubator} from 'react-native-ui-lib'; //eslint-disable-line

export default class ChipsInputScreen extends Component {
  state = {
    chips: [{label: 'one'}, {label: 'two'}],
    chips2: []
  };

  render() {
    return (
      <View flex padding-20>
        <Text h1 marginB-s4>
          ChipsInput
        </Text>
        <Incubator.ChipsInput
          placeholder="Enter chips"
          defaultChipProps={{
            backgroundColor: Colors.primary,
            labelStyle: {color: Colors.white},
            containerStyle: {borderWidth: 0},
            dismissColor: Colors.white
          }}
          chips={this.state.chips}
          leadingAccessory={<Text>TO: </Text>}
          onChange={newChips => {
            this.setState({chips: newChips});
          }}
        />

        <Incubator.ChipsInput
          label="Max 3 chips"
          placeholder="Enter chips..."
          chips={this.state.chips2}
          onChange={newChips => this.setState({chips2: newChips})}
          maxChips={3}
        />
      </View>
    );
  }
}
