/// <reference types="react" />
export declare enum FaderLocation {
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
     * The location of the fader (the image is different), defaults to Fader.location.RIGHT
     */
    location?: FaderLocation;
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
    var location: typeof FaderLocation;
}
export default Fader;
