import { Platform } from 'react-native';
import _ from 'lodash';
import Constants from "../helpers/Constants";
export const WEIGHT_TYPES = {
  THIN: '200',
  LIGHT: '300',
  REGULAR: '400',
  MEDIUM: parseFloat(Platform.Version) >= 11.2 ? '600' : '500',
  BOLD: '700',
  HEAVY: '800',
  BLACK: '900'
}; // text10

const text10 = {
  fontSize: 64,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined,
  lineHeight: 76,
  fontFamily: 'System'
}; // text20

const text20 = {
  fontSize: 48,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: Constants.isIOS ? 60 : 62,
  fontFamily: 'System'
}; // text30

const text30 = {
  fontSize: 36,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: Constants.isIOS ? 43 : 46,
  fontFamily: 'System'
}; // text40

const text40 = {
  fontSize: 28,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : 'bold',
  lineHeight: 32,
  fontFamily: 'System'
}; // text50

const text50 = {
  fontSize: 24,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : 'bold',
  lineHeight: 28,
  fontFamily: 'System'
}; // text60

const text60 = {
  fontSize: 20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : 'bold',
  lineHeight: 24,
  fontFamily: 'System'
}; // text65

const text65 = {
  fontSize: 18,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined,
  lineHeight: 24,
  fontFamily: 'System'
}; // text70

const text70 = {
  fontSize: 16,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: 24,
  fontFamily: 'System'
}; // text80

const text80 = {
  fontSize: 14,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: 20,
  fontFamily: 'System'
}; // text90

const text90 = {
  fontSize: 12,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : 'bold',
  lineHeight: 16,
  fontFamily: 'System'
}; // text100

const text100 = {
  fontSize: 10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : 'bold',
  lineHeight: 16,
  fontFamily: 'System'
};
const Typography = {
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

_.forEach(keys, key => {
  _.forEach(weightsMap, (weightValue, weightKey) => {
    const fontKey = `text${key}`;
    const fontWeightKey = `${fontKey}${weightValue}`;
    Typography[fontWeightKey] = { ...Typography[fontKey],
      fontWeight: Constants.isIOS ? WEIGHT_TYPES[weightKey] : ['BO', 'H', 'BL'].includes(weightKey) ? 'bold' : undefined
    };
  });
});

export default Typography;