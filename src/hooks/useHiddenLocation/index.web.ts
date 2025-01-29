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
    wasMeasured = wasMeasuredDefaultValue
  }) => {
    return {
      up: -Constants.screenHeight,
      down: Constants.screenHeight,
      left: -Constants.windowWidth,
      right: Constants.windowWidth,
      wasMeasured
    };
  };

  const [hiddenLocation, setHiddenLocation] = useState<HiddenLocation>(getHiddenLocation({}));
  const ref = useRef<T>();
  const layoutData = useRef<LayoutRectangle>();
  const wasMeasured = useRef(wasMeasuredDefaultValue);

  const measure = useCallback(() => {
    if (ref.current) {
      wasMeasured.current = true;
      setHiddenLocation(getHiddenLocation({
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
