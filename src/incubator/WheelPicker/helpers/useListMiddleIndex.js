export default (({
  itemHeight,
  listSize
}) => {
  const valueInRange = (value, min, max) => {
    if (value < min || value === -0) {
      return min;
    }

    if (value > max) {
      return max;
    }

    return value;
  };

  const middleIndex = offset => {
    const calculatedIndex = Math.round(offset / itemHeight);
    return valueInRange(calculatedIndex, 0, listSize - 1);
  };

  return middleIndex;
});