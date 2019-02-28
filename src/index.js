module.exports = {
  // Animations
  get AnimatedImage() { return require('./animations').AnimatedImage; },
  get AnimatedScanner() { return require('./animations').AnimatedScanner; },
  get ProgressBar() { return require('./animations').ProgressBar; },

  // Components
  get ActionBar() { return require('./components').ActionBar; },
  get ActionSheet() { return require('./components').ActionSheet; },
  get Avatar() { return require('./components').Avatar; },
  get Badge() { return require('./components').Badge; },
  get Button() { return require('./components').Button; },
  get Card() { return require('./components').Card; },
  get Carousel() { return require('./components').Carousel; },
  get Checkbox() { return require('./components').Checkbox; },
  get ConnectionStatusBar() { return require('./components').ConnectionStatusBar; },
  get Dialog() { return require('./components').Dialog; },
  get FeatureHighlight() { return require('./components').FeatureHighlight; },
  get Hint() { return require('./components').Hint; },
  get Image() { return require('./components').Image; },
  get TextArea() { return require('./components').TextArea; },
  get TextField() { return require('./components').TextField; },
  get TextInput() { return require('./components').TextInput; },
  get MaskedInput() { return require('./components').MaskedInput; },
  get ListItem() { return require('./components').ListItem; },
  get Notification() { return require('./components').Notification; },
  get PageControl() { return require('./components').PageControl; },
  get PanGestureView() { return require('./components').PanGestureView; },
  get Picker() { return require('./components').Picker; },
  get Stepper() { return require('./components').Stepper; },
  get TabBar() { return require('./components').TabBar; },
  get TagsInput() { return require('./components').TagsInput; },
  get RadioButton() { return require('./components').RadioButton; },
  get RadioGroup() { return require('./components').RadioGroup; },
  get SharedTransition() { return require('./components').SharedTransition; },
  get Switch() { return require('./components').Switch; },
  get Text() { return require('./components').Text; },
  get Toast() { return require('./components').Toast; },
  get TouchableOpacity() { return require('./components').TouchableOpacity; },
  get Tour() { return require('./components').Tour; },
  get View() { return require('./components').View; },
  get WheelPickerDialog() { return require('./components').WheelPickerDialog; },

  // Assets
  get Assets() { return require('./assets').default; },

  // Commons
  get BaseComponent() { return require('./commons').BaseComponent; },
  get PureBaseComponent() { return require('./commons').PureBaseComponent; },
  get SelectableComponent() { return require('./commons').SelectableComponent; },
  get UIComponent() { return require('./commons').UIComponent; },
  get forwardRef() { return require('./commons').forwardRef; },

  // Helpers
  get AvatarHelper() { return require('./helpers').AvatarHelper; },
  get Constants() { return require('./helpers').Constants; },
  get DocsGenerator() { return require('./helpers').DocsGenerator; },

  // ScreenComponents
  get LoaderScreen() { return require('./screensComponents').LoaderScreen; },
  get Modal() { return require('./screensComponents').Modal; },
  get StateScreen() { return require('./screensComponents').StateScreen; },

  // NativeComponents
  get HighlighterOverlayView() { return require('./nativeComponents').HighlighterOverlayView; },
  get SafeAreaSpacerView() { return require('./nativeComponents').SafeAreaSpacerView; },
  get WheelPicker() { return require('./nativeComponents').WheelPicker; },
  get SafeAreaInsetsManager() { return require('./nativeComponents').SafeAreaInsetsManager; },

  // InteractableComponents
  get Drawer() { return require('./interactableComponents').Drawer; },

  // Style
  get Colors() { return require('./style').Colors; },
  get BorderRadiuses() { return require('./style').BorderRadiuses; },
  get Shadows() { return require('./style').Shadows; },
  get Spacings() { return require('./style').Spacings; },
  get Components() { return require('./style').Components; },
  get ComponentsColors() { return require('./style').ComponentsColors; },
  get ThemeManager() { return require('./style').ThemeManager; },
  get Typography() { return require('./style').Typography; },
  get AnimatableManager() { return require('./style').AnimatableManager; },
};
