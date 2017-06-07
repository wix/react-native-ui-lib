import {Constants} from '../../helpers';
import {BorderRadiuses} from '../../style';

export function extractPositionValues(position) {
  const top = position === 'top';
  const left = position === 'left';
  const right = position === 'right';
  const bottom = position === 'bottom';

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
