import {Navigation} from 'react-native-navigation';
import {Typography, Colors, Assets, Button, Badge, ThemeManager, Text} from 'react-native-ui-lib'; //eslint-disable-line
import * as Animatable from 'react-native-animatable';
import './screens';

// Typography.loadTypographies({
//   h1: {fontSize: 58, fontWeight: '300', lineHeight: 80},
//   h2: {fontSize: 46, fontWeight: '300', lineHeight: 64},
// });

// Colors.loadColors({
//   pink: '#FF69B4',
//   gold: '#FFD700',
// });

// ThemeManager.setTheme({
//   primaryColor: Colors.purple30,
//   CTA: {
//     backgroundColor: Colors.purple30,
//     textColor: Colors.dark10,
//   },
//   titleColor: Colors.blue10,
//   subtitleColor: Colors.blue40,
// });

// ThemeManager.setComponentTheme('Text', {
//   dark10: true,
// });

Assets.loadAssetsGroup('icons.general', {
  camera: require('./assets/icons/cameraSelected.png'),
});

Animatable.initializeRegistryWithDefinitions({
  gridListEntrance: {
    from: {opacity: 0, translateY: 15},
    to: {opacity: 1, translateY: 0},
  },
});

Animatable.initializeRegistryWithDefinitions({
  basicListEntrance: {
    from: {opacity: 0, translateY: 20},
    to: {opacity: 1, translateY: 0},
  },
});

export function startApp() {
  Navigation.startSingleScreenApp({
    appStyle: {autoAdjustScrollViewInsets: true},
    screen: {
      screen: 'unicorn.MainScreen',
      title: 'Wix UI Lib',
      navigatorButtons: {},
    },
  });
}
