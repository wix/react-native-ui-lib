import {useMemo} from 'react';
import _ from 'lodash';
import {Constants} from '../../../commons/new';
import {
  HintPositions,
  HintPositionStyle,
  Position,
  Paddings,
  TARGET_POSITIONS,
  HintTargetFrame,
  HintProps
} from '../types';

interface UseHintPositionProps extends Pick<HintProps, 'position' | 'useSideTip'> {
  offset: number;
  targetLayout?: HintTargetFrame;
  containerWidth: number;
  edgeMargins: number;
}

export default function useHintPosition({
  targetLayout,
  position,
  containerWidth,
  useSideTip,
  offset,
  edgeMargins
}: UseHintPositionProps) {
  const targetPositionOnScreen = useMemo(() => {
    if (targetLayout?.x !== undefined && targetLayout?.width) {
      const targetMidPosition = targetLayout.x + targetLayout.width / 2;

      if (targetMidPosition > containerWidth * (4 / 5)) {
        return TARGET_POSITIONS.RIGHT;
      } else if (targetMidPosition < containerWidth * (1 / 5)) {
        return TARGET_POSITIONS.LEFT;
      }
    }
    return TARGET_POSITIONS.CENTER;
  }, [targetLayout, containerWidth]);

  const shouldUseSideTip = useMemo(() => {
    if (!_.isUndefined(useSideTip)) {
      return useSideTip;
    }

    return targetPositionOnScreen !== TARGET_POSITIONS.CENTER;
  }, [useSideTip, targetPositionOnScreen]);

  const tipSize = useMemo(() => {
    return shouldUseSideTip ? {width: 14, height: 7} : {width: 20, height: 7};
  }, [shouldUseSideTip]);

  const hintPosition = useMemo(() => {
    const hintPositionStyle: HintPositionStyle = {alignItems: 'center'};

    if (targetLayout?.x !== undefined) {
      hintPositionStyle.left = -targetLayout.x;
    }

    if (position === HintPositions.TOP) {
      hintPositionStyle.bottom = 0;
    } else if (targetLayout?.height) {
      hintPositionStyle.top = targetLayout.height;
    }

    if (targetPositionOnScreen === TARGET_POSITIONS.RIGHT) {
      hintPositionStyle.alignItems = Constants.isRTL ? 'flex-start' : 'flex-end';
    } else if (targetPositionOnScreen === TARGET_POSITIONS.LEFT) {
      hintPositionStyle.alignItems = Constants.isRTL ? 'flex-end' : 'flex-start';
    }

    return hintPositionStyle;
  }, [position, targetLayout, targetPositionOnScreen]);

  const containerPosition = useMemo(() => {
    if (targetLayout) {
      return {top: targetLayout.y, left: targetLayout.x};
    }
  }, [targetLayout]);

  const tipPosition = useMemo(() => {
    const tipPositionStyle: Position = {};

    if (position === HintPositions.TOP) {
      tipPositionStyle.bottom = offset - tipSize.height;
      !shouldUseSideTip ? (tipPositionStyle.bottom += 1) : undefined;
    } else {
      tipPositionStyle.top = offset - tipSize.height;
    }

    const layoutWidth = targetLayout?.width || 0;

    if (targetLayout?.x !== undefined) {
      const targetMidWidth = layoutWidth / 2;
      const tipMidWidth = tipSize.width / 2;

      const leftPosition = shouldUseSideTip ? targetLayout.x : targetLayout.x + targetMidWidth - tipMidWidth;
      const rightPosition = shouldUseSideTip
        ? containerWidth - targetLayout.x - layoutWidth
        : containerWidth - targetLayout.x - targetMidWidth - tipMidWidth;

      switch (targetPositionOnScreen) {
        case TARGET_POSITIONS.LEFT:
          tipPositionStyle.left = Constants.isRTL ? rightPosition : leftPosition;
          break;
        case TARGET_POSITIONS.RIGHT:
          tipPositionStyle.right = Constants.isRTL ? leftPosition : rightPosition;
          break;
        case TARGET_POSITIONS.CENTER:
        default:
          tipPositionStyle.left = targetLayout.x + targetMidWidth - tipMidWidth;
          break;
      }
    }

    return tipPositionStyle;
  }, [targetLayout, containerWidth, position, targetPositionOnScreen, offset, shouldUseSideTip, tipSize]);

  const hintPadding = useMemo(() => {
    const paddings: Paddings = {paddingVertical: offset, paddingHorizontal: edgeMargins};

    if (shouldUseSideTip && targetLayout?.x !== undefined) {
      if (targetPositionOnScreen === TARGET_POSITIONS.LEFT) {
        paddings.paddingLeft = targetLayout.x;
      } else if (targetPositionOnScreen === TARGET_POSITIONS.RIGHT && targetLayout?.width) {
        paddings.paddingRight = containerWidth - targetLayout.x - targetLayout.width;
      }
    }

    return paddings;
  }, [targetLayout, containerWidth, shouldUseSideTip, targetPositionOnScreen, offset, edgeMargins]);

  return {
    shouldUseSideTip,
    tipSize,
    targetPositionOnScreen,
    hintPosition,
    containerPosition,
    tipPosition,
    hintPadding
  };
}
