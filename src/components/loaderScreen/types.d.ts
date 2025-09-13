/// <reference types="react" />
import { ActivityIndicatorProps, TextStyle, ViewStyle } from 'react-native';
export type LoaderScreenProps = ActivityIndicatorProps & {
    /**
     * Color of the loading indicator
     */
    loaderColor?: string;
    /**
     * Custom loader
     */
    customLoader?: React.ReactChild;
    /**
     * Color of the loader background (only when passing 'overlay')
     */
    backgroundColor?: string;
    /**
     * loader message
     */
    message?: string;
    /**
     * message style
     */
    messageStyle?: TextStyle;
    /**
     * Show the screen as an absolute overlay
     */
    overlay?: boolean;
    /**
    * Custom container style
    */
    containerStyle?: ViewStyle;
};
