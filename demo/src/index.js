import {I18nManager} from 'react-native';
import {navigationData as menuStructure} from './screens/MenuStructure';
import {loadDemoConfigurations} from './configurations';

I18nManager.allowRTL(true);

module.exports = {
  name: 'unicorn demo app',
  menuStructure,
  loadDemoConfigurations,
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
      get CarouselVerticalScreen() {
        return require('./screens/componentScreens/CarouselVerticalScreen').default;
      },
      get CheckboxScreen() {
        return require('./screens/componentScreens/CheckboxScreen').default;
      },
      get ChipScreen() {
        return require('./screens/componentScreens/ChipScreen').default;
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
      get ExpandableSectionScreen() {
        return require('./screens/componentScreens/ExpandableSectionScreen').default;
      },
      get ChipsInputScreen() {
        return require('./screens/componentScreens/ChipsInputScreen').default;
      },
      get HapticScreen() {
        return require('./screens/componentScreens/HapticScreen').default;
      },
      get HintsScreen() {
        return require('./screens/componentScreens/HintsScreen').default;
      },
      get HorizontalSortableListScreen() {
        return require('./screens/componentScreens/HorizontalSortableListScreen').default;
      },
      get IconScreen() {
        return require('./screens/componentScreens/IconScreen').default;
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
      get PickerScreen() {
        return require('./screens/componentScreens/PickerScreen').default;
      },
      get RadioButtonScreen() {
        return require('./screens/componentScreens/RadioButtonScreen').default;
      },
      get SectionsWheelPickerScreen() {
        return require('./screens/componentScreens/SectionsWheelPickerScreen').default;
      },
      get SegmentedControlScreen() {
        return require('./screens/componentScreens/SegmentedControlScreen').default;
      },
      get SkeletonViewScreen() {
        return require('./screens/componentScreens/SkeletonViewScreen').default;
      },
      get SortableListScreen() {
        return require('./screens/componentScreens/SortableListScreen').default;
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
      get TextScreen() {
        return require('./screens/componentScreens/TextScreen').default;
      },
      // TODO: fix Expo issues (navigation) before un-commenting
      get TextFieldScreen() {
        return require('./screens/componentScreens/TextFieldScreen').default;
      },
      get TourScreen() {
        return require('./screens/componentScreens/TourScreen').default;
      },
      get FeatureHighlightScreen() {
        return require('./screens/componentScreens/FeatureHighlightScreen').default;
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
      get DynamicFontsScreen() {
        return require('./screens/nativeComponentScreens/DynamicFontsScreen').default;
      },
      get HighlightOverlayViewScreen() {
        return require('./screens/nativeComponentScreens/HighlightOverlayViewScreen').default;
      },
      get SafeAreaSpacerViewScreen() {
        return require('./screens/nativeComponentScreens/SafeAreaSpacerViewScreen').default;
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
      get DarkMode() {
        return require('./screens/foundationScreens/DarkModeScreen').default;
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
      get RTLScreen() {
        return require('./screens/foundationScreens/RTLScreen').default;
      },
      // animationScreens
      get CardScannerScreen() {
        return require('./screens/componentScreens/CardScannerScreen').default;
      },
      get ProgressBarScreen() {
        return require('./screens/componentScreens/ProgressBarScreen').default;
      },
      get ScrollBar() {
        return require('./screens/componentScreens/ScrollBarScreen').default;
      },
      get Marquee() {
        return require('./screens/componentScreens/MarqueeScreen').default;
      },
      get NumberInput() {
        return require('./screens/componentScreens/NumberInputScreen').default;
      },
      get WheelPicker() {
        return require('./screens/componentScreens/WheelPickerScreen').default;
      },
      get GridList() {
        return require('./screens/componentScreens/GridListScreen').default;
      },
      get SortableGridList() {
        return require('./screens/componentScreens/SortableGridListScreen').default;
      },
      get PanViewScreen() {
        return require('./screens/componentScreens/PanViewScreen').default;
      },
      // Incubator
      get IncubatorSlider() {
        return require('./screens/incubatorScreens/IncubatorSliderScreen').default;
      },
      get IncubatorToast() {
        return require('./screens/incubatorScreens/IncubatorToastScreen').default;
      },
      get IncubatorExpandableOverlay() {
        return require('./screens/incubatorScreens/IncubatorExpandableOverlayScreen').default;
      },
      get IncubatorCalendarScreen() {
        return require('./screens/incubatorScreens/IncubatorCalendarScreen').default;
      },
      // realExamples
      get AppleMusic() {
        return require('./screens/realExamples/AppleMusic').default;
      },
      get Pinterest() {
        return require('./screens/realExamples/Pinterest').default;
      },
      get PieChartScreen() {
        return require('./screens/componentScreens/PieChartScreen.tsx').default;
      },
      get ListActionsScreen() {
        return require('./screens/realExamples/ListActions/ListActionsScreen').default;
      },
      get ProductPage() {
        return require('./screens/realExamples/ProductPage').default;
      },
      get Twitter() {
        return require('./screens/realExamples/Twitter').default;
      },
      // wrapperScreens
      get TouchableOpacityScreen() {
        return require('./screens/componentScreens/TouchableOpacityScreen').default;
      },
      get Modal() {
        return require('./screens/componentScreens/ModalScreen').default;
      },
      get Timeline() {
        return require('./screens/componentScreens/TimelineScreen').default;
      },
      get WithScrollEnabler() {
        return require('./screens/componentScreens/WithScrollEnablerScreen').default;
      },
      get WithScrollReached() {
        return require('./screens/componentScreens/WithScrollReachedScreen').default;
      },
      get Fader() {
        return require('./screens/componentScreens/FaderScreen').default;
      },
      get GridView() {
        return require('./screens/componentScreens/GridViewScreen').default;
      },
      get Playground() {
        return require('./screens/PlaygroundScreen').default;
      },
      get KeyboardAwareScrollView() {
        return require('./screens/componentScreens/KeyboardAwareScrollViewScreen').default;
      }
    };
  },
  // General
  get ExampleScreenPresenter() {
    return require('./screens/ExampleScreenPresenter');
  }
};
