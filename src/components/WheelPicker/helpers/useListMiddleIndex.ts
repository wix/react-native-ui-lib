type ItemType = {
    itemHeight: number;
    listSize: number;
}

export default ({itemHeight, listSize}: ItemType) => {
  const valueInRange = (value: number, min: number, max: number): number => {
    if (value < min || value === -0) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  };

  const middleIndex = (offset: number): number => {
    const calculatedIndex = Math.round(offset / itemHeight);
    return valueInRange(calculatedIndex, 0, listSize - 1);
  };

  return middleIndex;
};
