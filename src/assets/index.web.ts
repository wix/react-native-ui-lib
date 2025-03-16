import {Assets} from './Assets';

export default new Assets().loadAssetsGroup('', {
  get emojis() {
    return require('./emojis').emojis;
  },
  get internal() {
    return require('./internal').internal;
  }
});
