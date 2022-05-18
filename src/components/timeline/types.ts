import React, {PropsWithChildren} from 'react';
import {ImageRequireSource} from 'react-native';

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
  type?: LineTypes;
  color?: string;
  /** to mark as entry point */
  entry?: boolean;
}

export type PointProps = {
  state?: StateTypes;
  type?: PointTypes;
  color?: string;
  icon?: ImageRequireSource;
  label?: number;
  /** to align point to this view's center */
  anchorRef?: React.MutableRefObject<undefined>;
}

export type Layout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TimelineProps = & PropsWithChildren< {
  topLine?: LineProps;
  bottomLine?: LineProps;
  point?: PointProps;
  testID?: string;
}>;
