import {Platform} from 'react-native';
import {Constants} from '../helpers';

export const WEIGHT_TYPES = {
  THIN: '200',
  LIGHT: '300',
  REGULAR: '400',
  MEDIUM: parseFloat(Platform.Version) >= 11.2 ? '600' : '500',
  BOLD: '700',
  HEAVY: '800',
  BLACK: '900'
};

const Typography = {};
// text10
Typography.text10 = {
  fontSize: 64,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined,
  lineHeight: 76,
  fontFamily: 'System'
};

Typography.text10T = {
  ...Typography.text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

Typography.text10L = {
  ...Typography.text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

Typography.text10R = {
  ...Typography.text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

Typography.text10M = {
  ...Typography.text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

Typography.text10BO = {
  ...Typography.text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

Typography.text10H = {
  ...Typography.text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

Typography.text10BL = {
  ...Typography.text10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text20
Typography.text20 = {
  fontSize: 48,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: Constants.isIOS ? 60 : 62,
  fontFamily: 'System'
};

Typography.text20T = {
  ...Typography.text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

Typography.text20L = {
  ...Typography.text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

Typography.text20R = {
  ...Typography.text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

Typography.text20M = {
  ...Typography.text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

Typography.text20BO = {
  ...Typography.text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

Typography.text20H = {
  ...Typography.text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

Typography.text20BL = {
  ...Typography.text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// todo: remove this
Typography.text20B = {
  ...Typography.text20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

// text30
Typography.text30 = {
  fontSize: 36,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: Constants.isIOS ? 43 : 46,
  fontFamily: 'System'
};

Typography.text30T = {
  ...Typography.text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

Typography.text30L = {
  ...Typography.text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

Typography.text30R = {
  ...Typography.text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

Typography.text30M = {
  ...Typography.text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

Typography.text30BO = {
  ...Typography.text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

Typography.text30H = {
  ...Typography.text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

Typography.text30BL = {
  ...Typography.text30,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text40
Typography.text40 = {
  fontSize: 28,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined,
  lineHeight: 32,
  fontFamily: 'System'
};

Typography.text40T = {
  ...Typography.text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

Typography.text40L = {
  ...Typography.text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

Typography.text40R = {
  ...Typography.text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

Typography.text40M = {
  ...Typography.text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

Typography.text40BO = {
  ...Typography.text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

Typography.text40H = {
  ...Typography.text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

Typography.text40BL = {
  ...Typography.text40,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text50
Typography.text50 = {
  fontSize: 24,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined,
  lineHeight: 28,
  fontFamily: 'System'
};

Typography.text50T = {
  ...Typography.text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

Typography.text50L = {
  ...Typography.text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

Typography.text50R = {
  ...Typography.text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

Typography.text50M = {
  ...Typography.text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

Typography.text50BO = {
  ...Typography.text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

Typography.text50H = {
  ...Typography.text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

Typography.text50BL = {
  ...Typography.text50,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text60
Typography.text60 = {
  fontSize: 20,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined,
  lineHeight: 24,
  fontFamily: 'System'
};

Typography.text60T = {
  ...Typography.text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

Typography.text60L = {
  ...Typography.text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

Typography.text60R = {
  ...Typography.text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

Typography.text60M = {
  ...Typography.text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

Typography.text60BO = {
  ...Typography.text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

Typography.text60H = {
  ...Typography.text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

Typography.text60BL = {
  ...Typography.text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

Typography.text60B = {
  ...Typography.text60,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

// text65
Typography.text65 = {
  fontSize: 18,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined,
  lineHeight: 24,
  fontFamily: 'System'
};

Typography.text65T = {
  ...Typography.text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

Typography.text65L = {
  ...Typography.text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

Typography.text65R = {
  ...Typography.text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

Typography.text65M = {
  ...Typography.text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

Typography.text65BO = {
  ...Typography.text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

Typography.text65H = {
  ...Typography.text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

Typography.text65BL = {
  ...Typography.text65,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text70
Typography.text70 = {
  fontSize: 16,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: 24,
  fontFamily: 'System'
};

Typography.text70T = {
  ...Typography.text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

Typography.text70L = {
  ...Typography.text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

Typography.text70R = {
  ...Typography.text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

Typography.text70M = {
  ...Typography.text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

Typography.text70BO = {
  ...Typography.text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

Typography.text70H = {
  ...Typography.text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

Typography.text70BL = {
  ...Typography.text70,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text80
Typography.text80 = {
  fontSize: 14,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined,
  lineHeight: 20,
  fontFamily: 'System'
};

Typography.text80T = {
  ...Typography.text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

Typography.text80L = {
  ...Typography.text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

Typography.text80R = {
  ...Typography.text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

Typography.text80M = {
  ...Typography.text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

Typography.text80BO = {
  ...Typography.text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

Typography.text80H = {
  ...Typography.text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

Typography.text80BL = {
  ...Typography.text80,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text90
Typography.text90 = {
  fontSize: 12,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined,
  lineHeight: 16,
  fontFamily: 'System'
};

Typography.text90T = {
  ...Typography.text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

Typography.text90L = {
  ...Typography.text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

Typography.text90R = {
  ...Typography.text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

Typography.text90M = {
  ...Typography.text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

Typography.text90BO = {
  ...Typography.text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

Typography.text90H = {
  ...Typography.text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

Typography.text90BL = {
  ...Typography.text90,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

// text100
Typography.text100 = {
  fontSize: 10,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined,
  lineHeight: 16,
  fontFamily: 'System'
};

Typography.text100T = {
  ...Typography.text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.THIN : undefined
  // fontFamily: FAMILY_BY_WEIGHT.THIN
};

Typography.text100L = {
  ...Typography.text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.LIGHT : undefined
  // fontFamily: FAMILY_BY_WEIGHT.LIGHT
};

Typography.text100R = {
  ...Typography.text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.REGULAR : undefined
  // fontFamily: FAMILY_BY_WEIGHT.REGULAR
};

Typography.text100M = {
  ...Typography.text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.MEDIUM : undefined
  // fontFamily: FAMILY_BY_WEIGHT.MEDIUM
};

Typography.text100BO = {
  ...Typography.text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BOLD : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BOLD
};

Typography.text100H = {
  ...Typography.text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.HEAVY : undefined
  // fontFamily: FAMILY_BY_WEIGHT.HEAVY
};

Typography.text100BL = {
  ...Typography.text100,
  fontWeight: Constants.isIOS ? WEIGHT_TYPES.BLACK : undefined
  // fontFamily: FAMILY_BY_WEIGHT.BLACK
};

export default Typography;
