import { ButtonSize } from "./types";
export const PADDINGS = {
  XSMALL: 3,
  SMALL: 4.5,
  MEDIUM: 6.5,
  LARGE: 9.5
};
export const HORIZONTAL_PADDINGS = {
  XSMALL: 11,
  SMALL: 14,
  MEDIUM: 16,
  LARGE: 20
};
export const MIN_WIDTH = {
  XSMALL: 66,
  SMALL: 70,
  MEDIUM: 77,
  LARGE: 90
};
export const SIZE_TO_VERTICAL_HITSLOP = {
  [ButtonSize.xSmall]: 30,
  [ButtonSize.small]: 25,
  [ButtonSize.medium]: 20,
  [ButtonSize.large]: 15
};
export const DEFAULT_SIZE = ButtonSize.large;