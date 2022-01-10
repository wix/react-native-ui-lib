import { PureComponent, ReactElement, ElementRef } from 'react';
import { Animated, StyleProp, ViewStyle, PanResponderGestureState, GestureResponderEvent, LayoutChangeEvent, AccessibilityActionEvent, AccessibilityRole, View as RNView, ViewProps } from 'react-native';
export declare type SliderOnValueChange = (value: number) => void;
export declare type SliderProps = {
    /**
     * Initial value
     */
    value?: number;
    /**
     * Minimum value
     */
    minimumValue?: number;
    /**
     * Maximum value
     */
    maximumValue?: number;
    /**
     * Step value of the slider. The value should be between 0 and (maximumValue - minimumValue)
     */
    step?: number;
    /**
     * The color used for the track from minimum value to current value
     */
    minimumTrackTintColor?: string;
    /**
     * The track color
     */
    maximumTrackTintColor?: string;
    /**
     * Custom render instead of rendering the track
     */
    renderTrack?: () => ReactElement | ReactElement[];
    /**
     * Thumb color
     */
    thumbTintColor?: string;
    /**
     * Callback for onValueChange
     */
    onValueChange?: SliderOnValueChange;
    /**
     * Callback that notifies about slider seeking is started
     */
    onSeekStart?: () => void;
    /**
     * Callback that notifies about slider seeking is finished
     */
    onSeekEnd?: () => void;
    /**
     * The container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * The track style
     */
    trackStyle?: StyleProp<ViewStyle>;
    /**
     * The thumb style
     */
    thumbStyle?: ViewStyle;
    /**
     * Defines how far a touch event can start away from the thumb.
     */
    thumbHitSlop?: ViewProps['hitSlop'];
    /**
     * The active (during press) thumb style
     */
    activeThumbStyle?: ViewStyle;
    /**
     * If true the Slider will not change it's style on press
     */
    disableActiveStyling?: boolean;
    /**
     * If true the Slider will be disabled and will appear in disabled color
     */
    disabled?: boolean;
    /**
     * If true the Slider will stay in LTR mode even if the app is on RTL mode
     */
    disableRTL?: boolean;
    /**
     * If true the component will have accessibility features enabled
     */
    accessible?: boolean;
    /**
     * The slider's test identifier
     */
    testID?: string;
} & typeof defaultProps;
interface State {
    containerSize: Measurements;
    trackSize: Measurements;
    thumbSize: Measurements;
    thumbActiveAnimation: Animated.Value;
    measureCompleted: boolean;
}
declare type Measurements = {
    width: number;
    height: number;
};
declare type MeasuredVariableName = 'containerSize' | 'trackSize' | 'thumbSize';
declare const defaultProps: {
    value: number;
    minimumValue: number;
    maximumValue: number;
    step: number;
    thumbHitSlop: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
};
/**
 * @description: A Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Slider/Slider.gif?raw=true
 */
export default class Slider extends PureComponent<SliderProps, State> {
    static displayName: string;
    static defaultProps: {
        value: number;
        minimumValue: number;
        maximumValue: number;
        step: number;
        thumbHitSlop: {
            top: number;
            bottom: number;
            left: number;
            right: number;
        };
    };
    private thumb;
    private _thumbStyles;
    private minTrack;
    private _minTrackStyles;
    private _x;
    private _dx;
    private _thumbAnimationConstants;
    private initialValue;
    private lastValue;
    private initialThumbSize;
    private _panResponder;
    private containerSize;
    private trackSize;
    private thumbSize;
    private dimensionsChangeListener;
    constructor(props: SliderProps);
    checkProps(props: SliderProps): void;
    getAccessibilityProps(): {
        accessibilityLabel: string;
        accessible: boolean;
        accessibilityRole: AccessibilityRole;
        accessibilityStates: string[];
        accessibilityActions: {
            name: string;
            label: string;
        }[];
    };
    componentDidUpdate(prevProps: SliderProps, prevState: State): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleMoveShouldSetPanResponder: () => boolean;
    handlePanResponderGrant: () => void;
    handlePanResponderMove: (_e: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    handlePanResponderEnd: () => void;
    update(dx: number): void;
    bounceToStep(): void;
    updateStyles(x: number): void;
    updateValue(x: number): void;
    updateThumbStyle(start: boolean): void;
    scaleThumb: (start: boolean) => void;
    thumbAnimationAction: (toValue: number) => void;
    getRoundedValue(value: number): number;
    getValueInRange(value: number): number;
    getXForValue(v: number): number;
    getValueForX(x: number): number;
    getRange(): number;
    setMinTrackRef: (ref: ElementRef<typeof RNView>) => void;
    setThumbRef: (ref: ElementRef<typeof RNView>) => void;
    calculatedThumbActiveScale: () => number;
    updateTrackStepAndStyle: ({ nativeEvent }: GestureResponderEvent) => void;
    onOrientationChanged: () => void;
    onValueChange: (value: number) => void;
    onSeekStart(): void;
    onSeekEnd(): void;
    onContainerLayout: (nativeEvent: LayoutChangeEvent) => void;
    onTrackLayout: (nativeEvent: LayoutChangeEvent) => void;
    onThumbLayout: (nativeEvent: LayoutChangeEvent) => void;
    handleTrackPress: (event: GestureResponderEvent) => void;
    handleMeasure: (name: MeasuredVariableName, { nativeEvent }: LayoutChangeEvent) => void;
    onAccessibilityAction: (event: AccessibilityActionEvent) => void;
    renderThumb: () => JSX.Element;
    render(): JSX.Element;
}
export {};
