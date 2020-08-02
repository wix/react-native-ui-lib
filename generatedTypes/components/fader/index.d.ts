/// <reference types="react" />
export declare enum FaderPosition {
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    TOP = "TOP",
    BOTTOM = "BOTTOM"
}
export declare type FaderProps = {
    /**
     * Whether the fader is visible (default is true)
     */
    visible?: boolean;
    /**
     * The position of the fader (the image is different), defaults to Fader.position.RIGHT
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
declare function Fader(props: FaderProps): JSX.Element;
declare namespace Fader {
    var displayName: string;
    var position: typeof FaderPosition;
}
export default Fader;
