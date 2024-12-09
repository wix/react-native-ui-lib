import _ from 'lodash';
import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import '../ComponentPage.module.scss';
import ReactLiveScope from '../../theme/ReactLiveScope';
import UILivePreview from '../UILivePreview';

export const Usage = ({component}) => {
  const componentLivePlaygroundSupport = !!ReactLiveScope[component.name];
  const code = component.snippet?.map(item => _.replace(item, new RegExp(/\$[1-9]/, 'g'), '')).join('\n');
  if (component.snippet) {
    return componentLivePlaygroundSupport ? (
      <UILivePreview code={code}/>
    ) : (
      <div>
        <CodeBlock language="jsx">{code}</CodeBlock>
      </div>
    );
  }
};
