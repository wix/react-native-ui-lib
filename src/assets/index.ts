import {Assets} from './Assets';
import type {icons} from './icons';
import type {emojis} from './emojis';
import type {images} from './images';


const assets: Assets = new Assets();
assets.loadAssetsGroup('', {
  get icons(): typeof icons {
    return require('./icons').icons;
  },
  get emojis(): typeof emojis {
    return require('./emojis').emojis;
  },
  get images(): typeof images {
    return require('./images').images;
  }
});
export default assets as typeof assets;
