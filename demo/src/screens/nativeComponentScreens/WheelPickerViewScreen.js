import React, {PureComponent} from 'react';
import {Text, Button, View, Colors, WheelPicker, Constants} from 'react-native-ui-lib';
import { Picker } from 'react-native';//eslint-disable-line

export default class WheelPickerViewScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 'python',
      options: ['python', 'javascript', 'common lisp', 'objective c', 'java'],
    };
    this.onValueChange = this.onValueChange.bind(this);
  }


  onValueChange(itemValue) {
    this.setState({ value: itemValue});
  }
  render() {
    if (Constants.isIOS) {
      return (
        <View flex center>
          <Text>{'Wheel Picker'}</Text>
          <Text>{`Selected Value is: ${this.state.value}`}</Text>
          <Picker data={this.state.options} onValueChange={this.onValueChange} style={{height: 200, width: 200}}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
      );
    }
    return (
      <View flex center>
        <Text>{'Wheel Picker'}</Text>
        <Text>{`Selected Value is: ${this.state.value}`}</Text>
        <WheelPicker data={this.state.options} onValueChange={this.onValueChange} style={{height: 200, width: 200}}>
          <WheelPicker.Item label="Java" value="java" />
          <WheelPicker.Item label="JavaScript" value="js" />
          <WheelPicker.Item label="Java" value="java" />
          <WheelPicker.Item label="JavaScript" value="js" />
          <WheelPicker.Item label="Java" value="java" />
          <WheelPicker.Item label="JavaScript" value="js" />
        </WheelPicker>
      </View>
    );
  }
}

