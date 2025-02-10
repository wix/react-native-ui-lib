import {useMemo} from 'react';
import {LayoutRectangle} from 'react-native';
import _ from 'lodash';
import {Constants} from '../../../commons/new';
import {HintPositions, LayoutStyle, PositionStyle, PaddingsStyle, TargetAlignments, HintProps} from '../types';

interface UseHintPositionProps extends Pick<HintProps, 'position' | 'useSideTip'> {
  isUsingModal: boolean;
  targetLayoutState?: LayoutRectangle;
  targetLayoutInWindowState?: LayoutRectangle;
  containerWidth: number;
  edgeMargins: number;
  offset: number;
  hintMessageWidth?: number;
}

export default function useHintPosition({
  isUsingModal,
  targetLayoutState,
  targetLayoutInWindowState,
  position,
  containerWidth,
  useSideTip,
  offset,
  edgeMargins,
  hintMessageWidth
}: UseHintPositionProps) {
  const targetMidPosition = useMemo(() => {
    if (targetLayoutInWindowState?.x !== undefined && targetLayoutInWindowState?.width) {
      const midPosition = targetLayoutInWindowState?.x + targetLayoutInWindowState?.width / 2;
      return Constants.isRTL ? containerWidth - midPosition : midPosition;
    }
  }, [targetLayoutInWindowState, containerWidth]);

  const tipSize = useMemo(() => {
    return useSideTip ? {width: 14, height: 7} : {width: 20, height: 7};
  }, [useSideTip]);

  // Calculate target's horizontal position on screen (left, center, right)
  const targetAlignmentOnScreen = useMemo(() => {
    const _containerWidth = containerWidth - edgeMargins * 2;
    if (targetMidPosition !== undefined) {
      if (targetMidPosition > _containerWidth * (4 / 5)) {
        return TargetAlignments.RIGHT;
      } else if (targetMidPosition < _containerWidth * (1 / 5)) {
        return TargetAlignments.LEFT;
      }
    }
    return TargetAlignments.CENTER;
  }, [targetMidPosition, containerWidth, edgeMargins]);

  // Calc the hint container - a full width rectangle that contains the hint bubble message
  const hintContainerLayout = useMemo(() => {
    const containerStyle: LayoutStyle = {alignItems: 'flex-start'};

    if (targetLayoutInWindowState?.x !== undefined) {
      containerStyle.left = -targetLayoutInWindowState.x;
    }

    if (position === HintPositions.TOP) {
      containerStyle.bottom = 0;
    } else if (targetLayoutInWindowState?.height) {
      containerStyle.top = targetLayoutInWindowState.height;
    }

    return containerStyle;
  }, [position, targetLayoutInWindowState]);

  const hintPositionStyle = useMemo(() => {
    const positionStyle = {left: 0};
    if (targetMidPosition !== undefined && hintMessageWidth !== undefined) {
      positionStyle.left = targetMidPosition;
      positionStyle.left -= hintMessageWidth / 2;
      positionStyle.left = _.clamp(positionStyle.left, edgeMargins, containerWidth - edgeMargins - hintMessageWidth); 
    }

    return positionStyle;
  }, [hintMessageWidth, edgeMargins, containerWidth, targetMidPosition]);

  const tipPositionStyle = useMemo(() => {
    const positionStyle: PositionStyle = {};
    const _containerWidth = containerWidth - (isUsingModal ? 0 : edgeMargins);

    if (position === HintPositions.TOP) {
      positionStyle.bottom = offset - tipSize.height;
      !useSideTip ? (positionStyle.bottom += 1) : undefined;
    } else {
      positionStyle.top = offset - tipSize.height;
    }

    if (
      targetMidPosition !== undefined &&
      targetLayoutInWindowState?.x !== undefined &&
      targetLayoutInWindowState?.width &&
      hintMessageWidth !== undefined
    ) {
      const layoutWidth = targetLayoutInWindowState?.width || 0;
      const targetMidWidth = layoutWidth / 2;
      const tipMidWidth = tipSize.width / 2;

      let sideTipPosition = 0;

      if (targetAlignmentOnScreen === TargetAlignments.LEFT || targetAlignmentOnScreen === TargetAlignments.CENTER) {
        sideTipPosition = Math.max(hintPositionStyle.left, targetLayoutInWindowState.x);
      } else if (targetAlignmentOnScreen === TargetAlignments.RIGHT) {
        sideTipPosition =
          Math.min(hintPositionStyle.left + hintMessageWidth,
            targetLayoutInWindowState.x + targetLayoutInWindowState.width) - edgeMargins;
      }

      const leftPosition = useSideTip ? sideTipPosition : targetMidPosition - tipMidWidth;
      const rightPosition = useSideTip
        ? _containerWidth - targetLayoutInWindowState.x - layoutWidth
        : _containerWidth - targetLayoutInWindowState.x - targetMidWidth - tipMidWidth;

      positionStyle.left = Constants.isRTL ? rightPosition : leftPosition;
    }

    return positionStyle;
  }, [
    targetMidPosition,
    targetLayoutInWindowState,
    hintMessageWidth,
    hintPositionStyle,
    containerWidth,
    position,
    targetAlignmentOnScreen,
    offset,
    useSideTip,
    tipSize,
    isUsingModal,
    edgeMargins
  ]);

  const hintPadding = useMemo(() => {
    const paddings: PaddingsStyle = {paddingVertical: offset};
    return paddings;
  }, [offset]);


  // This is the offset between the target relative position and its absolute position on the screen
  const targetScreenToRelativeOffset = useMemo(() => {
    return {
      left: (targetLayoutState?.x ?? 0) - (targetLayoutInWindowState?.x ?? 0),
      top: (targetLayoutState?.y ?? 0) - (targetLayoutInWindowState?.y ?? 0)
    };
  }, [targetLayoutState, targetLayoutInWindowState]);

  return {
    tipSize,
    targetAlignmentOnScreen,
    hintContainerLayout,
    tipPositionStyle,
    hintPadding,
    hintPositionStyle,
    targetScreenToRelativeOffset
  };
}
