import React, {Component} from 'react';
import {Modal, View, Text} from 'react-native-ui-lib';//eslint-disable-line

export default class LoadingScreen extends Component {

  static navigatorStyle = {
    navBarHidden: true,
  }

  render() {
    return (
      <View flex>
        <Modal.TopBar
          title="collection whatever"
          onCancel={() => alert('cancel')}
          onDone={() => alert('done')}
        />
        <View padding-20>
          <Text text70>
            this is an example of a custom modal top bar.
          </Text>
        </View>
      </View>
    );
  }
}
