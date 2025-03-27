import React, {useEffect, useState} from 'react';
import {LiveProvider, LivePreview} from 'react-live';
import {IFRAME_MESSAGE_TYPE} from '@site/src/components/UILivePreview';
import ReactLiveScope from '../theme/ReactLiveScope';
import styles from './livePreview.module.css';

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
      <div className={styles.fakeTopBar}/>
      <LivePreview className={styles.mobileFlexContainer}/>
    </LiveProvider>
  );
}
