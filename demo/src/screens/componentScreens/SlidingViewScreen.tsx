import React, {Component} from 'react';
import {View, Text, SlidingView} from 'react-native-ui-lib';

export default class SlidingViewScreen extends Component {  
  render() {
    return (
      <View flex padding-20>
        <Text text50 grey10 marginB-20>SlidingView</Text>
        <SlidingView>
          <View padding-20 center style={{backgroundColor: '#cfff04'}}>
            <Text text40>Hello World</Text>
          </View>
        </SlidingView>
        <SlidingView duration={2000} direction={'right'}>
          <View margin-20 style={{backgroundColor: '#FF10F0', width: 50, height: 50, borderRadius: 25}}/>
        </SlidingView>
      </View>
    );
  }
}
