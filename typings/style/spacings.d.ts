
type SpacingType =
  | 's1'
  | 's2'
  | 's3'
  | 's4'
  | 's5'
  | 's6'
  | 's7'
  | 's8'
  | 's9'
  | 's10';

type SpacingsList = Record<SpacingType, number>;

export const Spacings: Readonly<SpacingsList>;
