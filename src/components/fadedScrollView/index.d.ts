import React from 'react';
import { ScrollViewProps } from 'react-native';
import { FaderProps } from '../fader';
import { ComponentStatics } from '../../typings/common';
export type FadedScrollViewProps = ScrollViewProps & {
    /**
     * Show a fader at the start of the scroll
     */
    showStartFader?: boolean;
    /**
     * Additional props for the start fader
     */
    startFaderProps?: Omit<FaderProps, 'visible' | 'position'>;
    /**
     * Show a fader at the end of the scroll
     */
    showEndFader?: boolean;
    /**
     * Additional props for the end fader
     */
    endFaderProps?: Omit<FaderProps, 'visible' | 'position'>;
    /**
     * Use the react-native-gesture-handler version, useful when using react-native-reanimated
     */
    useGesture?: boolean;
    children?: React.ReactNode | React.ReactNode[];
};
export interface FadedScrollViewRef {
    scrollTo(y?: number | {
        x?: number | undefined;
        y?: number | undefined;
        animated?: boolean | undefined;
    }, x?: number, animated?: boolean): void;
    isScrollEnabled: () => boolean;
}
declare const _default: React.ForwardRefExoticComponent<ScrollViewProps & {
    /**
     * Show a fader at the start of the scroll
     */
    showStartFader?: boolean | undefined;
    /**
     * Additional props for the start fader
     */
    startFaderProps?: Omit<FaderProps, "visible" | "position"> | undefined;
    /**
     * Show a fader at the end of the scroll
     */
    showEndFader?: boolean | undefined;
    /**
     * Additional props for the end fader
     */
    endFaderProps?: Omit<FaderProps, "visible" | "position"> | undefined;
    /**
     * Use the react-native-gesture-handler version, useful when using react-native-reanimated
     */
    useGesture?: boolean | undefined;
    children?: React.ReactNode | React.ReactNode[];
} & React.RefAttributes<FadedScrollViewRef>> & ComponentStatics<FadedScrollViewProps>;
export default _default;
