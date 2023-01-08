import {Constants} from '../../../src/commons/new';
import {ButtonSize} from './ButtonTypes';


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

export const DEFAULT_SIZE = ButtonSize.large;

export const IconSourceMargin = {
  LARGE: Constants.isWeb ? '8px' : 8,
  SMALL: Constants.isWeb ? '4px' : 4
};
