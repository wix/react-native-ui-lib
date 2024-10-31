import React, {useEffect, useState} from 'react';
import {LiveProvider, LivePreview} from 'react-live';
import {View, Colors} from 'react-native-ui-lib/core';
import ReactLiveScope from '../theme/ReactLiveScope';

const messageType = 'LIVE_PREVIEW_CODE_UPDATE_MESSAGE';

export default function UILivePreview() {
  const [code, setCode] = useState(``);

  useEffect(() => {
    window.addEventListener('message', (e: MessageEvent) => {
      if (e.data.type === messageType) {
        console.log(e.data.code);
      }
      setCode(e.data.code);
    });
  }, []);

  return (
    <View
      bg-$backgroundDefault
      margin-s2
      style={{
        alignSelf: 'center',
        borderRadius: 40,
        borderWidth: 4,
        borderColor: Colors.$outlineDisabledHeavy,
        width: 350,
        height: 700
      }}
    >
      <LiveProvider code={code} scope={ReactLiveScope}>
        <LivePreview style={{padding: 20}}/>
      </LiveProvider>
    </View>
  );
}
