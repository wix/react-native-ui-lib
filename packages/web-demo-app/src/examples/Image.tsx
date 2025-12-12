import React from 'react';
import {StyleSheet} from 'react-native-web';
import {Image as MobileImage, ProgressiveImage as MobileProgressiveImage} from 'react-native-ui-lib';

const source = 'https://picsum.photos/200';
const source2 = 'https://picsum.photos/300';

export const Image = () => (
  <MobileImage
    accessibilityLabel={'React logo'}
    source={{uri: source}}
    resizeMode="contain"
    style={styles.logo}
  />
);

export const ProgressiveImage = () => (
  <MobileProgressiveImage
    source={{uri: source2, cache: 'reload'}}
    thumbnailSource={{uri: source, cache: 'reload'}}
    resizeMode="contain"
    style={styles.logo}
  />
);

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100
  }
});
