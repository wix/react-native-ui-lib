import _ from 'lodash';

class Spacings {
  s1 = 4;
  s2 = 8;
  s3 = 12;
  s4 = 16;
  s5 = 20;
  s6 = 24;
  s7 = 28;
  s8 = 32;
  s9 = 36;
  s10 = 40;

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
