import {useCallback, useRef, useState, RefCallback} from 'react';
import {View} from 'react-native';
import {Constants} from '../../commons/new';
import {PanningDirectionsEnum} from '../panView';

type HiddenLocationRecord = Record<PanningDirectionsEnum, number>;

export interface HiddenLocation extends HiddenLocationRecord {
  wasMeasured: boolean;
}

export default function useHiddenLocation<T extends View>() {
  const getHiddenLocation = ({
    x = 0,
    y = 0,
    width = Constants.screenWidth,
    height = Constants.windowHeight,
    wasMeasured = false
  }): HiddenLocation => {
    return {
      up: -y - height,
      down: Constants.windowHeight - y,
      left: -width - x,
      right: Constants.screenWidth - x,
      wasMeasured
    };
  };

  const [hiddenLocation, setHiddenLocation] = useState<HiddenLocation>(getHiddenLocation({}));
  const ref = useRef<T>();
  const wasMeasured = useRef(false);

  const measure = useCallback(() => {
    if (!wasMeasured.current) {
      ref.current?.measureInWindow((x, y, width, height) => {
        if (!wasMeasured.current && width > 0 && height > 0) {
          wasMeasured.current = true;
          setHiddenLocation(getHiddenLocation({
            x,
            y,
            width,
            height,
            wasMeasured: true
          }));
        }
      });
    }
  }, []);

  const setRef: RefCallback<T> = useCallback((node: T) => {
    if (node) {
      ref.current = node;
      measure();
    }
  },
  [measure]);

  const onLayout = useCallback(() => {
    measure();
  }, [measure]);

  return {setRef, onLayout, hiddenLocation};
}
