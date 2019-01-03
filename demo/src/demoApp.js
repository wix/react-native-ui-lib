import {AsyncStorage} from 'react-native';
import {Navigation} from 'react-native-navigation';
import * as Animatable from 'react-native-animatable';
import {AnimatableManager, ThemeManager, Constants, Assets, Colors, Typography} from 'react-native-ui-lib'; //eslint-disable-line
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

// AnimatableManager.loadAnimationPresets({
//   preset1: {
//     animation: 'fadeIn',
//     easing: 'ease-out-quint',
//     duration: 1000,
//     useNativeDriver: true,
//   },
//   preset2: {
//     animation: 'fadeInLeft',
//     easing: 'ease-out-expo',
//     duration: 500,
//     useNativeDriver: true,
//   },
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
// IMPORTANT! Make uilib's animations available globally for the app's use (option to pass adittional animation definitions)
Animatable.initializeRegistryWithDefinitions(AnimatableManager.loadAnimationDefinitions(/** customAnimationsDefinitions */)); 


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
