declare function getPartsByHighlight(targetString: string | undefined, highlightString: string | string[]): {
    string: string;
    shouldHighlight: boolean;
}[];
declare function getTextPartsByHighlight(targetString?: string, highlightString?: string): {
    string: string;
    shouldHighlight: boolean;
}[];
declare function getArrayPartsByHighlight(targetString?: string, highlightString?: string[]): {
    string: string;
    shouldHighlight: boolean;
}[];
export { getPartsByHighlight, getTextPartsByHighlight, getArrayPartsByHighlight };
