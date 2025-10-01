import { interpolate } from 'react-native-reanimated';
import { LogService } from "../../services";
export function getOffsetForValue(value, span, minimumValue = 0, maximumValue = 1) {
  const range = maximumValue - minimumValue;
  const relativeValue = minimumValue - value;
  const v = minimumValue < 0 ? Math.abs(relativeValue) : value - minimumValue; // for negative values
  const ratio = v / range;
  const x = ratio * span;
  return x;
}
function countDecimals(value) {
  'worklet';

  if (Math.floor(value.valueOf()) === value.valueOf()) {
    return 0;
  }
  return value.toString().split('.')[1].length || 0;
}
export function getValueForOffset(offset, span, minimum = 0, maximum = 1, step = 0) {
  'worklet';

  if (span) {
    const ratio = offset / span;
    const range = maximum - minimum;
    let val = ratio * range;
    if (step > 0) {
      const decimals = countDecimals(step);
      val = Number((Math.round(ratio * range / step) * step).toFixed(decimals));
    }
    return Math.max(minimum, Math.min(maximum, minimum + val));
  }
  return 0;
}
function inRange(value, min, max) {
  return value >= min && value <= max;
}
export function validateValues(props) {
  const {
    useRange,
    value,
    minimumValue = 0,
    maximumValue = 1,
    initialMinimumValue,
    initialMaximumValue
  } = props;
  if (minimumValue > maximumValue || useRange && initialMinimumValue && initialMaximumValue && initialMinimumValue > initialMaximumValue) {
    LogService.forwardError({
      message: 'Your passed values are invalid. Please check if minimum values are not higher than maximum values'
    });
  }
  if (value !== undefined && minimumValue && maximumValue && !inRange(value, minimumValue, maximumValue)) {
    LogService.forwardError({
      message: `Your passed value (${value}) is invalid. 
      Please check that it is in range of the minimum (${minimumValue}) and maximum (${maximumValue}) values`
    });
  }
  if (useRange && initialMinimumValue && initialMaximumValue) {
    if (!inRange(initialMinimumValue, minimumValue, maximumValue) || !inRange(initialMaximumValue, minimumValue, maximumValue)) {
      LogService.forwardError({
        message: 'Your passed values are invalid. Please check that they are in range of the minimum and maximum values'
      });
    }
  }
}
export function getStepInterpolated(trackWidth, minimumValue, maximumValue, stepXValue) {
  'worklet';

  const outputRange = [0, trackWidth];
  const inputRange = minimumValue < 0 ? [0, Math.abs(minimumValue) + maximumValue] : [0, maximumValue - minimumValue];
  return interpolate(stepXValue.value, inputRange, outputRange);
}