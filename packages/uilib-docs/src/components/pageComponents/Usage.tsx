import _ from 'lodash';
import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import '../ComponentPage.module.scss';
import UILivePreview from '../UILivePreview';
import {isComponentSupported} from '../../utils/componentUtils';

export const Usage = ({component}) => {
  if (component.snippet) {
    const code = component.snippet.map(item => _.replace(item, new RegExp(/\$[1-9]/, 'g'), '')).join('\n');
    return isComponentSupported(component.name) ? (
      <UILivePreview code={code} liveScopeSupport/>
    ) : (
      <CodeBlock language="jsx">{code}</CodeBlock>
    );
  }
};
