/// <reference types="react" />
import { ImageProps } from '../image';
export declare enum FaderPosition {
    /**
     * @deprecated please use START instead
     */
    LEFT = "LEFT",
    START = "START",
    /**
     * @deprecated please use END instead
     */
    RIGHT = "RIGHT",
    END = "END",
    TOP = "TOP",
    BOTTOM = "BOTTOM"
}
export declare type FaderProps = Pick<ImageProps, 'supportRTL'> & {
    /**
     * Whether the fader is visible (default is true)
     */
    visible?: boolean;
    /**
     * The position of the fader (the image is different), defaults to Fader.position.END
     */
    position?: FaderPosition;
    /**
     * Set to change from the default size (50) of the fade view.
     */
    size?: number;
    /**
     * Change the default (white) tint color of the fade view.
     */
    tintColor?: string;
};
/**
 * @description: A gradient fading overlay to render on top of overflowing content (like scroll component)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FaderScreen.tsx
 */
declare function Fader(props: FaderProps): JSX.Element;
declare namespace Fader {
    var displayName: string;
    var position: typeof FaderPosition;
}
export default Fader;
