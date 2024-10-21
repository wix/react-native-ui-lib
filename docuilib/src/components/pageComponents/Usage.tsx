import _ from 'lodash';
import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import '../ComponentPage.module.scss';

export const Usage = ({component}) => {
  if (component.snippet) {
    return (
      <div>
        <CodeBlock language="jsx">
          {component.snippet?.map(item => _.replace(item, new RegExp(/\$[1-9]/, 'g'), '')).join('\n')}
        </CodeBlock>
      </div>
    );
  }
};
