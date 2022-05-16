import {Assets, Colors, Typography, Spacings, Incubator} from 'react-native-ui-lib'; // eslint-disable-line

export const loadDemoConfigurations = () => {
  Assets.loadAssetsGroup('icons.demo', {
    chevronDown: require('./assets/icons/chevronDown.png'),
    chevronRight: require('./assets/icons/chevronRight.png'),
    add: require('./assets/icons/add.png'),
    camera: require('./assets/icons/cameraSelected.png'),
    close: require('./assets/icons/close.png'),
    dashboard: require('./assets/icons/dashboard.png'),
    drag: require('./assets/icons/drag.png'),
    image: require('./assets/icons/image.png'),
    plus: require('./assets/icons/plus.png'),
    refresh: require('./assets/icons/refresh.png'),
    search: require('./assets/icons/search.png'),
    settings: require('./assets/icons/settings.png'),
    share: require('./assets/icons/share.png')
  });

  Assets.loadAssetsGroup('images.demo', {
    brokenImage: require('./assets/images/placeholderMissingImage.png')
  });

  Assets.loadAssetsGroup('svgs.demo', {
    logo: require('./assets/svgs/headerLogo.svg').default
  });

  Typography.loadTypographies({
    h1: {...Typography.text40},
    h2: {...Typography.text50},
    h3: {...Typography.text70M},
    body: Typography.text70,
    bodySmall: Typography.text80
  });

  Spacings.loadSpacings({
    page: Spacings.s5
  });

  /* Dark Mode Schemes */
  Colors.loadSchemes({
    light: {
      screenBG: Colors.white,
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

  /* Components */
  Incubator.TextField.defaultProps = {...Incubator.TextField.defaultProps, preset: 'default'};
};
