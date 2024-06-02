import {Assets} from 'react-native-ui-lib';

Assets.loadAssetsGroup('icons.demo', {
  add: require('./icons/add.png'),
  archive: require('./icons/archive.png'),
  bell: require('./icons/bell.png'),
  camera: require('./icons/cameraSelected.png'),
  check: require('./icons/check-small.png'),
  chevronDown: require('./icons/chevronDown.png'),
  chevronRight: require('./icons/chevronRight.png'),
  close: require('./icons/close.png'),
  collections: require('./icons/collections.png'),
  dashboard: require('./icons/dashboard.png'),
  delete: require('./icons/delete.png'),
  drag: require('./icons/drag.png'),
  exclamation: require('./icons/exclamationFillSmall.png'),
  image: require('./icons/image.png'),
  info: require('./icons/info.png'),
  mail: require('./icons/mail.png'),
  plus: require('./icons/plus.png'),
  refresh: require('./icons/refresh.png'),
  richText: require('./icons/richText.png'),
  search: require('./icons/search.png'),
  settings: require('./icons/settings.png'),
  share: require('./icons/share.png'),
  star: require('./icons/star.png'),
  tags: require('./icons/tags.png'),
  video: require('./icons/video.png')
});

Assets.loadAssetsGroup('images.demo', {
  brokenImage: require('./images/placeholderMissingImage.png')
});

Assets.loadAssetsGroup('svgs.demo', {
  logo: require('./svgs/headerLogo.svg').default
});
export default Assets as typeof Assets;
