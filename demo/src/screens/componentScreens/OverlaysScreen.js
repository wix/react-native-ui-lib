import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Text, Image, Card, Constants, Colors} from 'react-native-ui-lib'; // eslint-disable-line

const image = require('../../assets/images/card-example.jpg');
const customOverlayImage = require('../../assets/icons/star.png');
const customOverlayImage2 = require('../../assets/icons/cameraSelected.png');

const uri = {
  uri: 'https://images.pexels.com/photos/140234/pexels-photo-140234.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
};

export default class OverlaysScreen extends Component {
  getImageWithOverlay = (type, text, customOverylay) => {
    return (
      <View centerH>
        <Text dark10>{text}</Text>
        <Image /* overlayColor={'red'} */ style={styles.image} source={image} overlayType={type} customOverlayContent={customOverylay}/>
      </View>
    );
  };

  renderCustomOverlay() {
    return <Image style={styles.customOverylay} source={customOverlayImage}/>;
  }

  renderCustomOverlay2() {
    return (
      <View flex center>
        <Image style={styles.customOverylay2} source={customOverlayImage2}/>
      </View>
    );
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View flex padding-20>
          <Text text40 marginB-40>
            Image Overlays
          </Text>
          <View row centerH>
            {this.getImageWithOverlay(Image.overlayTypes.VERTICAL, 'vertical')}
            {this.getImageWithOverlay(Image.overlayTypes.SOLID, 'solid')}
          </View>
          <View row centerH>
            {this.getImageWithOverlay(Image.overlayTypes.TOP, 'top')}
            {this.getImageWithOverlay(Image.overlayTypes.BOTTOM, 'bottom')}
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
            Custom Overlay
          </Text>
          <View row center>
            {this.getImageWithOverlay(undefined, 'cutom overlay only', this.renderCustomOverlay())}
            {this.getImageWithOverlay(Image.overlayTypes.SOLID, 'solid + custom', this.renderCustomOverlay2())}
          </View>
          <View row center>
            {this.getImageWithOverlay(Image.overlayTypes.VERTICAL, 'vertical + custom', this.renderCustomOverlay2())}
            {this.getImageWithOverlay(Image.overlayTypes.BOTTOM, 'bottom + custom', this.renderCustomOverlay())}
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
          Image Overlay (cover, remote, custom overlay)
        </Text>
        <Image
          cover
          source={uri}
          overlayType={Image.overlayTypes.VERTICAL}
          customOverlayContent={this.renderCustomOverlay2()}
        />

        <Text text60BO margin-10>
          Image Overlay (cover, asset)
        </Text>
        <Image cover source={image} overlayType={Image.overlayTypes.VERTICAL}/>

        <Text text60BO margin-10>
          Image Overlay (fill, specific height)
        </Text>
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
    height: 380,
    marginLeft: -20
  },
  overlayImageAbsoluteVertical: {
    position: 'absolute',
    top: 30,
    left: 10,
    width: 150,
    height: 150,
    margin: 5
  },
  overlayImageAbsoluteSolid: {
    position: 'absolute',
    top: 30,
    right: 10,
    width: 150,
    height: 150,
    margin: 5
  },
  overlayImageAbsoluteTop: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    width: 150,
    height: 150,
    margin: 5
  },
  overlayImageAbsoluteBottom: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    width: 150,
    height: 150,
    margin: 5
  },
  cardImage: {
    width: 100,
    borderRadius: 4
  },
  imageFillContainer: {
    height: 100
  },
  customOverylay: {
    position: 'absolute',
    left: 137,
    top: 134,
    width: 25,
    height: 25,
    tintColor: Colors.yellow20,
    borderWidth: 1,
    borderColor: Colors.yellow20,
    borderRadius: 100,
    backgroundColor: Colors.rgba(Colors.yellow20, 0.2)
  },
  customOverylay2: {
    width: 40,
    height: 40,
    tintColor: Colors.white
  }
});
