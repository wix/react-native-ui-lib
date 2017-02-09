import {Navigation} from 'react-native-navigation';
import {Colors, Button, Badge, ThemeManager} from 'react-native-ui-lib'; //eslint-disable-line
import './screens';

// ThemeManager.setTheme({
//   CTA: {
//     backgroundColor: Colors.green10,
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
