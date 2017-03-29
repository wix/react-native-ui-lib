import {Navigation} from 'react-native-navigation';
import {Typography, Colors, Button, Badge, ThemeManager} from 'react-native-ui-lib'; //eslint-disable-line
import * as Animatable from 'react-native-animatable';
import './screens';

// Typography.loadTypographies({
//   text15: {fontSize: 58, fontWeight: '100', lineHeight: Math.floor(58 * 1.4)}
// });

// Colors.loadColors({
//   pink30: '#FF69B4',
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

Animatable.initializeRegistryWithDefinitions({
  gridListEntrance: {
    from: {opacity: 0, ['translateY']: 15},
    to: {opacity: 1, ['translateY']: 0},
  },
});

Animatable.initializeRegistryWithDefinitions({
  basicListEntrance: {
    from: {opacity: 0, ['translateY']: 20},
    to: {opacity: 1, ['translateY']: 0},
  },
});

export function startApp() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'example.MainScreen',
      title: 'Wix UI Lib',
      navigatorButtons: {},
    },
  });
}

