import React, { ReactElement } from 'react';
import { GestureResponderEvent, ImageSourcePropType, ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
/**
 * @description: Hint component for displaying a tooltip over wrapped component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/HintsScreen.js
 * @notes: You can either wrap a component or pass a specific targetFrame
 */
declare enum HintPositions {
    TOP = "top",
    BOTTOM = "bottom"
}
interface HintTargetFrame {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}
export interface HintProps {
    /**
      * Control the visibility of the hint
      */
    visible?: boolean;
    /**
      * The hint background color
      */
    color?: string;
    /**
      * The hint message
      */
    message?: string | ReactElement;
    /**
      * The hint message custom style
      */
    messageStyle?: StyleProp<TextStyle>;
    /**
      * Icon to show next to the hint's message
      */
    icon?: ImageSourcePropType;
    /**
      * The icon's style
      */
    iconStyle?: StyleProp<ImageStyle>;
    /**
      * The hint's position
      */
    position?: HintPositions;
    /**
      * Provide custom target position instead of wrapping a child
      */
    targetFrame?: HintTargetFrame;
    /**
      * Show side tips instead of the middle tip
      */
    useSideTip?: boolean;
    /**
      * The hint's border radius
      */
    borderRadius?: number;
    /**
      * Hint margins from screen edges
      */
    edgeMargins?: number;
    /**
      * Hint offset from target
      */
    offset?: number;
    /**
      * Callback for the background press
      */
    onBackgroundPress?: (event: GestureResponderEvent) => void;
    /**
      * The hint container width
      */
    containerWidth?: number;
    /**
      * The hint's test identifier
      */
    testID?: string;
    /**
     * Additional styling
     */
    style?: StyleProp<ViewStyle>;
}
declare const _default: React.ComponentClass<HintProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
