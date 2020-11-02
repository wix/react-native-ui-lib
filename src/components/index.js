export default {
  get ActionBar() {
    return require('./actionBar').default;
  },
  get ActionSheet() {
    return require('./actionSheet').default;
  },
  get AnimatedImage() {
    return require('./animatedImage').default;
  },
  get AnimatedScanner() {
    return require('./animatedScanner').default;
  },
  get Avatar() {
    return require('./avatar').default;
  },
  get Badge() {
    return require('./badge').default;
  },
  get Button() {
    return require('./button').default;
  },
  get Card() {
    return require('./card').default;
  },
  get Carousel() {
    return require('./carousel').default;
  },
  get Chip() {
    return require('./chip').default;
  },
  get Checkbox() {
    return require('./checkbox').default;
  },
  get ColorPalette() {
    return require('./colorPicker/ColorPalette').default;
  },
  get ColorPicker() {
    return require('./colorPicker').default;
  },
  get ColorSwatch() {
    return require('./colorPicker/ColorSwatch').default;
  },
  get ConnectionStatusBar() {
    return require('./connectionStatusBar').default;
  },
  get Dialog() {
    return require('./dialog').default;
  },
  get Drawer() {
    return require('./drawer').default;
  },
  get ExpandableSection() {
    return require('./expandableSection').default;
  },
  get Fader() {
    return require('./fader').default;
  },
  get FeatureHighlight() {
    return require('./featureHighlight').default;
  },
  get FloatingButton() {
    return require('./floatingButton').default;
  },
  get Hint() {
    return require('./hint').default;
  },
  get Image() {
    return require('./image').default;
  },
  get KeyboardAwareScrollView() {
    return require('./KeyboardAwareScrollView').KeyboardAwareScrollView;
  },
  get KeyboardAwareListView() {
    return require('./KeyboardAwareScrollView').KeyboardAwareListView;
  },
  get KeyboardAwareFlatList() {
    return require('./KeyboardAwareScrollView').KeyboardAwareFlatList;
  },
  get BaseInput() {
    return require('./baseInput').default;
  },
  get TextArea() {
    return require('./textArea').default;
  },
  get TextField() {
    return require('./textField').default;
  },
  get MaskedInput() {
    return require('./maskedInput').default;
  },
  get Modal() {
    return require('./modal').default;
  },
  get ListItem() {
    return require('./listItem').default;
  },
  get LoaderScreen() {
    return require('./loaderScreen').default;
  },
  get PageControl() {
    return require('./pageControl').default;
  },
  get PanningProvider() {
    return require('./panningViews/panningProvider').default;
  },
  get PanGestureView() {
    return require('./panningViews/panGestureView').default;
  },
  get PanListenerView() {
    return require('./panningViews/panListenerView').default;
  },
  get PanDismissibleView() {
    return require('./panningViews/panDismissibleView').default;
  },
  get PanResponderView() {
    return require('./panningViews/panResponderView').default;
  },
  get Picker() {
    return require('./picker').default;
  },
  get DateTimePicker() {
    return require('./dateTimePicker').default;
  },
  get ProgressBar() {
    return require('./progressBar').default;
  },
  get StateScreen() {
    return require('./stateScreen').default;
  },
  get Stepper() {
    return require('./stepper').default;
  },
  get TabController() {
    return require('./tabController').default;
  },
  get TabBar() {
    return require('./tabBar').default;
  },
  get TagsInput() { // TODO: Renamed to ChipsInput, to be deleted after migration
    return require('./tagsInput').default;
  },
  get ChipsInput() {
    return require('./ChipsInput').default;
  },
  get RadioButton() {
    return require('./radioButton').RadioButton;
  },
  get RadioGroup() {
    return require('./radioButton').RadioGroup;
  },

  get SharedTransition() {
    return require('./sharedTransition').default;
  },
  get StackAggregator() {
    return require('./stackAggregator').default;
  },
  get Slider() {
    return require('./slider').default;
  },
  get GradientSlider() {
    return require('./slider/GradientSlider').default;
  },
  get ColorSliderGroup() {
    return require('./slider/ColorSliderGroup').default;
  },
  get Switch() {
    return require('./switch').default;
  },
  get Text() {
    return require('./text').default;
  },
  get Toast() {
    return require('./toast').default;
  },
  get TouchableOpacity() {
    return require('./touchableOpacity').default;
  },
  get View() {
    return require('./view').default;
  },
  get Wizard() {
    return require('./wizard').default;
  },
  get WheelPickerDialog() {
    return require('./wheelPickerDialog').default;
  },
  get ScrollBar() {
    return require('./scrollBar').default;
  }
};
