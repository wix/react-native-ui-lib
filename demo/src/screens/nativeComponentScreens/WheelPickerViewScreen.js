import React, {PureComponent} from 'react';
import {Text, View, WheelPicker ,Colors} from 'react-native-ui-lib'; //eslint-disable-line

export default class WheelPickerViewScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'common lisp',
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
    this.setState({ selectedValue: itemValue});
  }

  render() {
    const {selectedValue, items} = this.state;

    return (
      <View flex centerH>
        <Text margin-10 text40 dark10 style={{fontWeight: 'bold'}}>{'Wheel Picker'}</Text>
        <Text marginB-30 text60 dark10>{`Current Value is: ${selectedValue}`}</Text>
        <WheelPicker
          selectedValue={selectedValue}
          onValueChange={this.onValueChange}
          style={{width: 200}}
          color={Colors.violet30}
          labelStyle={{fontSize: 32, fontFamily: 'sans-serif-condensed-light'}}
          itemHeight={55}
        >
          {items.map((item) => {
            return (
              <WheelPicker.Item key={item.value} value={item.value} label={item.label} />
            );
          })}
        </WheelPicker>
      </View>
    );
  }
}

