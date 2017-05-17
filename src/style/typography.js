import _ from 'lodash';

class Typography {
  text10 = {fontSize: 64, fontWeight: '100', lineHeight: Math.floor(64 * 1.4)};
  text20 = {fontSize: 50, fontWeight: '100', lineHeight: Math.floor(50 * 1.4)};
  text30 = {fontSize: 36, fontWeight: '200', lineHeight: Math.floor(36 * 1.3)};
  text40 = {fontSize: 28, fontWeight: '200', lineHeight: Math.floor(28 * 1.3)};
  text50 = {fontSize: 22, fontWeight: '300', lineHeight: Math.floor(22 * 1.3)};
  text60 = {fontSize: 20, fontWeight: '300', lineHeight: Math.floor(20 * 1.3)};
  text70 = {fontSize: 17, fontWeight: '300', lineHeight: Math.floor(17 * 1.3)};
  text80 = {fontSize: 15, fontWeight: '300', lineHeight: Math.floor(15 * 1.2)};
  text90 = {fontSize: 13, fontWeight: '300', lineHeight: Math.floor(13 * 1.2)};
  text100 = {fontSize: 11, fontWeight: '300', lineHeight: Math.floor(11 * 1.2)};

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
