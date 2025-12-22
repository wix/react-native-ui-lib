import {isEqual} from 'lodash';
import {useCallback, useRef, useState, RefCallback} from 'react';
import {View, LayoutChangeEvent, LayoutRectangle} from 'react-native';
import {Constants} from '../../commons/new';
import {PanningDirectionsEnum} from '../../components/panView';

type HiddenLocationRecord = Record<PanningDirectionsEnum, number>;

export interface HiddenLocation extends HiddenLocationRecord {
  wasMeasured: boolean;
}

// Adding this for headless tests that are not triggering onLayout
const wasMeasuredDefaultValue = global._UILIB_TESTING ?? false;

export default function useHiddenLocation<T extends View>() {
  const getHiddenLocation = ({
    x = 0,
    y = 0,
    width = Constants.screenWidth,
    height = Constants.windowHeight,
    wasMeasured = wasMeasuredDefaultValue
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
  const wasMeasured = useRef(wasMeasuredDefaultValue);

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
