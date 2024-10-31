import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {LiveProvider, LiveEditor} from 'react-live';
import {View} from 'react-native-ui-lib/core';
import ReactLiveScope from '../../theme/ReactLiveScope';

const messageType = 'LIVE_PREVIEW_CODE_UPDATE_MESSAGE';

export default function UILivePreview({code: codeProp}) {
  const [code, setCode] = useState(codeProp);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current && iframeLoaded) {
      setTimeout(() => {
        sendMessageToIframe(code);
      }, 100);
    }
  }, [iframeRef, iframeLoaded, code]);

  const sendMessageToIframe = code => {
    const message = {type: messageType, code};
    iframeRef.current.contentWindow.postMessage(message, '*');
  };

  return (
    <View row gap-s2 style={styles.liveCodeWrapper}>
      <LiveProvider code={code} scope={ReactLiveScope}>
        <View flex>
          <div className="grid grid-cols-2 gap-4" style={{overflow: 'auto', maxHeight: 700}}>
            <LiveEditor className="font-mono" onChange={setCode} style={{overflow: 'hidden', height: '800px'}}/>
          </div>
        </View>
        <iframe
          ref={iframeRef}
          height={720}
          width={350}
          src="http://localhost:3000/react-native-ui-lib/livePreview"
          title="Simulator"
          onLoad={() => setIframeLoaded(true)}
        />
      </LiveProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  liveCodeWrapper: {
    borderRadius: 20,
    borderWidth: 4,
    backgroundColor: '#011627',
    height: 725,
    width: 900
  }
});
