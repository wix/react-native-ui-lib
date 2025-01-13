import {type ElementRef, useState, useCallback, useRef} from 'react';
import type {LayoutChangeEvent, LayoutRectangle, View as RNView} from 'react-native';
import _ from 'lodash';

export default function useHintLayout(hasBackgroundPress: boolean) {
  const [targetLayoutState, setTargetLayout] = useState<LayoutRectangle>();
  const [targetLayoutInWindowState, setTargetLayoutInWindow] = useState<LayoutRectangle>();
  const [hintMessageWidth, setHintMessageWidth] = useState<number | undefined>();
  const targetRef = useRef<ElementRef<typeof RNView> | null>(null);

  const onTargetLayout = useCallback(({nativeEvent: {layout}}: LayoutChangeEvent) => {
    if (!_.isEqual(targetLayoutState, layout)) {
      setTargetLayout(layout);
    }

    if (!targetLayoutInWindowState || hasBackgroundPress) {
      setTimeout(() => {
        targetRef?.current?.measureInWindow?.((x: number, y: number, width: number, height: number) => {
          const targetLayoutInWindow = {x, y, width, height};
          setTargetLayoutInWindow(targetLayoutInWindow);
        });
      });
    }
  },
  [targetLayoutState, targetLayoutInWindowState, hasBackgroundPress]);

  const setHintLayout = useCallback(({nativeEvent: {layout}}: LayoutChangeEvent) => {
    if (!hintMessageWidth) {
      setHintMessageWidth(layout.width);
    }
  },
  [hintMessageWidth]);

  return {
    targetLayoutState,
    targetLayoutInWindowState,
    hintMessageWidth,
    targetRef,
    onTargetLayout,
    setHintLayout
  };
}
