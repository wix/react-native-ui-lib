import _ from 'lodash';

export const SpacingLiterals = {
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
  s7: 28,
  s8: 32,
  s9: 36,
  s10: 40
};
export class Spacings {
  keysPattern = this.generateKeysPattern();

  loadSpacings(spacings: Dictionary<number>) {
    _.forEach(spacings, (value, key) => {
      //@ts-ignore
      this[key] = value;
    });
    this.keysPattern = this.generateKeysPattern();
  }

  getKeysPattern() {
    return this.keysPattern;
  }

  generateKeysPattern(): RegExp {
    return new RegExp(Object.keys(this).join('|'));
  }
}
const TypedSpacings = Spacings as ExtendTypeWith<typeof Spacings, typeof SpacingLiterals>;
const spacingInstance = new TypedSpacings();
spacingInstance.loadSpacings(SpacingLiterals);
export default spacingInstance;
