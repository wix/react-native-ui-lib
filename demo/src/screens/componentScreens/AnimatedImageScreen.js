import React, {Component} from 'react';
import {ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import _ from 'lodash';
import {AnimatedImage, Colors} from 'react-native-ui-lib'; //eslint-disable-line

const SampleImages = [
  'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=50'
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
