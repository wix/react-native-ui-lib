import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, Marquee} from 'react-native-ui-lib';

export default class MarqueeScreen extends Component { 
  renderRow() {
    return (
      <View row>
        {_.times(8, i => {
          return <View style={{backgroundColor: '#FF10F0', width: 20, height: 6, marginRight: 10}}/>;
        })}
      </View>
    );
  }
  
  render() {
    return (
      <View flex padding-20>
        <Text text50 grey10 marginB-20>Marquee</Text>
        <Marquee duration={2000}>
          {this.renderRow()}
        </Marquee>
        <Marquee>
          <View padding-20 center style={{backgroundColor: '#cfff04'}}>
            <Text text40>Hello World</Text>
          </View>
        </Marquee>
        <Marquee duration={2000} direction={'right'}>
          {this.renderRow()}
        </Marquee>
      </View>
    );
  }
}
