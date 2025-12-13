import {useEffect, useRef, useState} from 'react';
import {MeasureOnSuccessCallback, View as RNView} from 'react-native';

interface Measurements {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export default () => {
  const ref = useRef<RNView>();
  const [measurements, setMeasurements] = useState<Measurements | undefined>();

  const onMeasure: MeasureOnSuccessCallback = (x, y, width, height, pageX, pageY) => {
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

  return {ref, measurements};
};
