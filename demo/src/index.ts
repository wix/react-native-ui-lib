import {UIManager, I18nManager} from 'react-native';
import {navigationData as menuStructure} from './screens/MenuStructure';
import {loadDemoConfigurations} from './configurations';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true); // eslint-disable-line
I18nManager.allowRTL(true);

// componentScreens
const ActionSheetScreen = () => import('./screens/componentScreens/ActionSheetScreen');
const ActionBarScreen = () => import('./screens/componentScreens/ActionBarScreen');
const AvatarsScreen = () => import('./screens/componentScreens/AvatarsScreen');
// @ts-expect-error
const AnimatedImageScreen = () => import('./screens/componentScreens/AnimatedImageScreen');
const ButtonsScreen = () => import('./screens/componentScreens/ButtonsScreen');
const BadgesScreen = () => import('./screens/componentScreens/BadgesScreen');
const CardsScreen = () => import('./screens/componentScreens/CardsScreen');
const CarouselScreen = () => import('./screens/componentScreens/CarouselScreen');
const CarouselVerticalScreen = () => import('./screens/componentScreens/CarouselVerticalScreen');
const CheckboxScreen = () => import('./screens/componentScreens/CheckboxScreen');
const ChipScreen = () => import('./screens/componentScreens/ChipScreen');
const ConnectionStatusBarScreen = () => import('./screens/componentScreens/ConnectionStatusBarScreen');
// @ts-expect-error
const DialogScreen = () => import('./screens/componentScreens/DialogScreen');
const DrawerScreen = () => import('./screens/componentScreens/DrawerScreen');
const ExpandableSectionScreen = () => import('./screens/componentScreens/ExpandableSectionScreen');
const ChipsInputScreen = () => import('./screens/componentScreens/ChipsInputScreen');
const HapticScreen = () => import('./screens/componentScreens/HapticScreen');
const HintsScreen = () => import('./screens/componentScreens/HintsScreen');
const HorizontalSortableListScreen = () => import('./screens/componentScreens/HorizontalSortableListScreen');
const IconScreen = () => import('./screens/componentScreens/IconScreen');
const ImageScreen = () => import('./screens/componentScreens/ImageScreen');
// @ts-expect-error
const ProgressiveImageScreen = () => import('./screens/componentScreens/ProgressiveImageScreen');
const MaskedInputScreen = () => import('./screens/componentScreens/MaskedInputScreen');
const OverlaysScreen = () => import('./screens/componentScreens/OverlaysScreen');
const PageControlScreen = () => import('./screens/componentScreens/PageControlScreen');
const PanDismissibleScreen = () => import('./screens/componentScreens/PanDismissibleScreen');
const PanListenerScreen = () => import('./screens/componentScreens/PanListenerScreen');
const PanResponderScreen = () => import('./screens/componentScreens/PanResponderScreen');
const PickerScreen = () => import('./screens/componentScreens/PickerScreen');
// @ts-expect-error
const RadioButtonScreen = () => import('./screens/componentScreens/RadioButtonScreen');
const SectionsWheelPickerScreen = () => import('./screens/componentScreens/SectionsWheelPickerScreen');
const SegmentedControlScreen = () => import('./screens/componentScreens/SegmentedControlScreen');
// @ts-expect-error
const SharedTransitionScreen = () => import('./screens/componentScreens/SharedTransitionScreen');
const SkeletonViewScreen = () => import('./screens/componentScreens/SkeletonViewScreen');
const SortableListScreen = () => import('./screens/componentScreens/SortableListScreen');
const StepperScreen = () => import('./screens/componentScreens/StepperScreen');
const SwitchScreen = () => import('./screens/componentScreens/SwitchScreen');
// @ts-expect-error
const ToastsScreen = () => import('./screens/componentScreens/ToastsScreen');
const TabControllerScreen = () => import('./screens/componentScreens/TabControllerScreen');
const TextScreen = () => import('./screens/componentScreens/TextScreen');
const TextFieldScreen = () => import('./screens/componentScreens/TextFieldScreen');
// @ts-expect-error
const TourScreen = () => import('./screens/componentScreens/TourScreen');
const FeatureHighlightScreen = () => import('./screens/componentScreens/FeatureHighlightScreen');
const SliderScreen = () => import('./screens/componentScreens/SliderScreen');
const FloatingButtonScreen = () => import('./screens/componentScreens/FloatingButtonScreen');
const ColorPickerScreen = () => import('./screens/componentScreens/ColorPickerScreen');
const ColorSwatchScreen = () => import('./screens/componentScreens/ColorSwatchScreen');
const StackAggregatorScreen = () => import('./screens/componentScreens/StackAggregatorScreen');
const DateTimePickerScreen = () => import('./screens/componentScreens/DateTimePickerScreen');
// @ts-expect-error
const ViewScreen = () => import('./screens/componentScreens/ViewScreen');
const WizardScreen = () => import('./screens/componentScreens/WizardScreen');
// nativeComponentScreens
const DynamicFontsScreen = () => import('./screens/nativeComponentScreens/DynamicFontsScreen');
// @ts-expect-error
const HighlightOverlayViewScreen = () => import('./screens/nativeComponentScreens/HighlightOverlayViewScreen');
const SafeAreaSpacerViewScreen = () => import('./screens/nativeComponentScreens/SafeAreaSpacerViewScreen');
// Full Screen components
const EmptyStateScreen = () => import('./screens/componentScreens/EmptyStateScreen');
const LoadingScreen = () => import('./screens/componentScreens/LoadingScreen');
// TODO: fix Expo issues (navigation) before un-commenting
// const ModalScreen = () => import('./screens/componentScreens/ModalScreen')
// listScreens
const BasicListScreen = () => import('./screens/componentScreens/BasicListScreen');
// @ts-expect-error
const ContactsListScreen = () => import('./screens/componentScreens/ContactsListScreen');
// @ts-expect-error
const ConversationListScreen = () => import('./screens/componentScreens/ConversationListScreen');
// styleScreens
// @ts-expect-error
const BorderRadiusesScreen = () => import('./screens/foundationScreens/BorderRadiusesScreen');
// @ts-expect-error
const ColorsScreen = () => import('./screens/foundationScreens/ColorsScreen');
const DarkMode = () => import('./screens/foundationScreens/DarkModeScreen');
// @ts-expect-error
const TypographyScreen = () => import('./screens/foundationScreens/TypographyScreen');
// @ts-expect-error
const ShadowsScreen = () => import('./screens/foundationScreens/ShadowsScreen');
// @ts-expect-error
const SpacingsScreen = () => import('./screens/foundationScreens/SpacingsScreen');
const RTLScreen = () => import('./screens/foundationScreens/RTLScreen');
// animationScreens
// @ts-expect-error
const CardScannerScreen = () => import('./screens/componentScreens/CardScannerScreen');
const ProgressBarScreen = () => import('./screens/componentScreens/ProgressBarScreen');
const ScrollBar = () => import('./screens/componentScreens/ScrollBarScreen');
const Marquee = () => import('./screens/componentScreens/MarqueeScreen');
const NumberInput = () => import('./screens/componentScreens/NumberInputScreen');
const WheelPicker = () => import('./screens/componentScreens/WheelPickerScreen');
const GridList = () => import('./screens/componentScreens/GridListScreen');
const SortableGridList = () => import('./screens/componentScreens/SortableGridListScreen');
// Incubator
const PanViewScreen = () => import('./screens/incubatorScreens/PanViewScreen');
const IncubatorSlider = () => import('./screens/incubatorScreens/IncubatorSliderScreen');
const IncubatorDialog = () => import('./screens/incubatorScreens/IncubatorDialogScreen');
const IncubatorToast = () => import('./screens/incubatorScreens/IncubatorToastScreen');
const IncubatorExpandableOverlay = () => import('./screens/incubatorScreens/IncubatorExpandableOverlayScreen');
// realExamples
// @ts-expect-error
const AppleMusic = () => import('./screens/realExamples/AppleMusic');
const Pinterest = () => import('./screens/realExamples/Pinterest');
// @ts-expect-error
const ListActionsScreen = () => import('./screens/realExamples/ListActions/ListActionsScreen');
const ProductPage = () => import('./screens/realExamples/ProductPage');
const Twitter = () => import('./screens/realExamples/Twitter');
// wrapperScreens
// @ts-expect-error
const TouchableOpacityScreen = () => import('./screens/componentScreens/TouchableOpacityScreen');
const Modal = () => import('./screens/componentScreens/ModalScreen');
const Timeline = () => import('./screens/componentScreens/TimelineScreen');
const WithScrollEnabler = () => import('./screens/componentScreens/WithScrollEnablerScreen');
const WithScrollReached = () => import('./screens/componentScreens/WithScrollReachedScreen');
const Fader = () => import('./screens/componentScreens/FaderScreen');
const GridView = () => import('./screens/componentScreens/GridViewScreen');
const Playground = () => import('./screens/PlaygroundScreen');
// @ts-expect-error
const KeyboardAwareScrollView = () => import('./screens/componentScreens/KeyboardAwareScrollViewScreen');

const screens = {
  ActionSheetScreen,
  ActionBarScreen,
  AvatarsScreen,
  AnimatedImageScreen,
  ButtonsScreen,
  BadgesScreen,
  CardsScreen,
  CarouselScreen,
  CarouselVerticalScreen,
  CheckboxScreen,
  ChipScreen,
  ConnectionStatusBarScreen,
  DialogScreen,
  DrawerScreen,
  ExpandableSectionScreen,
  ChipsInputScreen,
  HapticScreen,
  HintsScreen,
  HorizontalSortableListScreen,
  IconScreen,
  ImageScreen,
  ProgressiveImageScreen,
  MaskedInputScreen,
  OverlaysScreen,
  PageControlScreen,
  PanDismissibleScreen,
  PanListenerScreen,
  PanResponderScreen,
  PickerScreen,
  RadioButtonScreen,
  SectionsWheelPickerScreen,
  SegmentedControlScreen,
  SharedTransitionScreen,
  SkeletonViewScreen,
  SortableListScreen,
  StepperScreen,
  SwitchScreen,
  ToastsScreen,
  TabControllerScreen,
  TextScreen,
  TextFieldScreen,
  TourScreen,
  FeatureHighlightScreen,
  SliderScreen,
  FloatingButtonScreen,
  ColorPickerScreen,
  ColorSwatchScreen,
  StackAggregatorScreen,
  DateTimePickerScreen,
  ViewScreen,
  WizardScreen,
  DynamicFontsScreen,
  HighlightOverlayViewScreen,
  SafeAreaSpacerViewScreen,
  EmptyStateScreen,
  LoadingScreen,
  BasicListScreen,
  ContactsListScreen,
  ConversationListScreen,
  BorderRadiusesScreen,
  ColorsScreen,
  DarkMode,
  TypographyScreen,
  ShadowsScreen,
  SpacingsScreen,
  RTLScreen,
  CardScannerScreen,
  ProgressBarScreen,
  ScrollBar,
  Marquee,
  NumberInput,
  WheelPicker,
  GridList,
  SortableGridList,
  PanViewScreen,
  IncubatorSlider,
  IncubatorDialog,
  IncubatorToast,
  IncubatorExpandableOverlay,
  AppleMusic,
  Pinterest,
  ListActionsScreen,
  ProductPage,
  Twitter,
  TouchableOpacityScreen,
  Modal,
  Timeline,
  WithScrollEnabler,
  WithScrollReached,
  Fader,
  GridView,
  Playground,
  KeyboardAwareScrollView
};

// General
const ExampleScreenPresenter = () => import('./screens/ExampleScreenPresenter');
export {screens, menuStructure, loadDemoConfigurations, ExampleScreenPresenter};
