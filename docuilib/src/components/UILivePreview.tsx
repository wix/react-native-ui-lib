import React, {useEffect, useRef, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {LiveProvider, LiveEditor} from 'react-live';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {View, Colors} from 'react-native-ui-lib/core';
import ReactLiveScope from '../theme/ReactLiveScope';

export const IFRAME_MESSAGE_TYPE = 'LIVE_PREVIEW_CODE_UPDATE_MESSAGE';

export default function UILivePreview({code: codeProp}) {
  const [code, setCode] = useState(codeProp);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const {siteConfig} = useDocusaurusContext();
  const iframeRef = useRef(null);
  const iframeSource = `${window.location.origin}${siteConfig?.baseUrl}livePreview`;

  useEffect(() => {
    if (iframeLoaded) {
      sendMessageToIframe(code);
    }
  }, [iframeLoaded, code]);

  const sendMessageToIframe = code => {
    const message = {type: IFRAME_MESSAGE_TYPE, code};
    iframeRef.current?.contentWindow.postMessage(message, '*');
  };

  const liveEditorStyle = useMemo(() => {
    return {overflowY: 'scroll', scrollbarWidth: 'none'};
  }, []);

  return (
    <View row gap-s2 style={styles.liveCodeWrapper}>
      <LiveProvider code={code} scope={ReactLiveScope}>
        <View flex style={styles.editorWrapper}>
          <LiveEditor
            className="font-mono"
            onChange={setCode}
            //@ts-ignore
            style={liveEditorStyle}
          />
        </View>
        <View bg-$backgroundDefault margin-s2 style={styles.iframeWrapper}>
          <iframe
            ref={iframeRef}
            style={styles.iframe}
            src={iframeSource}
            title="Simulator"
            onLoad={() => setIframeLoaded(true)}
          />
        </View>
      </LiveProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  liveCodeWrapper: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#011627',
    height: 725,
    width: 900
  },
  editorWrapper: {maxHeight: 700, padding: 10, borderRadius: 20, overflow: 'hidden'},
  iframeWrapper: {
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 40,
    borderWidth: 4,
    borderColor: Colors.$outlineDisabledHeavy,
    width: 320,
    height: 700
  },
  iframe: {
    width: 335, // Slightly wider to hide scrollbar
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    border: 0,
    padding: 10,
    background: 'transparent'
  }
});
