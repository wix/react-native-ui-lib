/// <reference types="react" />
import type { LayoutChangeEvent, LayoutRectangle, View as RNView } from 'react-native';
import { HintProps } from '../types';
type UseHintLayoutProps = Pick<HintProps, 'onBackgroundPress' | 'targetFrame'>;
export default function useHintLayout({ onBackgroundPress, targetFrame }: UseHintLayoutProps): {
    targetLayoutState: LayoutRectangle | undefined;
    targetLayoutInWindowState: LayoutRectangle | undefined;
    hintMessageWidth: number | undefined;
    targetRef: import("react").MutableRefObject<RNView | null>;
    onTargetLayout: ({ nativeEvent: { layout } }: LayoutChangeEvent) => void;
    setHintLayout: ({ nativeEvent: { layout } }: LayoutChangeEvent) => void;
};
export {};
