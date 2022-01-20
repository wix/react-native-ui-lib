/// <reference types="react" />
import { TextStyle } from 'react-native';
export interface CharCounterProps {
    /**
     * Should show a character counter (works only with maxLength)
     */
    showCharCounter?: boolean;
    maxLength?: number;
    /**
     * Pass custom style to character counter text
     */
    charCounterStyle?: TextStyle;
    testID: string;
}
declare const CharCounter: {
    ({ maxLength, charCounterStyle, testID }: CharCounterProps): JSX.Element | null;
    displayName: string;
};
export default CharCounter;
