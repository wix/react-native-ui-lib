import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Stepper, type StepperType, Image} from 'react-native-ui-lib'; //eslint-disable-line
import {renderMultipleSegmentOptions} from '../ExampleScreenPresenter';

const IMAGE_URL =
  'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&&dpr=1';

export default class StepperScreen extends Component {
  state = {
    stepperValue: 1,
    stepperType: 'default' as StepperType
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
    const {stepperValue, stepperType} = this.state;

    return (
      <ScrollView>
        <View padding-page>
          <Text text40 $textDefault>
            Stepper
          </Text>

          {renderMultipleSegmentOptions.call(this, 'Stepper Type', 'stepperType', [
            {label: 'Default', value: 'default'},
            {label: 'Floating', value: 'floating'}
          ])}

          <View centerV marginT-s3>
            <View row spread centerV>
              <Text text70 $textDefault>
                Default
              </Text>
              <Stepper type={stepperType}/>
            </View>

            <View row spread centerV marginT-30>
              <Text text70 $textDefault>
                Disabled
              </Text>
              <Stepper disabled type={stepperType}/>
            </View>

            <View row spread marginT-30>
              <Text text70 $textDefault>
                Step (0.5)
              </Text>
              <Stepper step={0.5} type={stepperType}/>
            </View>

            <View row spread marginT-30>
              <Text text70 $textDefault>
                Small
              </Text>
              <Stepper small type={stepperType}/>
            </View>

            <View marginT-30>
              <View row spread centerV>
                <Text text70 $textDefault>
                  Custom
                </Text>
                <Stepper
                  type={stepperType}
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

          <View marginT-s5 centerH>
            <Text text70BO marginB-s2>
              Floating Stepper
            </Text>
            <Image
              source={{uri: IMAGE_URL}}
              style={{width: 200, height: 200, borderRadius: 8, overflow: 'hidden'}}
              customOverlayContent={
                <View style={{position: 'absolute', top: 8, right: 8}}>
                  <Stepper type="floating"/>
                </View>
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
