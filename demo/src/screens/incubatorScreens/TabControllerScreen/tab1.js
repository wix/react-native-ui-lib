import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Incubator, Colors, View, Text, Image, Assets, Button} from 'react-native-ui-lib'; //eslint-disable-line

class Tab1 extends Component {
  state = {};
  render() {
    return (
      <View flex padding-20 spread center>
        <Image
          style={StyleSheet.absoluteFillObject}
          source={{
            uri:
              'https://images.unsplash.com/photo-1553969923-bbf0cac2666b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
          }}
        />
        <Text text40 white>TAB 1</Text>
        <Button marginT-20 label="Show Me" />
      </View>
    );
  }
}

export default Tab1;
