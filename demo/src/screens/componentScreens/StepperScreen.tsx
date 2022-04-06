import React, {Component} from 'react';
import {View, Text, Stepper} from 'react-native-ui-lib'; //eslint-disable-line

export default class StepperScreen extends Component {
  state = {
    stepperValue: 1
  };

  stepperProps = {
    minValue: 0,
    maxValue: 3,
    value: 1
  };

  onValueChange = (value: number, _?: string) => {
    this.setState({stepperValue: value});
  };

  render() {
    const {stepperValue} = this.state;

    return (
      <View padding-page>
        <Text text40 $textDefault marginB-20>
          Stepper
        </Text>

        <View centerV>
          <View row spread centerV>
            <Text text70 $textDefault>
              Default
            </Text>
            <Stepper/>
          </View>

          <View row spread centerV marginT-30>
            <Text text70 $textDefault>
              Disabled
            </Text>
            <Stepper disabled/>
          </View>

          <View row spread marginT-30>
            <Text text70 $textDefault>
              Step (0.5)
            </Text>
            <Stepper step={0.5}/>
          </View>

          <View row spread marginT-30>
            <Text text70 $textDefault>
              Small
            </Text>
            <Stepper small/>
          </View>

          <View marginT-30>
            <View row spread centerV>
              <Text text70 $textDefault>
                Custom
              </Text>
              <Stepper
                onValueChange={this.onValueChange}
                maxValue={this.stepperProps.maxValue}
                minValue={this.stepperProps.minValue}
                value={stepperValue}
                testID={'Stepper1'}
              />
            </View>
            <View padding-5>
              <Text text80M $textDefault>
                Stepper value: {stepperValue}
              </Text>
              <Text $textDefault marginT-3>
                Initial value: {this.stepperProps.value}
              </Text>
              <Text $textDefault marginT-3>
                Min value: {this.stepperProps.minValue}
              </Text>
              <Text $textDefault marginT-3>
                Max value: {this.stepperProps.maxValue}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
