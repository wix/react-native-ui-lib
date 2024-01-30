import React, {Component} from 'react';
import {View, Image} from 'react-native-ui-lib';

const remoteImage = {
  isRemote: true,
  source: {uri: `https://wixmp-1d257fba8470f1b562a0f5f2.wixmp.com/one-app-assets/v2/illustrations/addFAQ.png`},
  dimensions: {width: 160, height: 160}
};

export default class PlaygroundScreen extends Component {
  render() {
    return (
      // TODO: fix the type issues!
      <View bg-grey80 flex padding-20>
        <Image source={remoteImage}/>
        <Image
          source={{uri: `https://wixmp-1d257fba8470f1b562a0f5f2.wixmp.com/one-app-assets/v2/illustrations/addFAQ.png`}}
          width={160}
          height={160}
          style={{borderWidth: 1, marginTop: 20}}
        />
      </View>
    );
  }
}
