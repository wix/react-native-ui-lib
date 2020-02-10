import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Colors, Spacings, View, Card, Text, Image, Constants} from 'react-native-ui-lib';
import _ from 'lodash';

import './configurations';

const IMAGES = [
  'https://images.pexels.com/photos/3337210/pexels-photo-3337210.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3496994/pexels-photo-3496994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/3494648/pexels-photo-3494648.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3297502/pexels-photo-3297502.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3280908/pexels-photo-3280908.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3323694/pexels-photo-3323694.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/3137078/pexels-photo-3137078.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3350141/pexels-photo-3350141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3127161/pexels-photo-3127161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2872767/pexels-photo-2872767.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3271010/pexels-photo-3271010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3255549/pexels-photo-3255549.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3206153/pexels-photo-3206153.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
];

const GUTTER_SIZE = Spacings.page;
const COLUMN_SIZE = (Constants.screenWidth - 2 * Spacings.page - GUTTER_SIZE) / 2;

class Pinterest extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.loadImages();
  }

  static options() {
    return {
      topBar: {
        background: {
          color: 'transparent'
        },
        backButton: {
          color: Colors.dark10
        }
      }
    };
  }

  loadImages() {
    const images = {};

    _.map(IMAGES, (image, index) => {
      Image.getSize(image,
        (width, height) => {
          images[index] = {
            uri: image,
            width,
            height,
            aspectRatio: width / height
          };

          if (_.size(images) === IMAGES.length) {
            this.setState({images: _.values(images)});
          }
        },
        () => {
          images[index] = {
            uri: image,
            width: COLUMN_SIZE,
            height: COLUMN_SIZE,
            aspectRatio: 1
          };
        });
    });
  }

  renderImage(image) {
    return (
      <Card
        key={image.uri}
        onPress={_.noop}
        borderRadius={10}
        enableShadow
        marginB-page
        useNative
        activeScale={0.98}
        activeOpacity={1}
      >
        <Image style={[styles.image, {aspectRatio: image.aspectRatio}]} source={{uri: image.uri}} width={COLUMN_SIZE}/>
      </Card>
    );
  }

  renderColumn(columnIndex) {
    const {images} = this.state;
    return (
      <View marginR-page={columnIndex === 0}>
        {_.map(images, (image, index) => {
          if (index % 2 === columnIndex) {
            return this.renderImage(image);
          }
        })}
      </View>
    );
  }

  render() {
    const {images} = this.state;

    if (!images) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        <View padding-page row>
          {this.renderColumn(0)}
          {this.renderColumn(1)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: COLUMN_SIZE,
    borderRadius: 10
  }
});

export default Pinterest;
