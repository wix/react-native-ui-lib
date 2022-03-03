import React from 'react';
import { ScrollViewProps } from 'react-native';
import { FaderProps } from '../fader';
export declare type FadedScrollViewProps = ScrollViewProps & {
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
interface Statics {
    scrollTo(y?: number | {
        x?: number | undefined;
        y?: number | undefined;
        animated?: boolean | undefined;
    }, x?: number, animated?: boolean): void;
    isScrollEnabled: () => boolean;
}
declare const _default: React.ComponentType<FadedScrollViewProps> & Statics;
export default _default;
