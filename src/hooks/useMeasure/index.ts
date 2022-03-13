import {useEffect, useRef, useState} from 'react';
import {MeasureOnSuccessCallback, MeasureInWindowOnSuccessCallback, View as RNView} from 'react-native';

export interface AbsoluteMeasurements {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Measurements extends AbsoluteMeasurements {
  pageX: number;
  pageY: number;
}

export default () => {
  const ref = useRef<RNView>();
  const [measurements, setMeasurements] = useState<Measurements | undefined>();
  const [absMeasurements, setAbsMeasurements] = useState<AbsoluteMeasurements | undefined>();

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

  const onMeasureInWindow: MeasureInWindowOnSuccessCallback = (x, y, width, height) => {
    setAbsMeasurements({
      x,
      y,
      width,
      height
    });
  };

  useEffect(() => {
    setTimeout(() => {
      ref.current?.measure?.(onMeasure);
      ref.current?.measureInWindow?.(onMeasureInWindow);
    }, 0);
  }, []);

  return {ref, measurements, absMeasurements};
};
