import {Navigation} from 'react-native-navigation';
import {Constants, Assets, Colors, Typography} from 'react-native-ui-lib'; //eslint-disable-line
import * as Animatable from 'react-native-animatable';
// import './screens';
import {registerScreens} from './screens';


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

function getDefaultNavigationStyle() {
  return {
    statusBar: {
      visible: true,
      style: 'light',
      backgroundColor: Colors.violet30, // for Android
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
        color: Colors.violet30,
      },
      title: {
        color: Colors.white,
        fontSize: Typography.text70.fontSize,
        fontFamily: Constants.isAndroid ? Typography.text70.fontFamily : '.SFUIText-Heavy',
      },
      subtitle: {
        color: Colors.white,
        fontSize: Typography.text80.fontSize,
        fontFamily: Constants.isAndroid ? Typography.text80.fontFamily : '.SFUIText-Medium',
      },
      backButton: {
        visible: true,
        color: Colors.white,
        // icon: Constants.isIOS ? Assets.icons.navigation.back : undefined,
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

function startApp() {
  Navigation.setDefaultOptions(getDefaultNavigationStyle());

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'unicorn.MainScreen',
              options: {
                topBar: {
                  title: {
                    text: 'Wix UI Lib',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
}

Navigation.events().registerAppLaunchedListener(() => {
  registerScreens();
  startApp();
});

