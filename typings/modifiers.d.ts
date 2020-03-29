import {colorsPalette} from '../src/style/colorsPalette';
import typographyPresets from '../src/style/typographyPresets';
import {MarginModifierKeyType, PaddingModifierKeyType, FlexModifierKeyType} from '../src/commons/modifiers';
import {BorderRadiusesLiterals} from '../src/style/borderRadiuses'

export type ColorLiterals = keyof typeof colorsPalette;
export type TypographyLiterals = keyof typeof typographyPresets;
export type Modifier<T> = Partial<Record<T, boolean>>


export type AlignmentLiterals =
| 'row' | 'spread'
| 'center' | 'centerH' | 'centerV'
| 'left' | 'right' | 'top' | 'bottom';

export type PaddingLiterals = PaddingModifierKeyType;
export type MarginLiterals = MarginModifierKeyType;
export type FlexLiterals = FlexModifierKeyType;
export type BorderRadiusLiterals = keyof typeof BorderRadiusesLiterals;

export type TypographyModifiers = Modifier<TypographyLiterals>;
export type ColorsModifiers = Modifier<ColorLiterals>;
export type AlignmentModifiers = Modifier<AlignmentLiterals>;
export type PaddingModifiers = Modifier<PaddingLiterals>;
export type MarginModifiers = Modifier<MarginLiterals>;
export type FlexModifiers = Modifier<FlexLiterals>;
export type BorderRadiusModifiers = Modifier<BorderRadiusLiterals>;

export type ContainerModifiers =
  AlignmentModifiers &
  PaddingModifiers &
  MarginModifiers &
  FlexModifiers &
  BorderRadiusModifiers;
