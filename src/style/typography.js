import _ from 'lodash';
import {Constants} from '../helpers';

class Typography {
  text10 = {
    fontSize: 64,
    fontWeight: '100',
    lineHeight: Math.floor(64 * 1.4),
    fontFamily: Constants.isAndroid ? 'sans-serif-thin' : undefined,
  };
  text20 = {
    fontSize: 50,
    fontWeight: '100',
    lineHeight: Math.floor(50 * 1.4),
    fontFamily: Constants.isAndroid ? 'sans-serif-thin' : undefined,
  };
  text30 = {
    fontSize: 36,
    fontWeight: Constants.isAndroid ? '100' : '200',
    lineHeight: Math.floor(36 * 1.3),
    fontFamily: Constants.isAndroid ? 'sans-serif-thin' : undefined,
  };
  text40 = {
    fontSize: 28,
    fontWeight: '300',
    lineHeight: Constants.isAndroid ? Math.floor(28 * 1.4) : Math.floor(28 * 1.21),
    fontFamily: Constants.isAndroid ? 'sans-serif-light' : undefined,
  };
  text50 = {
    fontSize: Constants.isAndroid ? 24 : 22,
    fontWeight: '300',
    lineHeight: Constants.isAndroid ? Math.floor(24 * 1.17) : Math.floor(22 * 1.27),
    fontFamily: Constants.isAndroid ? 'sans-serif-light' : undefined,
  };
  text60 = {
    fontSize: 20,
    fontWeight: '300',
    lineHeight: Math.floor(20 * 1.2),
    fontFamily: Constants.isAndroid ? 'sans-serif-light' : undefined,
  };
  text70 = {
    fontSize: Constants.isAndroid ? 16 : 17,
    fontWeight: '300',
    lineHeight: Constants.isAndroid ? Math.floor(16 * 1.38) : Math.floor(17 * 1.29),
    fontFamily: Constants.isAndroid ? 'sans-serif-light' : undefined,
  };
  text80 = {
    fontSize: Constants.isAndroid ? 14 : 15,
    fontWeight: '300',
    lineHeight: Constants.isAndroid ? Math.floor(14 * 1.5) : Math.floor(15 * 1.33),
    fontFamily: Constants.isAndroid ? 'sans-serif-light' : undefined,
  };
  text90 = {
    fontSize: Constants.isAndroid ? 12 : 13,
    fontWeight: '300',
    lineHeight: Constants.isAndroid ? Math.floor(12 * 1.33) : Math.floor(13 * 1.38),
    fontFamily: Constants.isAndroid ? 'sans-serif-light' : undefined,
  };
  text100 = {
    fontSize: Constants.isAndroid ? 10 : 11,
    fontWeight: '300',
    lineHeight: Constants.isAndroid ? Math.floor(10 * 1.8) : Math.floor(11 * 1.18),
    fontFamily: Constants.isAndroid ? 'sans-serif-light' : undefined,
  };

  /**
   * Load custom set of typographies
   * arguments:
   * typographies - map of keys and typography values
   * e.g {text15: {fontSize: 58, fontWeight: '100', lineHeight: Math.floor(58 * 1.4)}}
   */
  loadTypographies(typographies) {
    _.forEach(typographies, (value, key) => {
      this[key] = value;
    });
  }
}

export default new Typography();
