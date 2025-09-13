import _isEqual from "lodash/isEqual";
import { useState, useCallback, useRef } from 'react';
export default function useHintLayout({
  onBackgroundPress,
  targetFrame
}) {
  const [targetLayoutState, setTargetLayout] = useState(targetFrame);
  const [targetLayoutInWindowState, setTargetLayoutInWindow] = useState(targetFrame);
  const [hintMessageWidth, setHintMessageWidth] = useState();
  const targetRef = useRef(null);
  const onTargetLayout = useCallback(({
    nativeEvent: {
      layout
    }
  }) => {
    if (!_isEqual(targetLayoutState, layout)) {
      setTargetLayout(layout);
    }
    if (!targetLayoutInWindowState || !!onBackgroundPress) {
      setTimeout(() => {
        targetRef?.current?.measureInWindow?.((x, y, width, height) => {
          const targetLayoutInWindow = {
            x,
            y,
            width,
            height
          };
          setTargetLayoutInWindow(targetLayoutInWindow);
        });
      });
    }
  }, [targetLayoutState, targetLayoutInWindowState, onBackgroundPress]);
  const setHintLayout = useCallback(({
    nativeEvent: {
      layout
    }
  }) => {
    if (!hintMessageWidth) {
      setHintMessageWidth(layout.width);
    }
  }, [hintMessageWidth]);
  return {
    targetLayoutState,
    targetLayoutInWindowState,
    hintMessageWidth,
    targetRef,
    onTargetLayout,
    setHintLayout
  };
}