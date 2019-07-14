import _ from 'lodash';
import {Constants} from '../helpers';

class BorderRadiuses {
  br0 = Constants.isIOS ? 0 : 0;
  br10 = Constants.isIOS ? 3 : 2;
  br20 = 6;
  br30 = Constants.isIOS ? 9 : 8;
  br40 = 12;
  br50 = Constants.isIOS ? 15 : 16;
  br60 = 20;
  br100 = 999;

  loadBorders(borders) {
    _.forEach(borders, (value, key) => {
      this[key] = value;
    });
  }

  getKeysPattern() {
    return /^(br[0-9]+)/;
  }
}

export default new BorderRadiuses();
