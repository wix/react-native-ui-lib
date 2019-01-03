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
              style={{marginBottom: 20}}
            />
            <Checkbox
              value={this.state.value2}
              onValueChange={value2 => this.setState({value2})}
              borderRadius={2}
              size={30}
              color={Colors.purple30}
              selectedIcon={Assets.icons.x}
              style={{marginBottom: 20}}
            />
            <Checkbox
              value={this.state.value3}
              onValueChange={value3 => this.setState({value3})}
              borderRadius={5}
              size={18}
              color={Colors.dark10}
              iconColor={Colors.green10}
              style={{marginBottom: 20}}
            />
            <View row marginB-20>
              <Text text70 centerV>Disabled: </Text>
              <Checkbox
                disabled
                value={this.state.value5}
                onValueChange={value5 => this.setState({value5})}
                style={{marginRight: 10}}
              />
              <Checkbox
                disabled
                value={!this.state.value5}
                onValueChange={value5 => this.setState({value5})}
                iconColor={Colors.green10}
              />
            </View>
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
