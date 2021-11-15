import { StyleProp, TextStyle } from 'react-native';
interface TextPart {
    string: string;
    shouldStyle: boolean;
}
interface StyledTextPart {
    string: string;
    style?: StyleProp<TextStyle>;
}
declare function getPartsToStyle(targetString: string | undefined, stringToStyle: undefined | string | string[]): TextPart[];
declare function getTextPartsToStyle(targetString?: string, stringToStyle?: string): TextPart[];
declare function getArrayPartsToStyle(targetString?: string, stringToStyle?: string[]): TextPart[];
declare function unifyTextPartsStyles(targetString: string | undefined, textParts1: TextPart[] | undefined, withStyle1: StyleProp<TextStyle>, noStyle1: StyleProp<TextStyle>, textParts2: TextPart[] | undefined, withStyle2: StyleProp<TextStyle>, noStyle2: StyleProp<TextStyle>): StyledTextPart[] | undefined;
export { getPartsToStyle, unifyTextPartsStyles, TextPart, StyledTextPart, getTextPartsToStyle, getArrayPartsToStyle };
