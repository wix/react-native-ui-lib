import type { PropsWithChildren } from 'react';
import { TextProps } from '../text';
import { ViewProps } from '../view';
export declare enum MarqueeDirections {
    RIGHT = "RIGHT",
    LEFT = "LEFT",
    UP = "UP",
    DOWN = "DOWN"
}
export type MarqueeProps = PropsWithChildren<{
    /**
     * Marquee label
     */
    label: string;
    /**
     * Marquee label style
     */
    labelStyle?: TextProps['style'];
    /**
     * Marquee direction
     */
    direction?: MarqueeDirections | `${MarqueeDirections}`;
    /**
     * Marquee animation duration
     */
    duration?: number;
    /**
     * Marquee animation number of repetitions
     */
    numberOfReps?: number;
    /**
     * Custom container style
     */
    containerStyle?: ViewProps['style'];
}>;
