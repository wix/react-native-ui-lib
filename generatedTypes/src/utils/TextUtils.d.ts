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
declare function unifyTextPartsStyles(targetString: string | undefined, withStyle1: StyleProp<TextStyle>, noStyle1: StyleProp<TextStyle>, withStyle2: StyleProp<TextStyle>, noStyle2: StyleProp<TextStyle>, textParts1?: TextPart[], textParts2?: TextPart[]): StyledTextPart[] | undefined;
export { getPartsToStyle, unifyTextPartsStyles, TextPart, StyledTextPart, getTextPartsToStyle, getArrayPartsToStyle };
