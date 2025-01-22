import {type ElementRef, useState, useCallback, useRef, useEffect} from 'react';
import type {LayoutChangeEvent, LayoutRectangle, View as RNView} from 'react-native';
import _ from 'lodash';
import {SafeAreaInsetsManager} from 'uilib-native';
import {HintProps} from '../types';
import {Constants} from '../../../commons/new';

type UseHintLayoutProps = Pick<HintProps, 'onBackgroundPress' | 'targetFrame'>;

export default function useHintLayout({onBackgroundPress, targetFrame}: UseHintLayoutProps) {
  const [targetLayoutState, setTargetLayout] = useState<LayoutRectangle | undefined>();
  const [targetLayoutInWindowState, setTargetLayoutInWindow] = useState<LayoutRectangle | undefined>();
  const [hintMessageWidth, setHintMessageWidth] = useState<number | undefined>();
  const targetRef = useRef<ElementRef<typeof RNView> | null>(null);

  useEffect(() => {
    if (targetFrame) {
      setTargetLayout(targetFrame);

      if (!onBackgroundPress) {
        setTargetLayoutInWindow(targetFrame);
      } else {
        SafeAreaInsetsManager.getSafeAreaInsets().then(insets => {
          setTargetLayoutInWindow({
            ...targetFrame,
            y: targetFrame.y + (insets?.top ?? 0) + Constants.getSafeAreaInsets().top
          });
        });
      }
    }
  }, []);

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
