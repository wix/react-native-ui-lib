import _ from 'lodash';
import React, {Component} from 'react';
import {Colors, View, Text, Marquee} from 'react-native-ui-lib';

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
      <>
        <Marquee width={110}>
        <Text text50 grey10 marginV-20>Marquee</Text>
        </Marquee>
        <View marginH-50 style={{borderWidth: 1, borderColor: Colors.orange30}}>
          <Marquee duration={2000}>
            {this.renderRow()}
          </Marquee>
          <Marquee start={50} end={50} duration={9000}>
            <View padding-20 center style={{backgroundColor: '#cfff04'}}>
              <Text text40>Hello World</Text>
            </View>
          </Marquee>
          <Marquee duration={2000} direction={'left'}>
            {this.renderRow()}
          </Marquee>
        </View>
      </>
    );
  }
}
