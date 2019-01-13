import React, {Component} from 'react';
import {ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import _ from 'lodash';
import {AnimatedImage, Colors} from 'react-native-ui-lib'; //eslint-disable-line

const SampleImages = [
  'https://static.pexels.com/photos/50721/pencils-crayons-colourful-rainbow-50721.jpeg',
  'https://static.pexels.com/photos/60628/flower-garden-blue-sky-hokkaido-japan-60628.jpeg'
];

export default class AnimatedImageScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {_.map(SampleImages, (image, index) => (
          <AnimatedImage
            containerStyle={{backgroundColor: Colors.blue50, marginBottom: 10}}
            style={{resizeMode: 'cover', height: 250}}
            source={{uri: image}}
            loader={<ActivityIndicator />}
            key={index}
            animationDuration={index === 0 ? 300 : 800}
          />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
