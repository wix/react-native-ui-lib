import {type ElementRef, useState, useCallback, useRef, useEffect} from 'react';
import type {LayoutChangeEvent, LayoutRectangle, View as RNView} from 'react-native';
import _ from 'lodash';
import {HintProps} from '../types';

type UseHintLayoutProps = Pick<HintProps, 'onBackgroundPress' | 'targetFrame'>;

export default function useHintLayout({onBackgroundPress, targetFrame}: UseHintLayoutProps) {
  const [targetLayoutState, setTargetLayout] = useState<LayoutRectangle | undefined>(targetFrame);
  const [targetLayoutInWindowState, setTargetLayoutInWindow] = useState<LayoutRectangle | undefined>(targetFrame);
  const [hintMessageWidth, setHintMessageWidth] = useState<number | undefined>();
  const targetRef = useRef<ElementRef<typeof RNView> | null>(null);

  useEffect(() => {
    if (targetFrame && !_.isEqual(targetFrame, targetLayoutState)) {
      setTargetLayout(targetFrame);
      setTargetLayoutInWindow(targetFrame);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetFrame]);

  const onTargetLayout = useCallback(({nativeEvent: {layout}}: LayoutChangeEvent) => {
    if (!_.isEqual(targetLayoutState, layout)) {
      setTargetLayout(layout);
    }

    if (!targetLayoutInWindowState || !!onBackgroundPress) {
      setTimeout(() => {
        targetRef?.current?.measureInWindow?.((x: number, y: number, width: number, height: number) => {
          const targetLayoutInWindow = {x, y, width, height};
          setTargetLayoutInWindow(targetLayoutInWindow);
        });
      });
    }
  },
  [targetLayoutState, targetLayoutInWindowState, onBackgroundPress]);

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
