import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, View, Text, Image, Assets, Button} from 'react-native-ui-lib'; //eslint-disable-line

class Tab1 extends Component {
  state = {};
  render() {
    return (
      <View flex padding-20>
        <Image
          style={StyleSheet.absoluteFillObject}
          overlayType="top"
          source={{
            uri:
              'https://images.unsplash.com/photo-1553969923-bbf0cac2666b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
          }}
        />
        <Text text40 white>
          Home
        </Text>
        <View absR marginR-20>
          <Button marginT-20 round style={{width: 50}} size="small" iconSource={Assets.icons.search} white/>
        </View>
      </View>
    );
  }
}

export default Tab1;
