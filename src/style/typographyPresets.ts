import {Platform, TextStyle} from 'react-native';
import _ from 'lodash';
import Constants from '../helpers/Constants';

export const WEIGHT_TYPES: {[key: string]: TextStyle['fontWeight']} = {
  THIN: '200' as '200',
  LIGHT: '300' as '300',
  REGULAR: '400' as '400',
  MEDIUM:
    parseFloat(Platform.Version as string) >= 11.2
      ? '600'
      : ('500' as '500' | '600'),
  BOLD: '700' as '700',
  HEAVY: '800' as '800',
  BLACK: '900' as '900'
};

// text10
const text10: TextStyle = {
  fontSize: 64,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined,
  lineHeight: 76,
  fontFamily: 'System'
};

// text20
const text20: TextStyle = {
  fontSize: 48,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: Constants.isIOS ? 60 : 62,
  fontFamily: 'System'
};

// text30
const text30: TextStyle = {
  fontSize: 36,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: Constants.isIOS ? 43 : 46,
  fontFamily: 'System'
};

// text40
const text40: TextStyle = {
  fontSize: 28,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined,
  lineHeight: 32,
  fontFamily: 'System'
};

// text50
const text50: TextStyle = {
  fontSize: 24,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined,
  lineHeight: 28,
  fontFamily: 'System'
};

// text60
const text60: TextStyle = {
  fontSize: 20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined,
  lineHeight: 24,
  fontFamily: 'System'
};

// text65
const text65: TextStyle = {
  fontSize: 18,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined,
  lineHeight: 24,
  fontFamily: 'System'
};

// text70
const text70: TextStyle = {
  fontSize: 16,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: 24,
  fontFamily: 'System'
};

// text80
const text80: TextStyle = {
  fontSize: 14,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: 20,
  fontFamily: 'System'
};

// text90
const text90: TextStyle = {
  fontSize: 12,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined,
  lineHeight: 16,
  fontFamily: 'System'
};

// text100
const text100: TextStyle = {
  fontSize: 10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined,
  lineHeight: 16,
  fontFamily: 'System'
};

type TypographyKeys = Record<
  | 'text10'
  | 'text20'
  | 'text30'
  | 'text40'
  | 'text50'
  | 'text60'
  | 'text65'
  | 'text70'
  | 'text80'
  | 'text90'
  | 'text100'
  | 'text10T'
  | 'text10L'
  | 'text10R'
  | 'text10M'
  | 'text10BO'
  | 'text10H'
  | 'text10BL'
  | 'text20T'
  | 'text20L'
  | 'text20R'
  | 'text20M'
  | 'text20BO'
  | 'text20H'
  | 'text20BL'
  | 'text30T'
  | 'text30L'
  | 'text30R'
  | 'text30M'
  | 'text30BO'
  | 'text30H'
  | 'text30BL'
  | 'text40T'
  | 'text40L'
  | 'text40R'
  | 'text40M'
  | 'text40BO'
  | 'text40H'
  | 'text40BL'
  | 'text50T'
  | 'text50L'
  | 'text50R'
  | 'text50M'
  | 'text50BO'
  | 'text50H'
  | 'text50BL'
  | 'text60T'
  | 'text60L'
  | 'text60R'
  | 'text60M'
  | 'text60BO'
  | 'text60H'
  | 'text60BL'
  | 'text65T'
  | 'text65L'
  | 'text65R'
  | 'text65M'
  | 'text65BO'
  | 'text65H'
  | 'text65BL'
  | 'text70T'
  | 'text70L'
  | 'text70R'
  | 'text70M'
  | 'text70BO'
  | 'text70H'
  | 'text70BL'
  | 'text80T'
  | 'text80L'
  | 'text80R'
  | 'text80M'
  | 'text80BO'
  | 'text80H'
  | 'text80BL'
  | 'text90T'
  | 'text90L'
  | 'text90R'
  | 'text90M'
  | 'text90BO'
  | 'text90H'
  | 'text90BL'
  | 'text100T'
  | 'text100L'
  | 'text100R'
  | 'text100M'
  | 'text100BO'
  | 'text100H'
  | 'text100BL',
  TextStyle
>;
const Typography: Partial<TypographyKeys> = {
  text10,
  text20,
  text30,
  text40,
  text50,
  text60,
  text65,
  text70,
  text80,
  text90,
  text100
};

const keys = [10, 20, 30, 40, 50, 60, 65, 70, 80, 90, 100];
const weightsMap = {
  THIN: 'T',
  LIGHT: 'L',
  REGULAR: 'R',
  MEDIUM: 'M',
  BOLD: 'BO',
  HEAVY: 'H',
  BLACK: 'BL'
};

_.forEach(keys, (key) => {
  _.forEach(weightsMap, (weightValue, weightKey) => {
    const fontKey = `text${key}` as keyof TypographyKeys;
    const fontWeightKey = `${fontKey}${weightValue}` as keyof TypographyKeys;
    Typography[fontWeightKey] = {
      ...Typography[fontKey],
      fontWeight: Constants.isIOS ? WEIGHT_TYPES[weightKey] : undefined
    };
  });
});

export default Typography;
