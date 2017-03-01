import {Navigation} from 'react-native-navigation';
import {Colors, Button, Badge, ThemeManager} from 'react-native-ui-lib'; //eslint-disable-line
import './screens';

// ThemeManager.setTheme({
//   primaryColor: Colors.purple30,
//   CTA: {
//     backgroundColor: Colors.purple30,
//     textColor: Colors.dark10,
//   },
//   titleColor: Colors.blue10,
//   subtitleColor: Colors.blue40,
// });

Navigation.startSingleScreenApp({
  screen: {
    screen: 'example.MainScreen',
    title: 'Wix UI Lib',
    navigatorButtons: {},
  },
});
