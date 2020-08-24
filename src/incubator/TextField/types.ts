export type ColorType =
  | string
  | {
      default?: string;
      focus?: string;
      error?: string;
      disabled?: string;
    };

export enum ValidationMessagePosition {
  TOP = 'top',
  BOTTOM = 'bottom'
}
