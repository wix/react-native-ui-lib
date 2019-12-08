import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Text, Image, Card, Constants} from 'react-native-ui-lib'; // eslint-disable-line

const image = require('../../assets/images/card-example.jpg');
const uri = {
  uri: 'https://images.pexels.com/photos/140234/pexels-photo-140234.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
};
const icon = require('../../assets/icons/tags.png');

export default class OverlaysScreen extends Component {
  getImageWithOverlay = type => {
    return (
      <View centerH>
        <Text dark10>{type}</Text>
        <Image style={styles.image} source={image} overlayType={type}/>
      </View>
    );
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View flex padding-20>
          <Text text40 marginB-40>
            Image Overlays
          </Text>
          <View row centerH>
            {this.getImageWithOverlay(Image.overlayTypes.VERTICAL)}
            {this.getImageWithOverlay(Image.overlayTypes.SOLID)}
          </View>
          <View row centerH>
            {this.getImageWithOverlay(Image.overlayTypes.TOP)}
            {this.getImageWithOverlay(Image.overlayTypes.BOTTOM)}
          </View>

          <Text text60BO marginB-10 marginT-20>
            Image Overlays (absolute)
          </Text>
          <View style={styles.overlayImageAbsoluteContainer}>
            <Image
              style={styles.overlayImageAbsoluteVertical}
              source={image}
              overlayType={Image.overlayTypes.VERTICAL}
            />
            <Image style={styles.overlayImageAbsoluteSolid} source={image} overlayType={Image.overlayTypes.SOLID}/>
            <Image style={styles.overlayImageAbsoluteTop} source={image} overlayType={Image.overlayTypes.TOP}/>
            <Image style={styles.overlayImageAbsoluteBottom} source={image} overlayType={Image.overlayTypes.BOTTOM}/>
          </View>

          <Text text60BO marginB-10 marginT-20>
            Card.Image Overlay
          </Text>
          <Card marginB-s4 padding-s2 borderRadius={4} row height={106}>
            <Card.Image style={styles.cardImage} imageSource={image} overlayType={Image.overlayTypes.VERTICAL}/>
            <View flex marginL-s2 centerV>
              <Text text50>{Image.overlayTypes.VERTICAL}</Text>
              <Text text70>Ipsum nostrud officia deserunt irure eu.</Text>
            </View>
          </Card>
        </View>

        <Text text60BO margin-10>
          Image Overlay (fill container)
        </Text>
        <Image source={icon} overlayType={Image.overlayTypes.VERTICAL} style={styles.icon}/>
        <Image cover source={uri} overlayType={Image.overlayTypes.VERTICAL}/>
        <Image source={image} overlayType={Image.overlayTypes.VERTICAL} style={styles.imageFillContainer}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    margin: 10
  },
  overlayImageAbsoluteContainer: {
    width: Constants.screenWidth,
    height: 400,
    marginLeft: -20
  },
  overlayImageAbsoluteVertical: {
    position: 'absolute',
    top: 10,
    left: 0,
    width: 150,
    height: 150,
    margin: 5
  },
  overlayImageAbsoluteSolid: {
    position: 'absolute',
    top: 0,
    right: 10,
    width: 150,
    height: 150,
    margin: 5
  },
  overlayImageAbsoluteTop: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    width: 150,
    height: 150,
    margin: 5
  },
  overlayImageAbsoluteBottom: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    width: 150,
    height: 150,
    margin: 5
  },
  cardImage: {
    width: 100,
    borderRadius: 4
  },
  icon: {
    margin: 10
  },
  imageFillContainer: {
    margin: 10
  }
});
