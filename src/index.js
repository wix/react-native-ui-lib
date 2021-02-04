/**
 * Please don't forget to declare all the exports also in the fake "src/index.ts" file
 */
export default {
  // Components
  get ActionBar() {
    return require('./components/actionBar').default;
  },
  get ActionSheet() {
    return require('./components/actionSheet').default;
  },
  get AnimatedImage() {
    return require('./components/animatedImage').default;
  },
  get AnimatedScanner() {
    return require('./components/animatedScanner').default;
  },
  get Avatar() {
    return require('./components/avatar').default;
  },
  get Badge() {
    return require('./components/badge').default;
  },
  get Button() {
    return require('./components/button').default;
  },
  get Card() {
    return require('./components/card').default;
  },
  get Carousel() {
    return require('./components/carousel').default;
  },
  get Checkbox() {
    return require('./components/checkbox').default;
  },
  get ColorPalette() {
    return require('./components/colorPicker/ColorPalette').default;
  },
  get ColorPicker() {
    return require('./components/colorPicker').default;
  },
  get ColorSwatch() {
    return require('./components/colorPicker/ColorSwatch').default;
  },
  get ConnectionStatusBar() {
    return require('./components/connectionStatusBar').default;
  },
  get Chip() {
    return require('./components/chip').default;
  },
  get Dialog() {
    return require('./components/dialog').default;
  },
  get Drawer() {
    return require('./components/drawer').default;
  },
  get ExpandableSection() {
    return require('./components/expandableSection').default;
  },
  get Fader() {
    return require('./components/fader').default;
  },
  get FloatingButton() {
    return require('./components/floatingButton').default;
  },
  get FeatureHighlight() {
    return require('./components/featureHighlight').default;
  },
  get Hint() {
    return require('./components/hint').default;
  },
  get Image() {
    return require('./components/image').default;
  },
  get ProgressiveImage() {
    return require('./components/progressiveImage').default;
  },
  get KeyboardAwareScrollView() {
    return require('./components/KeyboardAwareScrollView').KeyboardAwareScrollView;
  },
  get KeyboardAwareListView() {
    return require('./components/KeyboardAwareScrollView').KeyboardAwareListView;
  },
  get KeyboardAwareFlatList() {
    return require('./components/KeyboardAwareScrollView').KeyboardAwareFlatList;
  },
  get BaseInput() {
    return require('./components/baseInput').default;
  },
  get TextArea() {
    return require('./components/textArea').default;
  },
  get TextField() {
    // TODO: Start migration by exporting TextFieldMigrator
    // return require('./components/textField/TextFieldMigrator').default;
    return require('./components/textField').default;
  },
  get MaskedInput() {
    return require('./components/maskedInput').default;
  },
  get Modal() {
    return require('./components/modal').default;
  },
  get ListItem() {
    return require('./components/listItem').default;
  },
  get LoaderScreen() {
    return require('./components/loaderScreen').default;
  },
  get PageControl() {
    return require('./components/pageControl').default;
  },
  get PanningProvider() {
    return require('./components/panningViews/panningProvider').default;
  },
  get PanGestureView() {
    return require('./components/panningViews/panGestureView').default;
  },
  get PanListenerView() {
    return require('./components/panningViews/panListenerView').default;
  },
  get PanDismissibleView() {
    return require('./components/panningViews/panDismissibleView').default;
  },
  get PanResponderView() {
    return require('./components/panningViews/panResponderView').default;
  },
  get Picker() {
    return require('./components/picker').default;
  },
  get DateTimePicker() {
    return require('./components/dateTimePicker').default;
  },
  get ProgressBar() {
    return require('./components/progressBar').default;
  },
  get Slider() {
    return require('./components/slider').default;
  },
  get StateScreen() {
    return require('./components/stateScreen').default;
  },
  get GradientSlider() {
    return require('./components/slider/GradientSlider').default;
  },
  get ColorSliderGroup() {
    return require('./components/slider/ColorSliderGroup').default;
  },
  get Stepper() {
    return require('./components/stepper').default;
  },
  get TabController() {
    return require('./components/tabController').default;
  },
  get TabBar() {
    return require('./components/tabBar').default;
  },
  get TagsInput() { // TODO: Renamed to ChipsInput, to be deleted after migration
    return require('./components/tagsInput').default;
  },
  get ChipsInput() {
    return require('./components/chipsInput').default;
  },
  get RadioButton() {
    return require('./components/radioButton/RadioButton').default;
  },
  get RadioGroup() {
    return require('./components/radioButton/RadioGroup').default;
  },
  get ScrollBar() {
    return require('./components/scrollBar').default;
  },
  get SharedTransition() {
    return require('./components/sharedTransition').default;
  },
  get StackAggregator() {
    return require('./components/stackAggregator').default;
  },
  get Switch() {
    return require('./components/switch').default;
  },
  get Text() {
    return require('./components/text').default;
  },
  get Toast() {
    return require('./components/toast').default;
  },
  get TouchableOpacity() {
    return require('./components/touchableOpacity').default;
  },
  get View() {
    return require('./components/view').default;
  },
  get Wizard() {
    return require('./components/wizard').default;
  },
  get WheelPickerDialog() {
    return require('./components/wheelPickerDialog').default;
  },

  // Assets
  get Assets() {
    return require('./assets').default;
  },

  // Commons
  get asBaseComponent() {
    return require('./commons').asBaseComponent;
  },
  get BaseComponent() {
    return require('./commons').BaseComponent;
  },
  get PureBaseComponent() {
    return require('./commons').PureBaseComponent;
  },
  get SelectableComponent() {
    return require('./commons').SelectableComponent;
  },
  get UIComponent() {
    return require('./commons').UIComponent;
  },
  get forwardRef() {
    return require('./commons').forwardRef;
  },
  get withScrollEnabler() {
    return require('./commons').withScrollEnabler;
  },
  get withScrollReached() {
    return require('./commons').withScrollReached;
  },
  get Modifiers() {
    return require('./commons').modifiers;
  },

  // Helpers
  get AvatarHelper() {
    return require('./helpers').AvatarHelper;
  },
  get Constants() {
    return require('./helpers').Constants;
  },
  get DocsGenerator() {
    return require('./helpers').DocsGenerator;
  },

  // Services
  get LogService() {
    return require('./services').LogService;
  },

  // NativeComponents
  get HighlighterOverlayView() {
    return require('./nativeComponents').HighlighterOverlayView;
  },
  get SafeAreaSpacerView() {
    return require('./nativeComponents').SafeAreaSpacerView;
  },
  get WheelPicker() {
    return require('./nativeComponents').WheelPicker;
  },
  get SafeAreaInsetsManager() {
    return require('./nativeComponents').SafeAreaInsetsManager;
  },
  get Keyboard() {
    return require('../lib/components/Keyboard').default;
  },

  // Style
  get Colors() {
    return require('./style').Colors;
  },
  get ColorName() {
    return require('./style').ColorName;
  },
  get BorderRadiuses() {
    return require('./style').BorderRadiuses;
  },
  get Shadows() {
    return require('./style').Shadows;
  },
  get Spacings() {
    return require('./style').Spacings;
  },
  get Components() {
    return require('./style').Components;
  },
  get ComponentsColors() {
    return require('./style').ComponentsColors;
  },
  get ThemeManager() {
    return require('./style').ThemeManager;
  },
  get Typography() {
    return require('./style').Typography;
  },
  get AnimatableManager() {
    return require('./style').AnimatableManager;
  },
  get Hooks() {
    return require('./hooks');
  },

  // Incubator
  get Incubator() {
    return require('./incubator');
  }
};
