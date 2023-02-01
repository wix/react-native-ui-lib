import {isEqual} from 'lodash';
import {useCallback, useRef, useState, RefCallback} from 'react';
import {View, LayoutChangeEvent, LayoutRectangle} from 'react-native';
import {Constants} from '../../commons/new';
import {PanningDirectionsEnum} from '../panView';

type HiddenLocationRecord = Record<PanningDirectionsEnum, number>;

export interface HiddenLocation extends HiddenLocationRecord {
  wasMeasured: boolean;
}

// Adding this for headless tests that are not triggering onLayout
// Unfortunately Dialog._inTest only exist after Dialog was created,
// so this cannot be done statically
function getWasMeasuredDefaultValue() {
  let wasMeasuredDefaultValue = false;
  if (__DEV__) {
    wasMeasuredDefaultValue = require('../Dialog').default._inTest ?? false;
  }

  return wasMeasuredDefaultValue;
}

export default function useHiddenLocation<T extends View>() {
  const wasMeasuredDefaultValue = useRef(getWasMeasuredDefaultValue());
  const getHiddenLocation = ({
    x = 0,
    y = 0,
    width = Constants.screenWidth,
    height = Constants.windowHeight,
    wasMeasured = wasMeasuredDefaultValue.current
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
  const layoutData = useRef<LayoutRectangle>();
  const wasMeasured = useRef(wasMeasuredDefaultValue.current);

  const measure = useCallback(() => {
    if (ref.current && layoutData.current && layoutData.current.width > 0 && layoutData.current.height > 0) {
      wasMeasured.current = true;
      const {x, y, width, height} = layoutData.current;
      setHiddenLocation(getHiddenLocation({
        x,
        y,
        width,
        height,
        wasMeasured: true
      }));
    }
  }, []);

  const setRef: RefCallback<T> = useCallback((node: T) => {
    if (node) {
      ref.current = node;
      measure();
    }
  },
  [measure]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    if (!isEqual(layoutData.current, event.nativeEvent.layout)) {
      layoutData.current = event.nativeEvent.layout;
      measure();
    }
  },
  [measure]);

  return {setRef, onLayout, hiddenLocation};
}
