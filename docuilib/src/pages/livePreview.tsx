import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {LiveProvider, LivePreview} from 'react-live';
import ReactLiveScope from '../theme/ReactLiveScope';
import {IFRAME_MESSAGE_TYPE} from '@site/src/components/UILivePreview';

export default function UILivePreview() {
  const [code, setCode] = useState(``);

  useEffect(() => {
    window.addEventListener('message', (e: MessageEvent) => {
      if (e.data.type === IFRAME_MESSAGE_TYPE) {
        setCode(e.data.code);
      }
    });
  }, []);

  return (
    <LiveProvider code={code} scope={ReactLiveScope}>
      <LivePreview style={styles.livePreview}/>
    </LiveProvider>
  );
}

const styles = StyleSheet.create({
  livePreview: {
    overflow: 'hidden'
  }
});
