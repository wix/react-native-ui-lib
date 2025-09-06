import { LayoutRectangle } from 'react-native';
import { LayoutStyle, PositionStyle, PaddingsStyle, TargetAlignments, HintProps } from '../types';
interface UseHintPositionProps extends Pick<HintProps, 'position' | 'useSideTip'> {
    isUsingModal: boolean;
    targetLayoutState?: LayoutRectangle;
    targetLayoutInWindowState?: LayoutRectangle;
    containerWidth: number;
    edgeMargins: number;
    offset: number;
    hintMessageWidth?: number;
}
export default function useHintPosition({ isUsingModal, targetLayoutState, targetLayoutInWindowState, position, containerWidth, useSideTip, offset, edgeMargins, hintMessageWidth }: UseHintPositionProps): {
    tipSize: {
        width: number;
        height: number;
    };
    targetAlignmentOnScreen: TargetAlignments;
    hintContainerLayout: LayoutStyle;
    tipPositionStyle: PositionStyle;
    hintPadding: PaddingsStyle;
    hintPositionStyle: {
        left: number;
    };
    targetScreenToRelativeOffset: {
        left: number;
        top: number;
    };
};
export {};
