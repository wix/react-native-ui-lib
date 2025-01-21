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
  isUsingModal: boolean;
  offset: number;
  targetLayout?: HintTargetFrame;
  targetLayoutState?: HintTargetFrame;
  targetLayoutInWindowState?: HintTargetFrame;
  containerWidth: number;
  edgeMargins: number;
  hintMessageWidth?: number;
}

export default function useHintPosition({
  isUsingModal,
  targetLayout,
  targetLayoutState,
  targetLayoutInWindowState,
  position,
  containerWidth,
  useSideTip,
  offset,
  edgeMargins,
  hintMessageWidth
}: UseHintPositionProps) {
  const targetPositionOnScreen = useMemo(() => {
    const _containerWidth = containerWidth - edgeMargins * 2;
    if (targetLayout?.x !== undefined && targetLayout?.width) {
      const targetMidPosition = targetLayout.x + targetLayout.width / 2;

      if (targetMidPosition > _containerWidth * (4 / 5)) {
        return TARGET_POSITIONS.RIGHT;
      } else if (targetMidPosition < _containerWidth * (1 / 5)) {
        return TARGET_POSITIONS.LEFT;
      }
    }
    return TARGET_POSITIONS.CENTER;
  }, [targetLayout, containerWidth, edgeMargins]);

  const tipSize = useMemo(() => {
    return useSideTip ? {width: 14, height: 7} : {width: 20, height: 7};
  }, [useSideTip]);

  const hintContainerLayout = useMemo(() => {
    const containerStyle: HintPositionStyle = {alignItems: 'flex-start'};

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

  const tipPosition = useMemo(() => {
    const tipPositionStyle: Position = {};
    const _containerWidth = containerWidth - (isUsingModal ? 0 : edgeMargins);

    if (position === HintPositions.TOP) {
      tipPositionStyle.bottom = offset - tipSize.height;
      !useSideTip ? (tipPositionStyle.bottom += 1) : undefined;
    } else {
      tipPositionStyle.top = offset - tipSize.height;
    }

    if (targetLayoutInWindowState?.x !== undefined && targetLayoutInWindowState?.width) {
      const layoutWidth = targetLayout?.width || 0;
      const targetMidWidth = layoutWidth / 2;
      const targetMidPosition = targetLayoutInWindowState?.x + targetLayoutInWindowState?.width / 2;
      const tipMidWidth = tipSize.width / 2;

      let sideTipPosition = targetLayoutInWindowState.x;
      if (targetPositionOnScreen === TARGET_POSITIONS.RIGHT) {
        sideTipPosition += targetLayoutInWindowState.width - edgeMargins;
      }

      const leftPosition = useSideTip ? sideTipPosition : targetMidPosition - tipMidWidth;
      const rightPosition = useSideTip
        ? _containerWidth - targetLayoutInWindowState.x - layoutWidth
        : _containerWidth - targetLayoutInWindowState.x - targetMidWidth - tipMidWidth;

      tipPositionStyle.left = Constants.isRTL ? rightPosition : leftPosition;
    }

    return tipPositionStyle;
  }, [
    targetLayoutInWindowState,
    targetLayout,
    containerWidth,
    position,
    targetPositionOnScreen,
    offset,
    useSideTip,
    tipSize,
    isUsingModal,
    edgeMargins
  ]);

  const hintPadding = useMemo(() => {
    const paddings: Paddings = {paddingVertical: offset /* , paddingHorizontal: edgeMargins */};
    return paddings;

    // if (shouldUseSideTip && targetLayout?.x !== undefined) {
    //   if (targetPositionOnScreen === TARGET_POSITIONS.LEFT) {
    //     paddings.paddingLeft = targetLayout.x;
    //   } else if (targetPositionOnScreen === TARGET_POSITIONS.RIGHT && targetLayout?.width) {
    //     paddings.paddingRight = containerWidth - targetLayout.x - targetLayout.width;
    //   }
    // }

    // return paddings;
  }, [offset]);

  const hintPositionStyle = useMemo(() => {
    const positionStyle = {left: 0};
    if (
      targetLayoutInWindowState?.x !== undefined &&
      targetLayoutInWindowState?.width &&
      hintMessageWidth !== undefined
    ) {
      const targetMidPosition = targetLayoutInWindowState.x + targetLayoutInWindowState.width / 2;
      positionStyle.left = targetMidPosition;
      positionStyle.left -= hintMessageWidth / 2;
      positionStyle.left = _.clamp(positionStyle.left, edgeMargins, containerWidth - edgeMargins - hintMessageWidth);
    }

    return positionStyle;
  }, [targetLayoutInWindowState, hintMessageWidth, edgeMargins, containerWidth]);

  const targetScreenToRelativeOffset = useMemo(() => {
    return {
      left: (targetLayoutState?.x ?? 0) - (targetLayoutInWindowState?.x ?? 0),
      top: (targetLayoutState?.y ?? 0) - (targetLayoutInWindowState?.y ?? 0)
    };
  }, [targetLayoutState, targetLayoutInWindowState]);

  return {
    tipSize,
    targetPositionOnScreen,
    hintContainerLayout,
    tipPosition,
    hintPadding,
    hintPositionStyle,
    targetScreenToRelativeOffset
  };
}
