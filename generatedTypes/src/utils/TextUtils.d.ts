interface TextPart {
    string: string;
    shouldStyle: boolean;
}
declare function getPartsToStyle(targetString: string | undefined, stringToStyle: string | string[]): TextPart[];
declare function getTextPartsToStyle(targetString?: string, stringToStyle?: string): TextPart[];
declare function getArrayPartsToStyle(targetString?: string, stringToStyle?: string[]): TextPart[];
export { getPartsToStyle, TextPart, getTextPartsToStyle, getArrayPartsToStyle };
