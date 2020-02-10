import {UIManager, I18nManager} from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true); // eslint-disable-line
I18nManager.allowRTL(true);

module.exports = {
  name: 'unicorn demo app',
  // componentScreens
  ActionSheetScreen: require('./screens/componentScreens/ActionSheetScreen'),
  ActionBarScreen: require('./screens/componentScreens/ActionBarScreen'),
  AvatarsScreen: require('./screens/componentScreens/AvatarsScreen'),
  AnimatedImageScreen: require('./screens/componentScreens/AnimatedImageScreen'),
  ButtonsScreen: require('./screens/componentScreens/ButtonsScreen'),
  BadgesScreen: require('./screens/componentScreens/BadgesScreen'),
  CardsScreen: require('./screens/componentScreens/CardsScreen'),
  CarouselScreen: require('./screens/componentScreens/CarouselScreen'),
  CheckboxScreen: require('./screens/componentScreens/CheckboxScreen'),
  ConnectionStatusBarScreen: require('./screens/componentScreens/ConnectionStatusBarScreen'),
  DialogScreen: require('./screens/componentScreens/DialogScreen'),
  DrawerScreen: require('./screens/componentScreens/DrawerScreen'),
  TagsInputScreen: require('./screens/componentScreens/TagsInputScreen'),
  HintsScreen: require('./screens/componentScreens/HintsScreen'),
  ImageScreen: require('./screens/componentScreens/ImageScreen'),
  MaskedInputScreen: require('./screens/componentScreens/MaskedInputScreen'),
  OverlaysScreen: require('./screens/componentScreens/OverlaysScreen'),
  PageControlScreen: require('./screens/componentScreens/PageControlScreen'),
  PanDismissibleScreen: require('./screens/componentScreens/PanDismissibleScreen'),
  PanListenerScreen: require('./screens/componentScreens/PanListenerScreen'),
  PanResponderScreen: require('./screens/componentScreens/PanResponderScreen'),
  PickerScreen: require('./screens/componentScreens/PickerScreen'),
  RadioButtonScreen: require('./screens/componentScreens/RadioButtonScreen'),
  SharedTransitionScreen: require('./screens/componentScreens/SharedTransitionScreen'),
  StepperScreen: require('./screens/componentScreens/StepperScreen'),
  SwitchScreen: require('./screens/componentScreens/SwitchScreen'),
  ToastsScreen: require('./screens/componentScreens/ToastsScreen'),
  TabBarScreen: require('./screens/componentScreens/TabBarScreen'),
  TextScreen: require('./screens/componentScreens/TextScreen'),
  TextFieldScreen: require('./screens/componentScreens/TextFieldScreen'),
  TourScreen: require('./screens/componentScreens/TourScreen'),
  FeatureHighlightScreen: require('./screens/componentScreens/FeatureHighlightScreen'),
  WheelPickerDialogScreen: require('./screens/componentScreens/WheelPickerDialogScreen'),
  SliderScreen: require('./screens/componentScreens/SliderScreen'),
  FloatingButtonScreen: require('./screens/componentScreens/FloatingButtonScreen'),
  ColorPickerScreen: require('./screens/componentScreens/ColorPickerScreen'),
  ColorSwatchScreen: require('./screens/componentScreens/ColorSwatchScreen'),
  StackAggregatorScreen: require('./screens/componentScreens/StackAggregatorScreen'),
  DateTimePickerScreen: require('./screens/componentScreens/DateTimePickerScreen'),
  WizardScreen: require('./screens/componentScreens/WizardScreen'),
  // nativeComponentScreens
  HighlightOverlayViewScreen: require('./screens/nativeComponentScreens/HighlightOverlayViewScreen'),
  SafeAreaSpacerViewScreen: require('./screens/nativeComponentScreens/SafeAreaSpacerViewScreen'),
  WheelPickerViewScreen: require('./screens/nativeComponentScreens/WheelPickerViewScreen'),
  // componentScreenScreens
  EmptyStateScreen: require('./screens/componentScreenScreens/EmptyStateScreen'),
  LoadingScreen: require('./screens/componentScreenScreens/LoadingScreen'),
  ModalScreen: require('./screens/componentScreenScreens/ModalScreen'),
  // listScreens
  BasicListScreen: require('./screens/listScreens/BasicListScreen'),
  ContactsListScreen: require('./screens/listScreens/ContactsListScreen'),
  ConversationListScreen: require('./screens/listScreens/ConversationListScreen'),
  // styleScreens
  BorderRadiusesScreen: require('./screens/styleScreens/BorderRadiusesScreen'),
  ColorsScreen: require('./screens/styleScreens/ColorsScreen'),
  TypographyScreen: require('./screens/styleScreens/TypographyScreen'),
  ShadowsScreen: require('./screens/styleScreens/ShadowsScreen'),
  SpacingsScreen: require('./screens/styleScreens/SpacingsScreen'),
  // animationScreens
  CardScannerScreen: require('./screens/animationScreens/CardScannerScreen'),
  CardAnimationsScreen: require('./screens/animationScreens/CardAnimationsScreen'),
  ListAnimationsScreen: require('./screens/animationScreens/ListAnimationsScreen'),
  ProgressBarScreen: require('./screens/animationScreens/ProgressBarScreen'),
  // realExamples
  AppleMusic: require('./screens/realExamples/AppleMusic'),
  Pinterest: require('./screens/realExamples/Pinterest'),
  ListActionsScreen: require('./screens/realExamples/ListActions/ListActionsScreen'),
  // wrapperScreens
  TouchableOpacityScreen: require('./screens/wrapperScreens/TouchableOpacityScreen'),
  // General
  ExampleScreenPresenter: require('./screens/ExampleScreenPresenter')
};
