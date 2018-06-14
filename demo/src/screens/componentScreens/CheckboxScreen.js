import React, {Component} from 'react';
import {Checkbox, Assets, Text, View, Switch, Constants, Button, Colors, Typography} from 'react-native-ui-lib'; //eslint-disable-line

class CheckboxScreen extends Component {
  state = {};
  render() {
    return (
      <View useSafeArea flex>
        <View flex padding-20>
          <View flex center row>
            <Checkbox value={this.state.value1} onValueChange={value1 => this.setState({value1})} style={{marginRight: 10}} />

            <Checkbox
              value={this.state.value2}
              onValueChange={value2 => this.setState({value2})}
              borderRadius={2}
              size={30}
              color={Colors.purple30}
              selectedIcon={Assets.icons.x}
              style={{marginRight: 10}}
            />

            <Checkbox
              value={this.state.value3}
              onValueChange={value3 => this.setState({value3})}
              borderRadius={5}
              size={18}
              color={Colors.dark10}
            />
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
