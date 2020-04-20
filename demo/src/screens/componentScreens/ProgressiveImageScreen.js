import React, {Component} from 'react';
import {View, Text, ProgressiveImage} from 'react-native-ui-lib';

const IMAGE_URL = 'https://images.pexels.com/photos/3222421/pexels-photo-3222421.jpeg';
const THUMB_URL = 'https://images.pexels.com/photos/3222421/pexels-photo-3222421.jpeg?w=50';
const DEFAULT_SIZE = 500;

class ProgressiveImageScreen extends Component {
  render() {
    return (
      <View flex>
        <View centerH height={500}>
          <ProgressiveImage
            style={{height: DEFAULT_SIZE, width: DEFAULT_SIZE}}
            source={{uri: IMAGE_URL, cache: 'reload'}}
            thumbnailSource={{uri: THUMB_URL, cache: 'reload'}}
          />
        </View>
        <View height={2} bg-grey60/>
        <View useSafeArea flex>
          <View padding-20 bottom flex>
            <View flex>
              <Text>Progressive Image</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ProgressiveImageScreen;
