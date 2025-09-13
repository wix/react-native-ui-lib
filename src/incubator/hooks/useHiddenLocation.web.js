import _isEqual from "lodash/isEqual";
import { useCallback, useRef, useState } from 'react';
import { Constants } from "../../commons/new";
// Adding this for headless tests that are not triggering onLayout
const wasMeasuredDefaultValue = global._UILIB_TESTING ?? false;
export default function useHiddenLocation() {
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
  const [hiddenLocation, setHiddenLocation] = useState(getHiddenLocation({}));
  const ref = useRef();
  const layoutData = useRef();
  const wasMeasured = useRef(wasMeasuredDefaultValue);
  const measure = useCallback(() => {
    if (ref.current) {
      wasMeasured.current = true;
      setHiddenLocation(getHiddenLocation({
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