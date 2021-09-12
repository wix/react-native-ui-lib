import AsyncStorage from '@react-native-community/async-storage';
import {Navigation} from 'react-native-navigation';
import {Constants, Colors, Typography} from 'react-native-ui-lib'; // eslint-disable-line
import {registerScreens} from './screens';


/** Examples - uncomment when needed */
// Typography.loadTypographies({
//   h1: {fontSize: 58, fontWeight: '300', lineHeight: 80},
//   h2: {fontSize: 46, fontWeight: '300', lineHeight: 64},
// });

// Colors.loadColors({
//   pink: '#FF69B4',
//   gold: '#FFD700',
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

// const customAnimationsDefinitions = {
//   customAnimation1: {
//     from: {opacity: 0, translateY: 20},
//     to: {opacity: 1, translateY: 0},
//   },
//   customAnimation2: {
//     from: {opacity: 0, translateY: 40},
//     to: {opacity: 1, translateY: 0},
//   },
// };

function getDefaultNavigationStyle() {
  return {
    statusBar: {
      visible: true,
      style: 'light',
      backgroundColor: Colors.primary // for Android
    },
    layout: {
      backgroundColor: Colors.white,
      orientation: ['portrait', 'landscape']
    },
    topBar: {
      visible: true,
      noBorder: true, // for iOS
      elevation: 0, // for Android
      background: {
        color: Colors.primary
      },
      title: {
        color: Colors.white,
        fontSize: Typography.text60H.fontSize,
        fontFamily: Typography.text65H.fontFamily
      },
      subtitle: {
        color: Colors.white,
        fontSize: Typography.text80T.fontSize,
        fontFamily: Typography.text80.fontFamily
      },
      backButton: {
        // visible: true,
        color: Colors.white,
        showTitle: Constants.isIOS ? false : undefined,
        testID: 'pop'
      },
      leftButtonColor: Colors.white,
      leftButtonDisabledColor: Colors.rgba(Colors.white, 0.6),
      rightButtonColor: Colors.white,
      rightButtonDisabledColor: Colors.rgba(Colors.white, 0.6)
    }
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
                    text: 'R N U I L I B'
                  }
                }
              }
            }
          }
        ]
      }
    }
  };

  if (defaultScreen) {
    rootObject.root.stack.children.push({
      component: {
        name: defaultScreen
      }
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
  registerScreens(Navigation.registerComponent.bind(Navigation));
  getDefaultScreenAndStartApp();
});
