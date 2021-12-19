import { AlignmentModifiers } from '../../../commons/modifiers';
export declare enum AlignmentType {
    DEFAULT = "default",
    BOTTOM = "bottom",
    TOP = "top"
}
declare const useAlignmentStyle: (props: AlignmentModifiers) => {
    alignmentType: AlignmentType;
    alignmentStyle: any[];
};
export default useAlignmentStyle;
