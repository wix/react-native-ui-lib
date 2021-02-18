import {Assets, Typography, Spacings} from 'react-native-ui-lib'; // eslint-disable-line

Assets.loadAssetsGroup('icons.demo', {
  add: require('./assets/icons/add.png'),
  camera: require('./assets/icons/cameraSelected.png'),
  close: require('./assets/icons/close.png'),
  dashboard: require('./assets/icons/dashboard.png'),
  image: require('./assets/icons/image.png'),
  refresh: require('./assets/icons/refresh.png'),
  search: require('./assets/icons/search.png')
});

Assets.loadAssetsGroup('images.demo', {
  brokenImage: require('./assets/images/placeholderMissingImage.png')
});

Typography.loadTypographies({
  h1: {...Typography.text40},
  h2: {...Typography.text50},
  h3: {...Typography.text60}
});

Spacings.loadSpacings({
  page: Spacings.s5
});
