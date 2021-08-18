import {RefObject, useCallback, useState} from 'react';
import {View, LayoutChangeEvent} from 'react-native';
import {Constants} from 'helpers';

export type HiddenLocation = 'top' | 'bottom' | 'left' | 'right';
interface HiddenLocations {
  isDefault: boolean;
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface HiddenLocationsProps<T extends View> {
  containerRef: RefObject<T>;
}

export default function useHiddenLocations<T extends View>(props: HiddenLocationsProps<T>) {
  const {containerRef} = props;

  const getHiddenLocations = ({
    x = 0,
    y = 0,
    width = Constants.screenWidth,
    height = Constants.windowHeight,
    isDefault = true
  }) => {
    return {
      top: -y - height,
      bottom: Constants.windowHeight - y,
      left: -width - x,
      right: Constants.screenWidth - x,
      isDefault
    };
  };

  const [hiddenLocations, setHiddenLocations] = useState<HiddenLocations>(getHiddenLocations({}));

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    if (containerRef.current) {
      containerRef.current.measureInWindow((x: number, y: number) => {
        setHiddenLocations(getHiddenLocations({x, y, width, height, isDefault: false}));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {onLayout, hiddenLocations};
}
