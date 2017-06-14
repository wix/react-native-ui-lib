import _ from 'lodash';

const TAB = '    ';
const LINE_BREAK = '\n';

export function generateSnippet(instance) {
  const componentName = instance.constructor.displayName;
  const defaultProps = instance.constructor.defaultProps || {};
  const componentProps = instance.props || {};
  let snippet = `<${componentName}`;

  _.forEach(componentProps, (value, key) => {
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

  if (componentProps.children) {
    snippet += `>${LINE_BREAK}</${componentName}>`;
  } else {
    snippet += '/>';
  }
  return snippet;
}
