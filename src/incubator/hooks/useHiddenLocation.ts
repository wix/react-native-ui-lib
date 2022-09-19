import {RefObject, useCallback, useState, useEffect, useRef} from 'react';
import {View, LayoutChangeEvent, LayoutRectangle} from 'react-native';
import {Constants} from '../../commons/new';
import {PanningDirectionsEnum} from '../panView';

type HiddenLocationRecord = Record<PanningDirectionsEnum, number>;

export interface HiddenLocation extends HiddenLocationRecord {
  wasMeasured: boolean;
}

export interface HiddenLocationProps<T extends View> {
  containerRef: RefObject<T>;
}

export default function useHiddenLocation<T extends View>(props: HiddenLocationProps<T>) {
  const {containerRef} = props;
  const size = useRef<Pick<LayoutRectangle, 'width' | 'height'>>();

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

  const measure = useCallback(() => {
    if (!hiddenLocation.wasMeasured && containerRef.current) {
      containerRef.current.measureInWindow((x, y) => {
        if (!hiddenLocation.wasMeasured && size.current) {
          setHiddenLocation(getHiddenLocation({
            x,
            y,
            width: size.current.width,
            height: size.current.height,
            wasMeasured: true
          }));
        }
      });
    }
  }, [hiddenLocation?.wasMeasured, setHiddenLocation, containerRef, size]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    size.current = {width, height};
  }, []);

  useEffect(() => {
    measure();
  }, [measure]);

  return {onLayout, hiddenLocation};
}
