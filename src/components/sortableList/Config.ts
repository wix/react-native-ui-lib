export const getPosition = (order: number, itemHeight: number) => {
  'worklet';
  return order * itemHeight;
};

export const getOrder = (y: number, itemHeight: number) => {
  'worklet';
  return Math.round(y / itemHeight);
};
