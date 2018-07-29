import React, {PureComponent} from 'react';
import {View, Text, Colors, SafeAreaSpacerView, Card, NonClippingView} from 'react-native-ui-lib'; //eslint-disable-line

export default class NonClippingViewScreen extends PureComponent {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    return (
      <View>
        <NonClippingView style={{backgroundColor: Colors.red30, height: 200, marginTop: 30}}>
          <Card style={{backgroundColor: Colors.rgba(Colors.blue30, 0.5)}} containerStyle={{position: 'absolute', top: 100, left: 20, right: 20, height: 150}}/>
        </NonClippingView>
      </View>
    );
  }
}
