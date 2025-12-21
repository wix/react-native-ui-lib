import React from 'react';
import _ from 'lodash';

const TAB = '    ';
const LINE_BREAK = '\n';

export function extractComponentInfo(instance) {
  const componentName = instance.constructor.displayName;
  const defaultProps = instance.constructor.defaultProps || {};
  const props = instance.props || {};
  return {componentName, defaultProps, props};
}

export function generateSnippet({componentName, defaultProps, props}) {
  let snippet = `<${componentName}`;

  _.forEach(props, (value, key) => {
    if (key === 'children') {
      return;
    }
    let formattedValue = `{${value}}`;
    if (_.isObject(value)) {
      formattedValue = `{${JSON.stringify(value)}}`;
    } else if (_.isString(value)) {
      formattedValue = `"${value}"`;
    } else if (_.isBoolean(value) && value === true) {
      formattedValue = '';
    }

    const hasEmptyValue = _.isUndefined(value) || (_.isObject(value) && _.isEmpty(value));
    const hasDefaultValue = value == defaultProps[key]; // eslint-disable-line
    if (!hasEmptyValue && !hasDefaultValue) {
      snippet += `${LINE_BREAK}${TAB}${key}`;
      if (formattedValue) {
        snippet += `=${formattedValue}`;
      }
    }
  });

  if (props.children) {
    const childrenSnippets = React.Children.map(props.children, child => {
      if (_.get(child, 'type.displayName')) {
        const childSnippet =
          TAB +
          generateSnippet({
            componentName: child.type.displayName,
            props: child.props || {},
            defaultProps: child.type.defaultProps || {}
          });
        return childSnippet;
      }
      if (typeof child === 'string') {
        return child;
      }
    });
    snippet += `>${LINE_BREAK}${childrenSnippets.join(LINE_BREAK)}${LINE_BREAK}</${componentName}>`;
  } else {
    snippet += '/>';
  }
  return snippet;
}
