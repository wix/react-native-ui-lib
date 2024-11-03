import React, {useEffect, useState} from 'react';
import {LiveProvider, LivePreview} from 'react-live';
import ReactLiveScope from '../theme/ReactLiveScope';

const messageType = 'LIVE_PREVIEW_CODE_UPDATE_MESSAGE';

export default function UILivePreview() {
  const [code, setCode] = useState(``);

  useEffect(() => {
    window.addEventListener('message', (e: MessageEvent) => {
      if (e.data.type === messageType) {
        setCode(e.data.code);
      }
    });
  }, []);

  return (
    <LiveProvider code={code} scope={ReactLiveScope}>
      <LivePreview style={{overflow: 'hidden'}}/>
    </LiveProvider>
  );
}
