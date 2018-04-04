import React, {Component} from 'react';
import { View, WheelPickerDialog} from 'react-native-ui-lib'; //eslint-disable-line


export default class WheelPickerDialogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 1,
      title: 'Set time',
      items: [
       { value: 0, label: '0 hr' },
       { value: 1, label: '1 hr' },
       { value: 3, label: '3 hr' },
       { value: 5, label: '5 hr' },
       { value: 10, label: '10 hr' },
       { value: 24, label: '24 hr' },
       { value: 48, label: '48 hr' },
       { value: 72, label: '72 hr' },
      ],
    };
    this.onValueChange = this.onValueChange.bind(this);
  }


  onValueChange(itemValue) {
    this.setState({ selectedValue: itemValue});
  }
  render() {
    return (
      <View flex center >
        <WheelPickerDialog
          onValueChange={this.onValueChange}
          selectedValue={this.state.selectedValue}
          items={this.state.items}
          title={this.state.title}
        />
      </View>
    );
  }
}

