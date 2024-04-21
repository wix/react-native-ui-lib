import React from 'react';
import {View} from 'react-native-ui-lib';
import {CastButton, useRemoteMediaClient} from 'react-native-google-cast';

export default function PlaygroundScreen() {
  const client = useRemoteMediaClient();

  if (client) {
    // Send the media to your Cast device as soon as we connect to a device
    // (though you'll probably want to call this later once user clicks on a video or something)
    client.loadMedia({
      mediaInfo: {
        contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4',
        contentType: 'video/mp4'
      }
    });
  }

  return (
    <View bg-grey80 flex padding-20>
      <CastButton style={{width: 24, height: 24, tintColor: 'black'}}/>
    </View>
  );
}
