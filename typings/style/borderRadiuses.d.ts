
export type BorderRadiusName =
  | 'br0'
  | 'br10'
  | 'br20'
  | 'br30'
  | 'br40'
  | 'br50'
  | 'br60'
  | 'br100';

type BorderRadiusesList = Record<BorderRadiusName, number>;

export const BorderRadiuses: Readonly<BorderRadiusesList>;
