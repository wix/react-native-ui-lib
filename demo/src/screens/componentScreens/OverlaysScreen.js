import React, {Component} from 'react';
import {View, Text, Image} from 'react-native-ui-lib'; //eslint-disable-line


const image = require('../../assets/images/card-example.jpg');

export default class OverlaysScreen extends Component {
  
  render() {
    return (
      <View flex bg-dark80 padding-20>
        <Text text40 marginB-40>Image Overlays</Text>
        <View row>
          <View centerH>
          <Text dark10>DEFAULT</Text>
          <Image
            style={{width: 150, height: 150, margin: 10}}
            source={image}
            overlayType={Image.overlayTypes.DEFAULT}
          />
          </View>
          <View centerH>
            <Text dark10>SOLID</Text>
            <Image
              style={{width: 150, height: 150, margin: 10}}
              source={image}
              overlayType={Image.overlayTypes.SOLID}
            />
        </View>
        </View>
        <View row>
          <View centerH>
            <Text dark10>TOP</Text>
            <Image
              style={{width: 150, height: 150, margin: 10}}
              source={image}
              overlayType={Image.overlayTypes.TOP}
            />
          </View>
          <View centerH>
            <Text dark10>BOTTOM</Text>
            <Image
              style={{width: 150, height: 150, margin: 10}}
              source={image}
              overlayType={Image.overlayTypes.BOTTOM}
            />
          </View>
        </View>
      </View>
    );
  }
}
