
type SpacingName =
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

export declare class SpacingsClass {
  loadSpacings(spacings: object): void;
}
  
export const Spacings: SpacingsClass & Readonly<Record<SpacingName, number>>;
