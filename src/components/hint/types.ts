import type {ReactElement} from 'react';
import type {ViewStyle} from 'react-native';

export type Position = Pick<ViewStyle, 'top' | 'bottom' | 'left' | 'right'>;

export type HintPositionStyle = Position & Pick<ViewStyle, 'alignItems'>;

export type Paddings = Pick<ViewStyle, 'paddingLeft' | 'paddingRight' | 'paddingVertical' | 'paddingHorizontal'>;

export type ContentType = string | ReactElement;

export enum TARGET_POSITIONS {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center'
}

export enum HintPositions {
  TOP = 'top',
  BOTTOM = 'bottom'
}

// TODO: unify with FeatureHighlightFrame
export interface HintTargetFrame {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}
