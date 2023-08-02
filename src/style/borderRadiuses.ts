import _ from 'lodash';
import Constants from '../commons/Constants';
import type {Dictionary, ExtendTypeWith} from '../typings/common';

// TODO: enable template type after we're ready to use TS 4.4.0
// interface IBorderRadiusesLiterals {
//   [key: `br${number}`]: number
// }

export const BorderRadiusesLiterals /* : IBorderRadiusesLiterals  */ = {
  br0: Constants.isIOS ? 0 : 0,
  br10: Constants.isIOS ? 3 : 2,
  br20: 6,
  br30: Constants.isIOS ? 9 : 8,
  br40: 12,
  br50: Constants.isIOS ? 15 : 16,
  br60: 20,
  br100: 999
};

export class BorderRadiuses {
  loadBorders(borders: Dictionary<number> /*  IBorderRadiusesLiterals */) {
    _.forEach(borders, (value, key) => {
      //@ts-ignore
      this[key] = value;
    });
  }

  getKeysPattern() {
    return /^(br[0-9]+)/;
  }
}
const TypedBorderRadiuses = BorderRadiuses as ExtendTypeWith<typeof BorderRadiuses, typeof BorderRadiusesLiterals>;
const borderRadiusesInstance = new TypedBorderRadiuses();
borderRadiusesInstance.loadBorders(BorderRadiusesLiterals);

export default borderRadiusesInstance;
