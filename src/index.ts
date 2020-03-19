
import * as Style from './style';
import {
  ActionBar, ActionSheet, Avatar, Badge, Button, Card, Carousel, ConnectionStatusBar, Dialog, Drawer, FloatingButton,
  FeatureHighlight, Hint, Image, BaseInput, TextArea, TextField, MaskedInput, ListItem, PageControl, PanningProvider,
  PanGestureView, PanListenerView, PanDismissibleView, PanResponderView, Picker, ProgressBar, Slider, GradientSlider,
  ColorSliderGroup, Stepper, TabBar, TagsInput, RadioButton, RadioGroup, SharedTransition, StackAggregator, Text, Toast,
  View, WheelPickerDialog, Assets, BaseComponent, PureBaseComponent, UIComponent, forwardRef, AvatarHelper, Constants,
  DocsGenerator, LogService, LoaderScreen, Modal, StateScreen, WheelPicker, Incubator
} from '../typings';
import ColorPicker from '../typings/components/ColorPicker';
import TouchableOpacity from '../typings/components/TouchableOpacity';

export default {
  // Components
  get ActionBar(): ActionBar {
    return require('./components').ActionBar;
  },
  get ActionSheet(): ActionSheet {
    return require('./components').ActionSheet;
  },
  get AnimatedImage(): any {
    return require('./components').AnimatedImage;
  },
  get AnimatedScanner(): any {
    return require('./components').AnimatedScanner;
  },
  get Avatar(): Avatar {
    return require('./components').Avatar;
  },
  get Badge(): Badge {
    return require('./components').Badge;
  },
  get Button(): Button {
    return require('./components').Button;
  },
  get Card(): Card {
    return require('./components').Card;
  },
  get Carousel(): Carousel {
    return require('./components').Carousel;
  },
  get Checkbox(): any {
    return require('./components').Checkbox;
  },
  get ColorPalette(): any {
    return require('./components').ColorPalette;
  },
  get ColorPicker(): ColorPicker {
    return require('./components').ColorPicker;
  },
  get ColorSwatch(): any {
    return require('./components').ColorSwatch;
  },
  get ConnectionStatusBar(): ConnectionStatusBar {
    return require('./components').ConnectionStatusBar;
  },
  get Dialog(): Dialog {
    return require('./components').Dialog;
  },
  get Drawer(): Drawer {
    return require('./components').Drawer;
  },
  get FloatingButton(): FloatingButton {
    return require('./components').FloatingButton;
  },
  get FeatureHighlight(): FeatureHighlight {
    return require('./components').FeatureHighlight;
  },
  get Hint(): Hint {
    return require('./components').Hint;
  },
  get Image(): Image {
    return require('./components').Image;
  },
  get KeyboardAwareScrollView(): any {
    return require('./components').KeyboardAwareScrollView;
  },
  get KeyboardAwareListView(): any {
    return require('./components').KeyboardAwareListView;
  },
  get BaseInput(): BaseInput {
    return require('./components').BaseInput;
  },
  get TextArea(): TextArea {
    return require('./components').TextArea;
  },
  get TextField(): TextField {
    return require('./components').TextField;
  },
  get MaskedInput(): MaskedInput {
    return require('./components').MaskedInput;
  },
  get ListItem(): ListItem {
    return require('./components').ListItem;
  },
  get PageControl(): PageControl {
    return require('./components').PageControl;
  },
  get PanningProvider(): PanningProvider {
    return require('./components').PanningProvider;
  },
  get PanGestureView(): PanGestureView {
    return require('./components').PanGestureView;
  },
  get PanListenerView(): PanListenerView {
    return require('./components').PanListenerView;
  },
  get PanDismissibleView(): PanDismissibleView {
    return require('./components').PanDismissibleView;
  },
  get PanResponderView(): PanResponderView {
    return require('./components').PanResponderView;
  },
  get Picker(): Picker {
    return require('./components').Picker;
  },
  get DateTimePicker(): any {
    return require('./components').DateTimePicker;
  },
  get ProgressBar(): ProgressBar {
    return require('./components').ProgressBar;
  },
  get Slider(): Slider {
    return require('./components').Slider;
  },
  get GradientSlider(): GradientSlider {
    return require('./components').GradientSlider;
  },
  get ColorSliderGroup(): ColorSliderGroup {
    return require('./components').ColorSliderGroup;
  },
  get Stepper(): Stepper {
    return require('./components').Stepper;
  },
  get TabController(): any {
    return require('./components').TabController;
  },
  get TabBar(): TabBar {
    return require('./components').TabBar;
  },
  get TagsInput(): TagsInput {
    return require('./components').TagsInput;
  },
  get RadioButton(): RadioButton {
    return require('./components').RadioButton;
  },
  get RadioGroup(): RadioGroup {
    return require('./components').RadioGroup;
  },
  get ScrollBar(): any {
    return require('./components').ScrollBar;
  },
  get SharedTransition(): typeof SharedTransition {
    return require('./components').SharedTransition;
  },
  get StackAggregator(): StackAggregator {
    return require('./components').StackAggregator;
  },
  get Switch(): any {
    return require('./components').Switch;
  },
  get Text(): Text {
    return require('./components').Text;
  },
  get Toast(): Toast {
    return require('./components').Toast;
  },
  get TouchableOpacity(): TouchableOpacity {
    return require('./components').TouchableOpacity;
  },
  get View(): View {
    return require('./components').View;
  },
  get Wizard(): any {
    return require('./components').Wizard;
  },
  get WheelPickerDialog(): WheelPickerDialog {
    return require('./components').WheelPickerDialog;
  },

  // Assets
  get Assets(): typeof Assets {
    return require('./assets').default;
  },

  // Commons
  get BaseComponent(): BaseComponent {
    return require('./commons').BaseComponent;
  },
  get PureBaseComponent(): PureBaseComponent {
    return require('./commons').PureBaseComponent;
  },
  get SelectableComponent(): any {
    return require('./commons').SelectableComponent;
  },
  get UIComponent(): UIComponent {
    return require('./commons').UIComponent;
  },
  get forwardRef(): typeof forwardRef {
    return require('./commons').forwardRef;
  },

  // Helpers
  get AvatarHelper(): typeof AvatarHelper {
    return require('./helpers').AvatarHelper;
  },
  get Constants(): typeof Constants {
    return require('./helpers').Constants;
  },
  get DocsGenerator(): typeof DocsGenerator {
    return require('./helpers').DocsGenerator;
  },

  // Services
  get LogService(): typeof LogService {
    return require('./services').LogService;
  },

  // ScreenComponents
  get LoaderScreen(): LoaderScreen {
    return require('./screensComponents').LoaderScreen;
  },
  get Modal(): Modal {
    return require('./screensComponents').Modal;
  },
  get StateScreen(): StateScreen {
    return require('./screensComponents').StateScreen;
  },

  // NativeComponents
  get HighlighterOverlayView(): any {
    return require('./nativeComponents').HighlighterOverlayView;
  },
  get SafeAreaSpacerView(): any {
    return require('./nativeComponents').SafeAreaSpacerView;
  },
  get WheelPicker(): WheelPicker {
    return require('./nativeComponents').WheelPicker;
  },
  get SafeAreaInsetsManager(): any {
    return require('./nativeComponents').SafeAreaInsetsManager;
  },
  get Keyboard(): any {
    return require('./nativeComponents').Keyboard;
  },
  // Style
  Colors: Style.Colors,
  Spacings: Style.Spacings,
  Shadows: Style.Shadows,
  ThemeManager: Style.ThemeManager,
  AnimatableManager: Style.AnimatableManager,
  ColorName: Style.ColorName,
  Components: Style.Components,
  ComponentsColors: Style.ComponentsColors,
  BorderRadiuses: Style.BorderRadiuses,
  Typography: Style.Typography,
  // Incubator
  get Incubator(): typeof Incubator {
    return require('./incubator');
  }
};
