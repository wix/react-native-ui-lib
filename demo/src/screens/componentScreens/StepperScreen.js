import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Colors, Text, Stepper, Typography, Avatar, Assets} from 'react-native-ui-lib'; //eslint-disable-line
import contacts from '../../data/conversations';

const filters = [
  {label: 'All', value: 0},
  {label: 'Draft', value: 1},
  {label: 'Published', value: 2},
  {label: 'Scheduled', value: 3},
];

export default class StepperScreen extends Component {
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
            Stepper
          </Text>

          <Stepper
            label={this.state.itemsCount === 1 ? 'Item' : 'Items'}
            min={1}
            max={5}
            onValueChange={count => this.setState({itemsCount: count})}
            initialValue={1}
          />
        </View>
      </ScrollView>
    );
  }
}
