import {Assets} from './Assets';

export default new Assets().loadAssetsGroup('', {
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
