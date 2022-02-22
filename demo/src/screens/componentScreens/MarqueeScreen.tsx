import _ from 'lodash';
import React, {Component} from 'react';
import {Colors, View, Text, Marquee} from 'react-native-ui-lib';

export default class MarqueeScreen extends Component { 
  renderRow() {
    return (
      <View row>
        {_.times(8, i => {
          return <View key={i} style={{backgroundColor: '#FF10F0', width: 20, height: 6, marginRight: 10}}/>;
        })}
      </View>
    );
  }
  
  render() {
    return (
      <>
        <Text text50 grey10 margin-20>Marquee</Text>
        <View marginH-50 style={{borderWidth: 1}}>
          <Marquee start={50} end={50} duration={9000}>
            <View padding-20 center style={{backgroundColor: '#cfff04'}}>
              <Text text40>Hello World</Text>
            </View>
          </Marquee>
          <Marquee duration={2000}>
            {this.renderRow()}
          </Marquee>
        </View>

        <View bg-blue60 marginT-50 marginL-50 width={200}>
          <Marquee width={50} direction={'left'}>
            <Text text50>Test</Text>
          </Marquee>
        </View>
      </>
    );
  }
}
