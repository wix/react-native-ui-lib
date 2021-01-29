import {Assets, Colors, Typography, Spacings} from 'react-native-ui-lib'; // eslint-disable-line

Assets.loadAssetsGroup('icons.demo', {
  add: require('./assets/icons/add.png'),
  close: require('./assets/icons/close.png'),
  dashboard: require('./assets/icons/dashboard.png'),
  image: require('./assets/icons/image.png'),
  refresh: require('./assets/icons/refresh.png'),
  search: require('./assets/icons/search.png')
});

Typography.loadTypographies({
  h1: {...Typography.text40},
  h2: {...Typography.text50},
  h3: {...Typography.text60},
  body: Typography.text70
});

Spacings.loadSpacings({
  page: Spacings.s5
});

/* Dark Mode Schemes */
Colors.loadSchemes({
  light: {
    screenBG: 'transparent',
    textColor: Colors.grey10,
    moonOrSun: Colors.yellow30,
    mountainForeground: Colors.green30,
    mountainBackground: Colors.green50
  },
  dark: {
    screenBG: Colors.grey10,
    textColor: Colors.white,
    moonOrSun: Colors.grey80,
    mountainForeground: Colors.violet10,
    mountainBackground: Colors.violet20
  }
});
