import _ from 'lodash';
import {Props as AnimationProps} from './'

const Color = require('color');

export function generateSource(props: AnimationProps = {}) {
  const {source} = props;
  const color = props.color || _.get(source, 'config.color');
  let template = _.get(source, 'template');

  if (template) {
    const hasMultipleColors = _.isArray(color);
    const templateColors = hasMultipleColors ? color : [color];

    _.forEach(templateColors, (color, index) => {
      const templateInjectId = hasMultipleColors ? `[COLOR${index + 1}]` : '[COLOR]';
      const colorAsDecimalArray = convertColorToDecimalArray(color);
      template = _.replace(template, templateInjectId, `${JSON.stringify(colorAsDecimalArray)}`);
    });
    return JSON.parse(template);
  }
  return source;
}

export function convertColorToDecimalArray(color) {
  const decimalArray = Color(color) // eslint-disable-line
    .array()
    .slice(0, 3)
    .map(i => Number((i / 255).toFixed(3)))
    .concat([Color(color).valpha]); // eslint-disable-line
  return decimalArray;
}

export function getAnimationProps(props) {
  const DEFAULT_WIDTH = 50;
  const DEFAULT_HEIGHT = 50;
  const DEFAULT_DURATION = 1000;
  const DEFAULT_LOOP = false;
  const DEFAULT_VALUE = 1;

  const {source, width, height, duration, loop} = props;
  const config = _.get(source, 'config');

  const finalProps = _.merge(
    {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      duration: DEFAULT_DURATION,
      loop: DEFAULT_LOOP,
      toValue: DEFAULT_VALUE
    },
    config,
    {width, height, duration, loop, toValue: props.progress}
  );
  return finalProps;
}
