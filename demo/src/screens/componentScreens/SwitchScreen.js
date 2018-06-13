import React, {Component} from 'react';
import {Text, View, Switch, Constants, Button, Colors, Typography} from 'react-native-ui-lib'; //eslint-disable-line

class SwitchScreen extends Component {
  state = {};
  render() {
    return (
      <View flex bottom padding-20>
        <View flex center>
          <Switch value={this.state.value} onValueChange={value => this.setState({value})} style={{marginBottom: 20}} />
          <Switch

            onColor={Colors.purple30}
            offColor={Colors.purple60}
            value={this.state.value}
            onValueChange={value => this.setState({value})}
            style={{marginBottom: 20}}
          />

          <Switch
            width={80}
            height={38}
            thumbSize={34}
            value={this.state.value}
            onValueChange={value => this.setState({value})}
            style={{marginBottom: 20}}
          />

          <Switch
            width={30}
            height={4}
            thumbSize={12}
            onColor={Colors.dark20}
            offColor={Colors.dark60}
            thumbColor={Colors.dark10}
            value={this.state.value}
            onValueChange={value => this.setState({value})}
            style={{marginBottom: 20}}
          />
        </View>
        <Text text40 dark10>
          Switch
        </Text>
      </View>
    );
  }
}

export default SwitchScreen;
