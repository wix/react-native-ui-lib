import {AsyncStorage} from 'react-native';
import {Navigation} from 'react-native-navigation';
import * as Animatable from 'react-native-animatable';
import {ThemeManager, Constants, Assets, Colors, Typography, BorderRadiuses} from 'react-native-ui-lib'; //eslint-disable-line
import _ from 'lodash';
import {registerScreens} from './screens';

/** Examples - uncomment when needed */

// ThemeManager.setTheme({
//   primaryColor: Colors.purple30,
//   CTA: {
//     backgroundColor: Colors.purple30,
//     textColor: Colors.dark10,
//   },
//   titleColor: Colors.blue10,
//   subtitleColor: Colors.blue40,
// });

// ThemeManager.setComponentTheme('Picker', (props) => {
//   if (props.useNativePicker) {
//     return {
//       topBarProps: {
//         doneLabel: Constants.isIOS ? 'Done2' : 'OK2',
//         cancelLabel: Constants.isIOS ? 'Cancel2' : 'CANCEL2',
//       },
//     };
//   }
// });

// Assets.loadAssetsGroup('icons.general', {
//   camera: require('./assets/icons/cameraSelected.png'),
// });



////// BLOGPOST
/* Typography.loadTypographies({
  header: {fontSize: 30, fontWeight: '400', lineHeight: 45},
  title: {fontSize: 18, fontWeight: '500', lineHeight: 36},
  buttonText: {fontSize: 16, fontWeight: '500'},
});

Colors.loadColors({
  primary: Colors.purple30,
  secondary: Colors.purple80,
  title: Colors.purple30,
  header: Colors.purple30,
  screen: Colors.dark80,
});

ThemeManager.setComponentTheme('TextField', (props) => {
  return {
    style: {
      borderWidth: 2,
      borderColor: Colors.primary,
      padding: 8,
      backgroundColor: Colors.secondary,
      borderRadius: BorderRadiuses.br20,
    },
    hideUnderline: true,
    titleColor: {focus: Colors.primary},
    color: {focus: Colors.dark10, default: Colors.dark30},
    title: _.toLower(props.title),
  };
});

ThemeManager.setComponentTheme('Button', (props) => {
  const defaultProps = {
    backgroundColor: Colors.primary,
    color: props.link ? Colors.primary : Colors.white,
    buttonText: true,
    borderRadius: BorderRadiuses.br20,
  };

  if (props.fullWidth) {
    defaultProps.backgroundColor = Colors.secondary;
    defaultProps.outline = true;
    defaultProps.outlineColor = Colors.primary;
    defaultProps.outlineWidth = 3;
    defaultProps.color = Colors.primary;
  }

  return defaultProps;
});

ThemeManager.setComponentTheme('RadioButton', {
  color: Colors.primary,
  size: 18,
  borderRadius: BorderRadiuses.br10,
});

ThemeManager.setComponentTheme('Card', {
  // enableShadow: false,
  containerStyle: {borderWidth: 2, borderColor: Colors.primary},
  borderRadius: BorderRadiuses.br20,
}); */

Animatable.initializeRegistryWithDefinitions({
  basicListEntrance: {
    from: {opacity: 0, translateY: 20},
    to: {opacity: 1, translateY: 0},
  },
});

function getDefaultNavigationStyle() {
  return {
    statusBar: {
      visible: true,
      style: 'light',
      backgroundColor: ThemeManager.primaryColor, // for Android
    },
    layout: {
      backgroundColor: Colors.white,
      orientation: ['portrait'],
    },
    topBar: {
      visible: true,
      noBorder: true, // for iOS
      elevation: 0, // for Android
      background: {
        color: ThemeManager.primaryColor,
      },
      title: {
        color: Colors.white,
        fontSize: Typography.text70.fontSize,
        fontFamily: Constants.isAndroid ? 'sans-serif-bold' : '.SFUIText-Heavy',
        alignment: 'center',
      },
      subtitle: {
        color: Colors.white,
        fontSize: Typography.text80.fontSize,
        fontFamily: Constants.isAndroid ? Typography.text80.fontFamily : '.SFUIText-Medium',
      },
      backButton: {
        // visible: true,
        color: Colors.white,
        showTitle: Constants.isIOS ? false : undefined,
        testID: 'pop',
      },
      leftButtonColor: Colors.white,
      leftButtonDisabledColor: Colors.rgba(Colors.white, 0.6),
      rightButtonColor: Colors.white,
      rightButtonDisabledColor: Colors.rgba(Colors.white, 0.6),
    },
  };
}

function startApp(defaultScreen) {
  Navigation.setDefaultOptions(getDefaultNavigationStyle());

  const rootObject = {
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'unicorn.MainScreen',
              options: {
                topBar: {
                  title: {
                    text: 'UILIB',
                  },
                },
              },
            },
          },
        ],
      },
    },
  };

  if (defaultScreen) {
    rootObject.root.stack.children.push({
      component: {
        name: defaultScreen,
      },
    });
  }

  Navigation.setRoot(rootObject);
}

async function getDefaultScreenAndStartApp() {
  try {
    const defaultScreen = await AsyncStorage.getItem('uilib.defaultScreen');
    startApp(defaultScreen);
  } catch (error) {
    console.warn(error);
    startApp();
  }
}

Navigation.events().registerAppLaunchedListener(() => {
  registerScreens();
  getDefaultScreenAndStartApp();
});
