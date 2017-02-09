import React, {
  Component,
} from 'react';
import {View, Text} from 'react-native';
import {ConnectionStatusBar} from 'react-native-ui-lib';//eslint-disable-line

export default class ConnectionStatusBarScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
    };
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ConnectionStatusBar onConnectionChange={isConnected => this.setState({isConnected})} />
        <Text>
          {this.state.isConnected ? 'Connected! :)' : 'No connection :('}
        </Text>
      </View>
    );
  }
}