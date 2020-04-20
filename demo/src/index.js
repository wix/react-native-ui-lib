import {UIManager, I18nManager} from 'react-native';
import {navigationData as menuStructure} from './screens/MenuStructure';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true); // eslint-disable-line
I18nManager.allowRTL(true);

module.exports = {
  name: 'unicorn demo app',
  menuStructure,
  // componentScreens
  get screens() {
    return {
      get ActionSheetScreen() {
        return require('./screens/componentScreens/ActionSheetScreen').default;
      },
      get ActionBarScreen() {
        return require('./screens/componentScreens/ActionBarScreen').default;
      },
      get AvatarsScreen() {
        return require('./screens/componentScreens/AvatarsScreen').default;
      },
      get AnimatedImageScreen() {
        return require('./screens/componentScreens/AnimatedImageScreen').default;
      },
      get ButtonsScreen() {
        return require('./screens/componentScreens/ButtonsScreen').default;
      },
      get BadgesScreen() {
        return require('./screens/componentScreens/BadgesScreen').default;
      },
      get CardsScreen() {
        return require('./screens/componentScreens/CardsScreen').default;
      },
      get CarouselScreen() {
        return require('./screens/componentScreens/CarouselScreen').default;
      },
      get CheckboxScreen() {
        return require('./screens/componentScreens/CheckboxScreen').default;
      },
      get ConnectionStatusBarScreen() {
        return require('./screens/componentScreens/ConnectionStatusBarScreen').default;
      },
      get DialogScreen() {
        return require('./screens/componentScreens/DialogScreen').default;
      },
      get DrawerScreen() {
        return require('./screens/componentScreens/DrawerScreen').default;
      },
      get TagsInputScreen() {
        return require('./screens/componentScreens/TagsInputScreen').default;
      },
      get HintsScreen() {
        return require('./screens/componentScreens/HintsScreen').default;
      },
      get ImageScreen() {
        return require('./screens/componentScreens/ImageScreen').default;
      },
      get ProgressiveImageScreen() {
        return require('./screens/componentScreens/ProgressiveImageScreen').default;
      },
      get MaskedInputScreen() {
        return require('./screens/componentScreens/MaskedInputScreen').default;
      },
      get OverlaysScreen() {
        return require('./screens/componentScreens/OverlaysScreen').default;
      },
      get PageControlScreen() {
        return require('./screens/componentScreens/PageControlScreen').default;
      },
      get PanDismissibleScreen() {
        return require('./screens/componentScreens/PanDismissibleScreen').default;
      },
      get PanListenerScreen() {
        return require('./screens/componentScreens/PanListenerScreen').default;
      },
      get PanResponderScreen() {
        return require('./screens/componentScreens/PanResponderScreen').default;
      },
      get PickerScreen() {
        return require('./screens/componentScreens/PickerScreen').default;
      },
      get RadioButtonScreen() {
        return require('./screens/componentScreens/RadioButtonScreen').default;
      },
      get SharedTransitionScreen() {
        return require('./screens/componentScreens/SharedTransitionScreen').default;
      },
      get StepperScreen() {
        return require('./screens/componentScreens/StepperScreen').default;
      },
      get SwitchScreen() {
        return require('./screens/componentScreens/SwitchScreen').default;
      },
      get ToastsScreen() {
        return require('./screens/componentScreens/ToastsScreen').default;
      },
      get TabControllerScreen() {
        return require('./screens/componentScreens/TabControllerScreen').default;
      },
      get TabBarScreen() {
        return require('./screens/componentScreens/TabBarScreen').default;
      },
      get TextScreen() {
        return require('./screens/componentScreens/TextScreen').default;
      },
      // TODO: fix Expo issues (navigation) before un-commenting 
      // get TextFieldScreen() {
      //   return require('./screens/componentScreens/TextFieldScreen').default;
      // },
      get TourScreen() {
        return require('./screens/componentScreens/TourScreen').default;
      },
      get FeatureHighlightScreen() {
        return require('./screens/componentScreens/FeatureHighlightScreen').default;
      },
      get WheelPickerDialogScreen() {
        return require('./screens/componentScreens/WheelPickerDialogScreen').default;
      },
      get SliderScreen() {
        return require('./screens/componentScreens/SliderScreen').default;
      },
      get FloatingButtonScreen() {
        return require('./screens/componentScreens/FloatingButtonScreen').default;
      },
      get ColorPickerScreen() {
        return require('./screens/componentScreens/ColorPickerScreen').default;
      },
      get ColorSwatchScreen() {
        return require('./screens/componentScreens/ColorSwatchScreen').default;
      },
      get StackAggregatorScreen() {
        return require('./screens/componentScreens/StackAggregatorScreen').default;
      },
      get DateTimePickerScreen() {
        return require('./screens/componentScreens/DateTimePickerScreen').default;
      },
      get ViewScreen() {
        return require('./screens/componentScreens/ViewScreen').default;
      },
      get WizardScreen() {
        return require('./screens/componentScreens/WizardScreen').default;
      },
      // nativeComponentScreens
      get HighlightOverlayViewScreen() {
        return require('./screens/nativeComponentScreens/HighlightOverlayViewScreen').default;
      },
      get SafeAreaSpacerViewScreen() {
        return require('./screens/nativeComponentScreens/SafeAreaSpacerViewScreen').default;
      },
      get WheelPickerViewScreen() {
        return require('./screens/nativeComponentScreens/WheelPickerViewScreen').default;
      },
      // Full Screen components
      get EmptyStateScreen() {
        return require('./screens/componentScreens/EmptyStateScreen').default;
      },
      get LoadingScreen() {
        return require('./screens/componentScreens/LoadingScreen').default;
      },
      // TODO: fix Expo issues (navigation) before un-commenting 
      // get ModalScreen() {
      //   return require('./screens/componentScreens/ModalScreen').default;
      // },
      // listScreens
      get BasicListScreen() {
        return require('./screens/componentScreens/BasicListScreen').default;
      },
      get ContactsListScreen() {
        return require('./screens/componentScreens/ContactsListScreen').default;
      },
      get ConversationListScreen() {
        return require('./screens/componentScreens/ConversationListScreen').default;
      },
      // styleScreens
      get BorderRadiusesScreen() {
        return require('./screens/foundationScreens/BorderRadiusesScreen').default;
      },
      get ColorsScreen() {
        return require('./screens/foundationScreens/ColorsScreen').default;
      },
      get TypographyScreen() {
        return require('./screens/foundationScreens/TypographyScreen').default;
      },
      get ShadowsScreen() {
        return require('./screens/foundationScreens/ShadowsScreen').default;
      },
      get SpacingsScreen() {
        return require('./screens/foundationScreens/SpacingsScreen').default;
      },
      // animationScreens
      get CardScannerScreen() {
        return require('./screens/componentScreens/CardScannerScreen').default;
      },
      get CardAnimationsScreen() {
        return require('./screens/animationScreens/CardAnimationsScreen').default;
      },
      get ListAnimationsScreen() {
        return require('./screens/animationScreens/ListAnimationsScreen').default;
      },
      get ProgressBarScreen() {
        return require('./screens/componentScreens/ProgressBarScreen').default;
      },
      // realExamples
      get AppleMusic() {
        return require('./screens/realExamples/AppleMusic').default;
      },
      get Pinterest() {
        return require('./screens/realExamples/Pinterest').default;
      },
      get ListActionsScreen() {
        return require('./screens/realExamples/ListActions/ListActionsScreen').default;
      },
      // wrapperScreens
      get TouchableOpacityScreen() {
        return require('./screens/componentScreens/TouchableOpacityScreen').default;
      }
    };
  },
  // General
  get ExampleScreenPresenter() {
    return require('./screens/ExampleScreenPresenter');
  }
};
