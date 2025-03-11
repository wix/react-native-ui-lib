import _ from 'lodash';
import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import '../ComponentPage.module.scss';
import ReactLiveScope from '../../theme/ReactLiveScope';
import UILivePreview from '../UILivePreview';

export const Usage = ({component}) => {
  const supportedComponentNames = Object.keys(ReactLiveScope);
  const componentLivePlaygroundSupport = supportedComponentNames.includes(component.name);
  if (component.snippet) {
    const code = component.snippet.map(item => _.replace(item, new RegExp(/\$[1-9]/, 'g'), '')).join('\n');
    return componentLivePlaygroundSupport ? (
      <UILivePreview code={code} liveScopeSupport/>
    ) : (
      <CodeBlock language="jsx">{code}</CodeBlock>
    );
  }
};
