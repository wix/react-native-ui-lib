import {Platform, TextStyle} from 'react-native';
import Constants from '../helpers/Constants';

export const WEIGHT_TYPES = {
  THIN: '200' as '200',
  LIGHT: '300' as '300',
  REGULAR: '400' as '400',
  MEDIUM: parseFloat(Platform.Version as string) >= 11.2 ? '600' : '500' as '500' | '600',
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

const text10T: TextStyle = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text10L: TextStyle = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text10R: TextStyle = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text10M: TextStyle = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text10BO: TextStyle = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text10H: TextStyle = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text10BL: TextStyle = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text20
const text20: TextStyle = {
  fontSize: 48,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: Constants.isIOS ? 60 : 62,
  fontFamily: 'System'
};

const text20T: TextStyle = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text20L: TextStyle = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text20R: TextStyle = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text20M: TextStyle = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text20BO: TextStyle = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text20H: TextStyle = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text20BL: TextStyle = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// todo: remove this
const text20B: TextStyle = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

// text30
const text30: TextStyle = {
  fontSize: 36,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: Constants.isIOS ? 43 : 46,
  fontFamily: 'System'
};

const text30T: TextStyle = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text30L: TextStyle = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text30R: TextStyle = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text30M: TextStyle = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text30BO: TextStyle = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text30H: TextStyle = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text30BL: TextStyle = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text40
const text40: TextStyle = {
  fontSize: 28,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined,
  lineHeight: 32,
  fontFamily: 'System'
};

const text40T: TextStyle = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text40L: TextStyle = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text40R: TextStyle = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text40M: TextStyle = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text40BO: TextStyle = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text40H: TextStyle = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text40BL: TextStyle = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text50
const text50: TextStyle = {
  fontSize: 24,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined,
  lineHeight: 28,
  fontFamily: 'System'
};

const text50T: TextStyle = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text50L: TextStyle = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text50R: TextStyle = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text50M: TextStyle = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text50BO: TextStyle = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text50H: TextStyle = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text50BL: TextStyle = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text60
const text60: TextStyle = {
  fontSize: 20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined,
  lineHeight: 24,
  fontFamily: 'System'
};

const text60T: TextStyle = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text60L: TextStyle = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text60R: TextStyle = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text60M: TextStyle = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text60BO: TextStyle = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text60H: TextStyle = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text60BL: TextStyle = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

const text60B: TextStyle = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

// text65
const text65: TextStyle = {
  fontSize: 18,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined,
  lineHeight: 24,
  fontFamily: 'System'
};

const text65T: TextStyle = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text65L: TextStyle = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text65R: TextStyle = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text65M: TextStyle = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text65BO: TextStyle = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text65H: TextStyle = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text65BL: TextStyle = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text70
const text70: TextStyle = {
  fontSize: 16,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: 24,
  fontFamily: 'System'
};

const text70T: TextStyle = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text70L: TextStyle = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text70R: TextStyle = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text70M: TextStyle = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text70BO: TextStyle = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text70H: TextStyle = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text70BL: TextStyle = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text80
const text80: TextStyle = {
  fontSize: 14,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: 20,
  fontFamily: 'System'
};

const text80T: TextStyle = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text80L: TextStyle = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text80R: TextStyle = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text80M: TextStyle = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text80BO: TextStyle = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text80H: TextStyle = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text80BL: TextStyle = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text90
const text90: TextStyle = {
  fontSize: 12,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined,
  lineHeight: 16,
  fontFamily: 'System'
};

const text90T: TextStyle = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text90L: TextStyle = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text90R: TextStyle = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text90M: TextStyle = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text90BO: TextStyle = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text90H: TextStyle = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text90BL: TextStyle = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text100
const text100: TextStyle = {
  fontSize: 10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined,
  lineHeight: 16,
  fontFamily: 'System'
};

const text100T: TextStyle = {
  ...text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text100L: TextStyle = {
  ...text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text100R: TextStyle = {
  ...text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text100M: TextStyle = {
  ...text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text100BO: TextStyle = {
  ...text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text100H: TextStyle = {
  ...text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text100BL: TextStyle = {
  ...text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};
const Typography = {
  text10,
  text10T,
  text10L,
  text10R,
  text10M,
  text10BO,
  text10H,
  text10BL,
  text20,
  text20T,
  text20L,
  text20R,
  text20M,
  text20BO,
  text20H,
  text20BL,
  text20B,
  text30,
  text30T,
  text30L,
  text30R,
  text30M,
  text30BO,
  text30H,
  text30BL,
  text40,
  text40T,
  text40L,
  text40R,
  text40M,
  text40BO,
  text40H,
  text40BL,
  text50,
  text50T,
  text50L,
  text50R,
  text50M,
  text50BO,
  text50H,
  text50BL,
  text60,
  text60T,
  text60L,
  text60R,
  text60M,
  text60BO,
  text60H,
  text60BL,
  text60B,
  text65,
  text65T,
  text65L,
  text65R,
  text65M,
  text65BO,
  text65H,
  text65BL,
  text70,
  text70T,
  text70L,
  text70R,
  text70M,
  text70BO,
  text70H,
  text70BL,
  text80,
  text80T,
  text80L,
  text80R,
  text80M,
  text80BO,
  text80H,
  text80BL,
  text90,
  text90T,
  text90L,
  text90R,
  text90M,
  text90BO,
  text90H,
  text90BL,
  text100,
  text100T,
  text100L,
  text100R,
  text100M,
  text100BO,
  text100H,
  text100BL
};

export default Typography;
