/**
 * This is a fake index.ts file, for auto-generating the types of all the inline required components.
 * The real index file that will be bundled is "src/index.js". 
 * Please use this file for declaring all the exports, so they could be picked up by typescript's complier
 */

export * from './style';
export {default as View} from './components/view';
export {default as Text} from './components/text';
export {default as TouchableOpacity} from './components/touchableOpacity';
export {default as Button} from './components/button';
export {default as Image} from './components/image';
export {default as Overlay} from './components/overlay';

//================ Manual typings (all those exports should be removed one day) ==========
export {
  ActionBar, ActionSheet, Avatar, Badge, Card, Carousel, ConnectionStatusBar, Dialog, Drawer, FloatingButton,
  FeatureHighlight, Hint, BaseInput, TextArea, TextField, MaskedInput, ListItem, PageControl, PanningProvider,
  PanGestureView, PanListenerView, PanDismissibleView, PanResponderView, Picker, ProgressBar, Slider, GradientSlider,
  ColorSliderGroup, Stepper, TabBar, TagsInput, RadioButton, RadioGroup, SharedTransition, StackAggregator, Toast,
  WheelPickerDialog, Assets, BaseComponent, PureBaseComponent, UIComponent, forwardRef, AvatarHelper, Constants,
  DocsGenerator, LogService, LoaderScreen, Modal, StateScreen, WheelPicker, Incubator, ColorPicker
} from '../typings';
