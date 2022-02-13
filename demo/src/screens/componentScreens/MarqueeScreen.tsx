import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, Marquee} from 'react-native-ui-lib';

export default class MarqueeScreen extends Component {  
  render() {
    return (
      <View flex padding-20>
        <Text text50 grey10 marginB-20>Marquee</Text>
        <Marquee>
          <View padding-20 center style={{backgroundColor: '#cfff04'}}>
            <Text text40>Hello World</Text>
          </View>
        </Marquee>
        <Marquee duration={2000} direction={'right'}>
          <View row>
            {_.times(8, i => {
              return <View style={{backgroundColor: '#FF10F0', width: 40, height: 8, marginRight: 10}}/>;
            })}
          </View>
        </Marquee>
      </View>
    );
  }
}
