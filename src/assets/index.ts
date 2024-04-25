import {Assets} from './Assets';


const assets: Assets = new Assets();
assets.loadAssetsGroup('', {
  get icons() {
    return require('./icons').icons;
  },
  get emojis() {
    return require('./emojis').emojis;
  },
  get images() {
    return require('./images').images;
  }
});

export default assets;
