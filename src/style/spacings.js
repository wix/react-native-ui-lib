import _ from 'lodash';
import {Constants} from '../helpers';

class Spacings {
  s1 = Constants.isIOS ? 3 : 4;
  s2 = Constants.isIOS ? 6 : 8;
  s3 = Constants.isIOS ? 9 : 12;
  s4 = Constants.isIOS ? 12 : 16;
  s5 = Constants.isIOS ? 15 : 20;
  s6 = Constants.isIOS ? 18 : 24;
  s7 = Constants.isIOS ? 21 : 28;
  s8 = Constants.isIOS ? 24 : 32;
  s9 = Constants.isIOS ? 27 : 36;
  s10 = Constants.isIOS ? 30 : 40;

  keysPattern = this.generateKeysPattern();

  loadSpacings(spacings) {
    _.forEach(spacings, (value, key) => {
      this[key] = value;
    });
    this.keysPattern = this.generateKeysPattern();
  }

  getKeysPattern() {
    return this.keysPattern;
  }

  generateKeysPattern() {
    return new RegExp(_.chain(this)
      .keys()
      .join('|')
      .value(),);
  }
}

export default new Spacings();
