import {Assets} from 'react-native-ui-lib';
Assets.loadAssetsGroup('icons.demo', {
  chevronDown: require('./icons/chevronDown.png'),
  chevronRight: require('./icons/chevronRight.png'),
  add: require('./icons/add.png'),
  camera: require('./icons/cameraSelected.png'),
  close: require('./icons/close.png'),
  dashboard: require('./icons/dashboard.png'),
  drag: require('./icons/drag.png'),
  image: require('./icons/image.png'),
  plus: require('./icons/plus.png'),
  refresh: require('./icons/refresh.png'),
  search: require('./icons/search.png'),
  settings: require('./icons/settings.png'),
  share: require('./icons/share.png')
});

Assets.loadAssetsGroup('images.demo', {
  brokenImage: require('./images/placeholderMissingImage.png')
});

Assets.loadAssetsGroup('svgs.demo', {
  logo: require('./svgs/headerLogo.svg').default
});
console.log(`Nitzan - finished loading assets`);
export default Assets as typeof Assets;
