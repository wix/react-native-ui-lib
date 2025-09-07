import _includes from "lodash/includes";
export function extractPositionValues(position) {
  const top = _includes(position, 'top');
  const left = _includes(position, 'left');
  const right = _includes(position, 'right');
  const bottom = _includes(position, 'bottom');
  return {
    top,
    left,
    right,
    bottom
  };
}
export function generateBorderRadiusStyle({
  position,
  borderRadius
}) {
  const borderRadiusStyle = {};
  const {
    top,
    left,
    right,
    bottom
  } = extractPositionValues(position);
  borderRadiusStyle.borderTopLeftRadius = top || left ? borderRadius : undefined;
  borderRadiusStyle.borderTopRightRadius = top || right ? borderRadius : undefined;
  borderRadiusStyle.borderBottomLeftRadius = bottom || left ? borderRadius : undefined;
  borderRadiusStyle.borderBottomRightRadius = bottom || right ? borderRadius : undefined;
  return borderRadiusStyle;
}