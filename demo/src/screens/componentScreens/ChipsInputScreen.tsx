import React, {Component} from 'react';
import {View, Text, Colors, ChipsInput} from 'react-native-ui-lib';
import _ from 'lodash';

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
        <ChipsInput
          placeholder="Enter chips"
          defaultChipProps={{
            backgroundColor: Colors.$backgroundPrimaryHeavy,
            labelStyle: {color: Colors.$textDefaultLight},
            containerStyle: {borderWidth: 0},
            dismissColor: Colors.$iconDefaultLight
          }}
          invalidChipProps={{
            dismissColor: Colors.$iconDanger,
            labelStyle: {color: Colors.$textDanger},
            backgroundColor: Colors.$backgroundDefault,
            containerStyle: {borderColor: Colors.$outlineDanger}
          }}
          chips={this.state.chips}
          leadingAccessory={<Text>TO: </Text>}
          onChange={newChips => {
            _.flow(newChips => _.groupBy(newChips, 'label'),
              newChips =>
                _.forEach(newChips, group => {
                  if (group.length === 1) {
                    delete group[0].invalid;
                  } else {
                    group[group.length - 1].invalid = true;
                  }
                }),
              _.values,
              _.flatten)(newChips);

            this.setState({chips: newChips});
          }}
          validate={'required'}
          validateOnChange
          validationMessage={'You must add at least one chip'}
          marginB-10
        />

        <ChipsInput
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
