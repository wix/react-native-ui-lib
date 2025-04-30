import React, {PropsWithChildren} from 'react';
import {ImageRequireSource} from 'react-native';
import {IconProps} from '../icon';

export enum StateTypes {
  CURRENT = 'current', // default
  NEXT = 'next',
  ERROR = 'error',
  SUCCESS = 'success'
}

export enum LineTypes {
  SOLID = 'solid', // default
  DASHED = 'dashed'
}

export enum PointTypes {
  BULLET = 'bullet', // default
  CIRCLE = 'circle',
  OUTLINE = 'outline'
}

export type LineProps = {
  state?: StateTypes;
  type?: LineTypes | `${LineTypes}`;
  color?: string;
  /** to mark as entry point */
  entry?: boolean;
  width?: number;
  testID?: string;
};

export type PointProps = {
  state?: StateTypes | `${StateTypes}`;
  type?: PointTypes | `${PointTypes}`;
  color?: string;
  icon?: ImageRequireSource;
  iconProps?: IconProps;
  removeIconBackground?: boolean;
  label?: number;
  labelColor?: string;
  /** to align point to this view's center */
  anchorRef?: React.MutableRefObject<undefined>;
  testID?: string;
};

export type Layout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TimelineProps = PropsWithChildren<{
  topLine?: LineProps;
  bottomLine?: LineProps;
  point?: PointProps;
  testID?: string;
}>;
