import _isEqual from "lodash/isEqual";
import { useCallback, useRef, useState } from 'react';
import { Constants } from "../../commons/new";
// Adding this for headless tests that are not triggering onLayout
const wasMeasuredDefaultValue = global._UILIB_TESTING ?? false;
export default function useHiddenLocation() {
  const getHiddenLocation = ({
    x = 0,
    y = 0,
    width = Constants.screenWidth,
    height = Constants.windowHeight,
    wasMeasured = wasMeasuredDefaultValue
  }) => {
    return {
      up: -y - height,
      down: Constants.windowHeight - y,
      left: -width - x,
      right: Constants.screenWidth - x,
      wasMeasured
    };
  };
  const [hiddenLocation, setHiddenLocation] = useState(getHiddenLocation({}));
  const ref = useRef();
  const layoutData = useRef();
  const wasMeasured = useRef(wasMeasuredDefaultValue);
  const measure = useCallback(() => {
    if (ref.current && layoutData.current && layoutData.current.width > 0 && layoutData.current.height > 0) {
      wasMeasured.current = true;
      const {
        x,
        y,
        width,
        height
      } = layoutData.current;
      setHiddenLocation(getHiddenLocation({
        x,
        y,
        width,
        height,
        wasMeasured: true
      }));
    }
  }, []);
  const setRef = useCallback(node => {
    if (node) {
      ref.current = node;
      measure();
    }
  }, [measure]);
  const onLayout = useCallback(event => {
    if (!_isEqual(layoutData.current, event.nativeEvent.layout)) {
      layoutData.current = event.nativeEvent.layout;
      measure();
    }
  }, [measure]);
  return {
    setRef,
    onLayout,
    hiddenLocation
  };
}