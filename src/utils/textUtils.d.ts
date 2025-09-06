import { HighlightString, HighlightStringProps } from '../components/text';
interface TextPartByHighlight extends HighlightStringProps {
    shouldHighlight: boolean;
}
declare function getPartsByHighlight(targetString: string | undefined, highlightString: HighlightString | HighlightString[]): TextPartByHighlight[];
declare function getTextPartsByHighlight(targetString?: string, highlightString?: HighlightString): TextPartByHighlight[];
declare function getArrayPartsByHighlight(targetString?: string, highlightString?: HighlightString[]): TextPartByHighlight[];
export { getPartsByHighlight, getTextPartsByHighlight, getArrayPartsByHighlight };
