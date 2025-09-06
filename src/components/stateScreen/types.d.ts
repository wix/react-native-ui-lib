/// <reference types="react" />
import { ImageURISource } from 'react-native';
export type StateScreenProps = {
    /**
     * The image source that's showing at the top. use an image that was required locally
     */
    imageSource?: ImageURISource;
    source?: ImageURISource;
    /**
     * To to show as the title
     */
    title: string;
    /**
     * Text to to show as the subtitle
     */
    subtitle?: string | React.ReactNode;
    /**
     * Text to to show in the "call to action" button
     */
    ctaLabel?: string;
    /**
     * Action handler for "call to action" button
     */
    onCtaPress?: () => void;
    /**
     * Use to identify the container in tests
     */
    testId?: string;
    testID?: string;
};
