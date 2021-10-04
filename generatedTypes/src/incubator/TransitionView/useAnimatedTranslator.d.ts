import { Direction } from './useHiddenLocation';
export interface TranslatorProps {
    initialVisibility: boolean;
}
export default function useAnimatedTranslator(props: TranslatorProps): {
    init: (to: {
        x: number;
        y: number;
    }, animationDirection: Direction, callback: (isFinished: boolean) => void) => void;
    animate: (to: {
        x: number;
        y: number;
    }, animationDirection: Direction, callback: (isFinished: boolean) => void) => void;
    animatedStyle: {
        transform: ({
            translateX: number;
            translateY?: undefined;
        } | {
            translateY: number;
            translateX?: undefined;
        })[];
        opacity: number;
    };
};
