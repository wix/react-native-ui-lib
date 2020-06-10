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

const Typography: {[key: string]: TextStyle} = {
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
    const fontKey = `text${key}`;
    const fontWeightKey = `${fontKey}${weightValue}`;
    Typography[fontWeightKey] = {
      ...Typography[fontKey],
      fontWeight: Constants.isIOS ? WEIGHT_TYPES[weightKey] : undefined
    };
  });
});

export default Typography;
