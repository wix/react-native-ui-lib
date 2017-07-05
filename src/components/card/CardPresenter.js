import _ from 'lodash';
import {Constants} from '../../helpers';
import {BorderRadiuses} from '../../style';

export function extractPositionValues(position) {
  const top = _.includes(position, 'top');
  const left = _.includes(position, 'left');
  const right = _.includes(position, 'right');
  const bottom = _.includes(position, 'bottom');

  return {top, left, right, bottom};
}

export function generateBorderRadiusStyle({position}) {
  const {top, left, right, bottom} = extractPositionValues(position);

  const borderRadiusStyle = {};
  if (Constants.isAndroid) {
    borderRadiusStyle.borderTopLeftRadius = (top || left) ? BorderRadiuses.br40 : undefined;
    borderRadiusStyle.borderTopRightRadius = (top || right) ? BorderRadiuses.br40 : undefined;
    borderRadiusStyle.borderBottomLeftRadius = (bottom || left) ? BorderRadiuses.br40 : undefined;
    borderRadiusStyle.borderBottomRightRadius = (bottom || right) ? BorderRadiuses.br40 : undefined;
  }

  return borderRadiusStyle;
}
