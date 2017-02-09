import {Navigation} from 'react-native-navigation';
import {Colors, Button, Badge, ThemeManager} from 'react-native-ui-lib'; //eslint-disable-line
import './screens';

// ThemeManager.setTheme({
//   primaryColor: Colors.yellow30,
//   CTA: {
//     backgroundColor: Colors.purple30,
//     textColor: Colors.dark10,
//   },
// });

Navigation.startSingleScreenApp({
  screen: {
    screen: 'example.MainScreen',
    title: 'Wix UI Lib',
    navigatorButtons: {},
  },
});
