
import {ColorValue} from './colors';

interface Shadow {
  top: ShadowDescription;
  bottom: ShadowDescription;
}

interface ShadowDescription {
  shadowColor: ColorValue;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset?: ShadowOffset;
}

interface ShadowOffset {
  height: number;
  width: number;
}

export type ShadowType =
  | 'white10'
  | 'white20'
  | 'white30'
  | 'white40'
  | 'dark10'
  | 'dark20'
  | 'dark30'
  | 'dark40';

type ShadowsList = Record<ShadowType, Shadow>;

export const Shadows: Readonly<ShadowsList>;
