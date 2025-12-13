import _ from 'lodash';

export function extractPositionValues(position: string[] | undefined) {
  const top = _.includes(position, 'top');
  const left = _.includes(position, 'left');
  const right = _.includes(position, 'right');
  const bottom = _.includes(position, 'bottom');

  return {top, left, right, bottom};
}

export function generateBorderRadiusStyle({position, borderRadius}: {position: string[] | undefined, borderRadius: number | undefined}) {
  const borderRadiusStyle: {[key: string]: number | undefined} = {};

  const {top, left, right, bottom} = extractPositionValues(position);

  borderRadiusStyle.borderTopLeftRadius = top || left ? borderRadius : undefined;
  borderRadiusStyle.borderTopRightRadius = top || right ? borderRadius : undefined;
  borderRadiusStyle.borderBottomLeftRadius = bottom || left ? borderRadius : undefined;
  borderRadiusStyle.borderBottomRightRadius = bottom || right ? borderRadius : undefined;
  return borderRadiusStyle;
}
