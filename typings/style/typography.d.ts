
interface TypographyDescription {
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  fontFamily: string;
}

export type TypographyName =
  | 'text10'
  | 'text20'
  | 'text30'
  | 'text40'
  | 'text50'
  | 'text60'
  | 'text70'
  | 'text80'
  | 'text90'
  | 'text100';

type TypographyList = Record<TypographyName, TypographyDescription>;

declare class TypographyClass {
  measureWidth(
    text: string,
    typography?: TypographyDescription,
    containerWidth?: number
  ): Promise<number>;
  measureTextSize(
    text: string,
    typography?: TypographyDescription,
    containerWidth?: number
  ): Promise<{heigth: number, width: number}>;
}

export const Typography: TypographyClass & Readonly<TypographyList>;
