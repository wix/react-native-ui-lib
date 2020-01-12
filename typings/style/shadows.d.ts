
import {ColorValue} from './colors';

export interface Shadow {
  top: ShadowDescription;
  bottom: ShadowDescription;
}

export interface ShadowDescription {
  shadowColor: ColorValue;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset?: ShadowOffset;
}

export interface ShadowOffset {
  height: number;
  width: number;
}

export type ShadowName =
  | 'white10'
  | 'white20'
  | 'white30'
  | 'white40'
  | 'dark10'
  | 'dark20'
  | 'dark30'
  | 'dark40';

export const Shadows: Readonly<Record<ShadowName, Shadow>>;
