import { useEffect, useRef, useState } from 'react';
export default () => {
  const ref = useRef();
  const [measurements, setMeasurements] = useState();
  const onMeasure = (x, y, width, height, pageX, pageY) => {
    setMeasurements({
      x,
      y,
      width,
      height,
      pageX,
      pageY
    });
  };
  useEffect(() => {
    setTimeout(() => {
      ref.current?.measure?.(onMeasure);
    }, 0);
  }, []);
  return {
    ref,
    measurements
  };
};