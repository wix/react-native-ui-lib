import React, {Component} from 'react';
import {View, Text, Stepper} from 'react-native-ui-lib'; //eslint-disable-line


export default class StepperScreen extends Component {
  state = {
    stepper1Value: 1
  };

  onValueChange = stepValue => {
    this.setState({stepper1Value: stepValue});
  };

  render() {
    const {stepper1Value} = this.state;
    const stepper1 = {
      maxValue: 3,
      minValue: 0,
      value: 1
    };

    return (
      <View padding-page>
        <Text text40 style={{marginBottom: 20}}>
          Stepper
        </Text>

        <View marginB-15>
          <View row spread centerV>
            <Text text70>Stepper value: {stepper1Value}</Text>
            <Stepper
              onValueChange={this.onValueChange}
              maxValue={stepper1.maxValue}
              minValue={stepper1.minValue}
              value={stepper1Value}
            />
          </View>
          <Text marginT-3>
            Initial value: {stepper1.value}
          </Text>
          <Text marginT-3>
            Min value: {stepper1.minValue}
          </Text>
          <Text marginT-3>
            Max value: {stepper1.maxValue}
          </Text>
        </View>

        <View centerV>
          <View row spread centerV>
            <Text text70>Default</Text>
            <Stepper/>
          </View>

          <View row spread centerV marginT-20>
            <Text text70>Disabled</Text>
            <Stepper disabled/>
          </View>

          <View row spread marginT-20 marginR-8>
            <Text text70>Small</Text>
            <Stepper small/>
          </View>
        </View>
      </View>
    );
  }
}
