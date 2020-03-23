import {Platform} from 'react-native';
import Constants from '../helpers/Constants';

export const WEIGHT_TYPES = {
  THIN: '200',
  LIGHT: '300',
  REGULAR: '400',
  MEDIUM: parseFloat(Platform.Version as string) >= 11.2 ? '600' : '500',
  BOLD: '700',
  HEAVY: '800',
  BLACK: '900'
};

// text10
const text10 = {
  fontSize: 64,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined,
  lineHeight: 76,
  fontFamily: 'System'
};

const text10T = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text10L = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text10R = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text10M = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text10BO = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text10H = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text10BL = {
  ...text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text20
const text20 = {
  fontSize: 48,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: Constants.isIOS ? 60 : 62,
  fontFamily: 'System'
};

const text20T = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text20L = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text20R = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text20M = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text20BO = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text20H = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text20BL = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// todo: remove this
const text20B = {
  ...text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

// text30
const text30 = {
  fontSize: 36,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: Constants.isIOS ? 43 : 46,
  fontFamily: 'System'
};

const text30T = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text30L = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text30R = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text30M = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text30BO = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text30H = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text30BL = {
  ...text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text40
const text40 = {
  fontSize: 28,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined,
  lineHeight: 32,
  fontFamily: 'System'
};

const text40T = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text40L = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text40R = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text40M = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text40BO = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text40H = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text40BL = {
  ...text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text50
const text50 = {
  fontSize: 24,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined,
  lineHeight: 28,
  fontFamily: 'System'
};

const text50T = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text50L = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text50R = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text50M = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text50BO = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text50H = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text50BL = {
  ...text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text60
const text60 = {
  fontSize: 20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined,
  lineHeight: 24,
  fontFamily: 'System'
};

const text60T = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text60L = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text60R = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text60M = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text60BO = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text60H = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text60BL = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

const text60B = {
  ...text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

// text65
const text65 = {
  fontSize: 18,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined,
  lineHeight: 24,
  fontFamily: 'System'
};

const text65T = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text65L = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text65R = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text65M = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text65BO = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text65H = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text65BL = {
  ...text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text70
const text70 = {
  fontSize: 16,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: 24,
  fontFamily: 'System'
};

const text70T = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text70L = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text70R = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text70M = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text70BO = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text70H = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text70BL = {
  ...text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text80
const text80 = {
  fontSize: 14,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: 20,
  fontFamily: 'System'
};

const text80T = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text80L = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text80R = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text80M = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text80BO = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text80H = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text80BL = {
  ...text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text90
const text90 = {
  fontSize: 12,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined,
  lineHeight: 16,
  fontFamily: 'System'
};

const text90T = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text90L = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text90R = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text90M = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text90BO = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text90H = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text90BL = {
  ...text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text100
const text100 = {
  fontSize: 10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined,
  lineHeight: 16,
  fontFamily: 'System'
};

const text100T = {
  ...text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

const text100L = {
  ...text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

const text100R = {
  ...text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

const text100M = {
  ...text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

const text100BO = {
  ...text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

const text100H = {
  ...text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

const text100BL = {
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
