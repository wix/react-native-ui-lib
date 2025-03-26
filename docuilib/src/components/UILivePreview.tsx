import React, {useEffect, useRef, useState} from 'react';
import {LiveProvider, LiveEditor, LiveError} from 'react-live';
import {themes} from 'prism-react-renderer';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CodeBlock from '@theme/CodeBlock';
import ReactLiveScope from '../theme/ReactLiveScope';
import {isComponentSupported} from '../utils/componentUtils';
import useFormattedCode from '../hooks/useFormattedCode';
import styles from './UILivePreview.module.scss';

export const IFRAME_MESSAGE_TYPE = 'LIVE_PREVIEW_CODE_UPDATE_MESSAGE';

export default function UILivePreview({code: initialCode, componentName = undefined, liveScopeSupport = false}) {
  const [code, setCode] = useState('');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const {siteConfig} = useDocusaurusContext();
  const iframeRef = useRef(null);

  const {code: formattedCode} = useFormattedCode(initialCode);

  useEffect(() => {
    setCode(formattedCode);
  }, [formattedCode]);

  useEffect(() => {
    if (iframeLoaded) {
      sendMessageToIframe(code);
    }
  }, [iframeLoaded, code]);

  const sendMessageToIframe = code => {
    const message = {type: IFRAME_MESSAGE_TYPE, code};
    iframeRef.current?.contentWindow.postMessage(message, '*');
  };

  if (!liveScopeSupport && !isComponentSupported(componentName)) {
    return <CodeBlock language="jsx">{code}</CodeBlock>;
  }

  return (
    <BrowserOnly>
      {() => {
        const iframeSource = `${window.location.origin}${siteConfig?.baseUrl}livePreview`;

        return (
          <LiveProvider code={code} scope={ReactLiveScope} theme={themes.oceanicNext}>
            <div className={styles.container}>
              <div className={styles.codeContainer}>
                <LiveEditor onChange={setCode} className={styles.liveEditor}/>
                <div className={styles.errorContainer}>
                  <LiveError/>
                </div>
              </div>
              <div className={styles.preview}>
                <iframe
                  ref={iframeRef}
                  className={styles.iframe}
                  src={iframeSource}
                  title="Simulator"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </div>
          </LiveProvider>
        );
      }}
    </BrowserOnly>
  );
}
