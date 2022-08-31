import {PropsWithChildren} from 'react';

export enum MarqueeDirections {
  RIGHT = 'RIGHT', //LTR
  LEFT = 'LEFT', //RTL
  UP = 'UP', //Bottom To up
  DOWN = 'DOWN' // Up Down To Bottom
}

export type MarqueeProps = PropsWithChildren<{
  direction?: MarqueeDirections;
  duration?: number;
  numberOfReps?: number;
}>;
