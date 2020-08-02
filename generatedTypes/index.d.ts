/**
 * This is a fake index.ts file, for auto-generating the types of all the inline required components.
 * The real index file that will be bundled is "src/index.js".
 * Please use this file for declaring all the exports, so they could be picked up by typescript's complier
 */
export * from './style';
export {asBaseComponent, withScrollEnabler, withScrollReached, WithScrollEnablerProps, WithScrollReachedProps} from './commons/new';
export {default as Avatar, AvatarPropTypes} from './components/avatar';
export {default as Card, CardPropTypes, CardSectionProps} from './components/card';
export {default as View, ViewPropTypes} from './components/view';
export {default as Text, TextPropTypes} from './components/text';
export {default as TouchableOpacity, TouchableOpacityProps} from './components/touchableOpacity';
export {default as Button, ButtonPropTypes} from './components/button';
export {default as Checkbox, CheckboxPropTypes} from './components/checkbox';
export {default as FloatingButton, FloatingButtonProps} from './components/floatingButton';
export {default as Image, ImageProps} from './components/image';
export {default as Overlay, OverlayTypes} from './components/overlay';
export {default as RadioButton, RadioButtonPropTypes} from './components/radioButton/RadioButton';
export {default as RadioGroup, RadioGroupPropTypes} from './components/radioButton/RadioGroup';
export {default as TabBar} from './components/TabBar';
export {default as Fader, FaderProps} from './components/fader';

/* All components with manual typings */
export {
  ActionBar,
  ActionSheet,
  Badge,
  BadgeProps,
  Card,
  Carousel,
  ConnectionStatusBar,
  Dialog,
  Drawer,
  FeatureHighlight,
  Hint,
  BaseInput,
  TextArea,
  MaskedInput,
  ListItem,
  PageControl,
  PanningProvider,
  PanGestureView,
  PanListenerView,
  PanDismissibleView,
  PanResponderView,
  ProgressBar,
  Slider,
  GradientSlider,
  ColorSliderGroup,
  Stepper,
  TagsInput,
  SharedTransition,
  StackAggregator,
  Toast,
  WheelPickerDialog,
  Assets,
  BaseComponent,
  PureBaseComponent,
  UIComponent,
  forwardRef,
  AvatarHelper,
  Constants,
  LogService,
  LoaderScreen,
  Modal,
  StateScreen,
  WheelPicker,
  WheelPickerProps,
  Incubator,
  ColorPicker,
  Picker,
  PickerProps
} from '../typings';

/* All components that are missing either manual or auto generated typings */
export const AnimatedImage;
export const AnimatedScanner;
export const ColorPalette;
export const ColorSwatch;
export const DateTimePicker;
export const HighlighterOverlayView;
export const Keyboard;
export const KeyboardAwareListView;
export const KeyboardAwareScrollView;
export const SafeAreaInsetsManager;
export const SafeAreaSpacerView;
export const ScrollBar;
export const SelectableComponent;
export const Switch;
export const TabController;
export const TextField;
export const Wizard;
