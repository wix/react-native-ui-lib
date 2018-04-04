import React, {PureComponent} from 'react';
import {Text, Button, View, Colors, WheelPicker, Constants} from 'react-native-ui-lib';
import { Picker } from 'react-native';//eslint-disable-line

export default class WheelPickerViewScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 'python',
      items: [
        { value: 'python', label: 'python'},
        { value: 'javascript', label: 'javascript'},
        { value: 'common lisp', label: 'lisp'},
        { value: 'objective c', label: 'objective c'},
        { value: 'java', label: 'java'},
      ],
    };
    this.onValueChange = this.onValueChange.bind(this);
  }


  onValueChange(itemValue) {
    this.setState({ value: itemValue});
  }
  render() {
    return (
      <View flex center>
        <Text>{'Wheel Picker'}</Text>
        <Text>{`Selected Value is: ${this.state.value}`}</Text>
        <WheelPicker selectedValue={this.state.value} onValueChange={this.onValueChange} style={{height: 200, width: 200}}>
          {this.state.items.map((item) => {
            return (
              <WheelPicker.Item key={item.value} value={item.value} label={item.label} />
            );
          })}
        </WheelPicker>
      </View>
    );
  }
}

