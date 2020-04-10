import {TextStyle} from 'react-native';
import {BorderRadiusesLiterals} from '../src/style/borderRadiuses'
import {colorsPalette} from './generatedTypes/colorsPalette'

type MarginModifierKeyType = "margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV";
type PaddingModifierKeyType =  "padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV"
type PaddingModifierKeyType =  "flex" | "flexG" | "flexS"
type BorderRadiusesMofifierKeyType = "br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100";
type FlexModifierKeyType = 'flex' | 'flexGrow' | 'flexShrink';

type CustomTypographyPresets = {
  titleHuge: TextStyle;
  titleBig: TextStyle;
  title: TextStyle;
  subheading: TextStyle;
  numeric: TextStyle;
  main: TextStyle;
  mainBold: TextStyle;
  mainBlack: TextStyle;
  body: TextStyle;
  bodyBold: TextStyle;
  bodySmall: TextStyle;
  bodySmallBold: TextStyle;
  subtext: Typography.text90BO
};

type TypographyPresets = CustomTypographyPresets & {
  text10: TextStyle,
  text10T: TextStyle,
  text10L: TextStyle,
  text10R: TextStyle,
  text10M: TextStyle,
  text10BO: TextStyle,
  text10H: TextStyle,
  text10BL: TextStyle,
  text20: TextStyle,
  text20T: TextStyle,
  text20L: TextStyle,
  text20R: TextStyle,
  text20M: TextStyle,
  text20BO: TextStyle,
  text20H: TextStyle,
  text20BL: TextStyle,
  text20B: TextStyle,
  text30: TextStyle,
  text30T: TextStyle,
  text30L: TextStyle,
  text30R: TextStyle,
  text30M: TextStyle,
  text30BO: TextStyle,
  text30H: TextStyle,
  text30BL: TextStyle,
  text40: TextStyle,
  text40T: TextStyle,
  text40L: TextStyle,
  text40R: TextStyle,
  text40M: TextStyle,
  text40BO: TextStyle,
  text40H: TextStyle,
  text40BL: TextStyle,
  text50: TextStyle,
  text50T: TextStyle,
  text50L: TextStyle,
  text50R: TextStyle,
  text50M: TextStyle,
  text50BO: TextStyle,
  text50H: TextStyle,
  text50BL: TextStyle,
  text60: TextStyle,
  text60T: TextStyle,
  text60L: TextStyle,
  text60R: TextStyle,
  text60M: TextStyle,
  text60BO: TextStyle,
  text60H: TextStyle,
  text60BL: TextStyle,
  text60B: TextStyle,
  text65: TextStyle,
  text65T: TextStyle,
  text65L: TextStyle,
  text65R: TextStyle,
  text65M: TextStyle,
  text65BO: TextStyle,
  text65H: TextStyle,
  text65BL: TextStyle,
  text70: TextStyle,
  text70T: TextStyle,
  text70L: TextStyle,
  text70R: TextStyle,
  text70M: TextStyle,
  text70BO: TextStyle,
  text70H: TextStyle,
  text70BL: TextStyle,
  text80: TextStyle,
  text80T: TextStyle,
  text80L: TextStyle,
  text80R: TextStyle,
  text80M: TextStyle,
  text80BO: TextStyle,
  text80H: TextStyle,
  text80BL: TextStyle,
  text90: TextStyle,
  text90T: TextStyle,
  text90L: TextStyle,
  text90R: TextStyle,
  text90M: TextStyle,
  text90BO: TextStyle,
  text90H: TextStyle,
  text90BL: TextStyle,
  text100: TextStyle,
  text100T: TextStyle,
  text100L: TextStyle,
  text100R: TextStyle,
  text100M: TextStyle,
  text100BO: TextStyle,
  text100H: TextStyle,
  text100BL: TextStyle,
}

export type ColorLiterals = keyof typeof colorsPalette;
export type TypographyLiterals = keyof TypographyPresets;
export type Modifier<T> = Partial<Record<T, boolean>>

export type AlignmentLiterals =
| 'row' | 'spread'
| 'center' | 'centerH' | 'centerV'
| 'left' | 'right' | 'top' | 'bottom';

export type PositionLiterals = `abs` | `absL` | `absT` | `absR` | `absB` | `absH` | `absV` | `absF`;

export type PaddingLiterals = PaddingModifierKeyType;
export type MarginLiterals = MarginModifierKeyType;
export type FlexLiterals = FlexModifierKeyType;
export type BorderRadiusLiterals = BorderRadiusesMofifierKeyType;

export type TypographyModifiers = Modifier<TypographyLiterals>;
export type ColorsModifiers = Modifier<ColorLiterals>;
export type AlignmentModifiers = Modifier<AlignmentLiterals>;
export type PaddingModifiers = Modifier<PaddingLiterals>;
export type MarginModifiers = Modifier<MarginLiterals>;
export type FlexModifiers = Modifier<FlexLiterals>;
export type BorderRadiusModifiers = Modifier<BorderRadiusLiterals>;
export type PositionModifiers = Modifier<PositionLiterals>

export type ContainerModifiers =
  AlignmentModifiers &
  PaddingModifiers &
  MarginModifiers &
  FlexModifiers &
  PositionModifiers &
  BorderRadiusModifiers;
