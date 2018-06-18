import _ from 'lodash';

import {icons} from './icons';
import {emojis} from './emojis';

class Assets {
  icons = icons;
  emojis = emojis;

  loadAssetsGroup(groupName, assets) {
    if (!_.isString(groupName)) {
      throw new Error('group name should be a string');
    }

    if (!_.isPlainObject(assets)) {
      throw new Error('assets should be a hash map');
    }

    _.forEach(assets, (value, key) => {
      _.set(this, `${groupName}.${key}`, value);
    });
  }
}

export default new Assets();
