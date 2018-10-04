import { Assets } from './Assets';

export default new Assets().loadAssetsGroup('', {
  get icons() { return require('./icons'); },
  get emojis() { return require('./emojis'); },
  get images() { return require('./images'); },
});
