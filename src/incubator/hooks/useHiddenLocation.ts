import {RefObject, useCallback, useState} from 'react';
import {View, LayoutChangeEvent} from 'react-native';
import {Constants} from '../../commons/new';
import {PanningDirectionsEnum} from '../panView';

type HiddenLocationRecord = Record<PanningDirectionsEnum, number>;

export interface HiddenLocation extends HiddenLocationRecord {
  isDefault: boolean;
}

export interface HiddenLocationProps<T extends View> {
  containerRef: RefObject<T>;
}

export default function useHiddenLocation<T extends View>(props: HiddenLocationProps<T>) {
  const {containerRef} = props;

  const getHiddenLocation = ({
    x = 0,
    y = 0,
    width = Constants.screenWidth,
    height = Constants.windowHeight,
    isDefault = true
  }): HiddenLocation => {
    return {
      up: -y - height,
      down: Constants.windowHeight - y,
      left: -width - x,
      right: Constants.screenWidth - x,
      isDefault
    };
  };

  const [hiddenLocation, setHiddenLocation] = useState<HiddenLocation>(getHiddenLocation({}));

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    if (containerRef.current) {
      containerRef.current.measureInWindow((x: number, y: number) => {
        setHiddenLocation(getHiddenLocation({x, y, width, height, isDefault: false}));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {onLayout, hiddenLocation};
}
