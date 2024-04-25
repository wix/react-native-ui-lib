import {Assets} from './Assets';
import type {icons} from './icons';
import type {emojis} from './emojis';
import type {images} from './images';


const assets: Assets = new Assets();
assets.loadAssetsGroup('', {
  get icons() {
    return require('./icons').icons as typeof icons;
  },
  get emojis() {
    return require('./emojis').emojis as typeof emojis;
  },
  get images() {
    return require('./images').images as typeof images;
  }
});

export default assets as typeof assets;
