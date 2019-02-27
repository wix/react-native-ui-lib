import React, {Component} from 'react';
import {Checkbox, Assets, Text, View, Colors} from 'react-native-ui-lib'; //eslint-disable-line


class CheckboxScreen extends Component {
  state = {
    value1: false,
    value2: false,
    value3: true,
    value4: true,
    value5: false,
  };
  
  render() {
    return (
      <View useSafeArea flex>
        <View flex padding-20>
          <View flex center>
            <Checkbox
              value={this.state.value1}
              onValueChange={value1 => this.setState({value1})}
              size={70}
              style={{marginBottom: 20}}
              // disabled
              // color={Colors.purple30}
            />
           {/*  <Checkbox
              value={this.state.value2}
              onValueChange={value2 => this.setState({value2})}
              borderRadius={2}
              size={70}
              color={Colors.purple30}
              selectedIcon={Assets.icons.x}
              style={{marginBottom: 20}}
            /> */}
          </View>
          <Text text40 dark10>
            Checkbox
          </Text>
        </View>
      </View>
    );
  }
}

export default CheckboxScreen;
