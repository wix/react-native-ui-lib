import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Text, Image} from 'react-native-ui-lib'; // eslint-disable-line


const image = require('../../assets/images/card-example.jpg');
const icon1 = require('../../assets/icons/tags.png');
const icon2 = require('../../assets/icons/collections.png');
const icon3 = require('../../assets/icons/share.png');
const icon4 = require('../../assets/icons/star.png');

export default class OverlaysScreen extends Component {
  
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View flex padding-20>
          <Text text40 marginB-40>Image Overlays</Text>
          <View row>
            <View centerH>
            <Text dark10>VERTICAL</Text>
            <Image
              style={styles.image}
              source={image}
              overlayType={Image.overlayTypes.VERTICAL}
            />
            </View>
            <View centerH>
              <Text dark10>SOLID</Text>
              <Image
                style={styles.image}
                source={image}
                overlayType={Image.overlayTypes.SOLID}
              />
          </View>
          </View>
          <View row>
            <View centerH>
              <Text dark10>TOP</Text>
              <Image
                style={styles.image}
                source={image}
                overlayType={Image.overlayTypes.TOP}
              />
            </View>
            <View centerH>
              <Text dark10>BOTTOM</Text>
              <Image
                style={styles.image}
                source={image}
                overlayType={Image.overlayTypes.BOTTOM}
              />
            </View>
          </View>
        </View>
        <View row padding-20>
          <Image
            source={icon1}
            overlayType={Image.overlayTypes.VERTICAL}
            style={{margin: 10}}
          />
          <Image
            source={icon2}
            overlayType={Image.overlayTypes.VERTICAL}
            style={{margin: 10}}
          />
          <Image
            source={icon3}
            overlayType={Image.overlayTypes.VERTICAL}
            style={{margin: 10}}
          />
          <Image
            source={icon4}
            overlayType={Image.overlayTypes.VERTICAL}
            style={{margin: 10}}
          />
        </View>
        <Image
          source={image}
          overlayType={Image.overlayTypes.VERTICAL}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 150, 
    height: 150, 
    margin: 10
  }
});
