/**
 * This is a fake index.ts file, for auto-generating the types of all the inline required components.
 * The real index file that will be bundled is "src/index.js".
 * Please use this file for declaring all the exports, so they could be picked up by typescript's complier
 */

export * from './style';
export * from './services';
export * as Incubator from './incubator';
export {default as Avatar, AvatarPropTypes} from './components/avatar';
export {default as Badge, BadgeProps} from './components/badge';
export {default as Card, CardPropTypes, CardSectionProps} from './components/card';
export {default as View, ViewPropTypes} from './components/view';
export {default as Text, TextPropTypes} from './components/text';
export {default as TouchableOpacity, TouchableOpacityProps} from './components/touchableOpacity';
export {default as Button, ButtonPropTypes} from './components/button';
export {default as Checkbox, CheckboxPropTypes} from './components/checkbox';
export {default as Chip, ChipPropTypes} from './components/chip';
export {default as FloatingButton, FloatingButtonProps} from './components/floatingButton';
export {default as Image, ImageProps} from './components/image';
export {default as Overlay, OverlayTypes} from './components/overlay';
export {default as RadioButton, RadioButtonPropTypes} from './components/radioButton/RadioButton';
export {default as RadioGroup, RadioGroupPropTypes} from './components/radioButton/RadioGroup';
export {default as TabBar} from './components/TabBar';
export {default as Fader, FaderProps, FaderPosition} from './components/fader';
export {default as ExpandableSection, ExpandableSectionProps} from './components/expandableSection';
export {default as Modal, ModalProps, ModalTopBarProps} from './components/modal';
export {default as PanGestureView, PanGestureViewProps} from './components/panningViews/panGestureView';
export {default as PanningContext} from './components/panningViews/panningContext';
export {default as asPanViewConsumer} from './components/panningViews/asPanViewConsumer';
export {
  default as PanningProvider,
  PanningDirections,
  PanLocationProps,
  PanAmountsProps,
  PanDirectionsProps,
  PanningProviderDirection
} from './components/panningViews/panningProvider';
export {default as PanListenerView, PanListenerViewPropTypes} from './components/panningViews/panListenerView';
export {default as PanResponderView, PanResponderViewPropTypes} from './components/panningViews/panResponderView';
export {default as PanDismissibleView, PanDismissibleViewPropTypes, DismissibleAnimationPropTypes} from './components/panningViews/panDismissibleView';
export {default as Dialog, DialogProps} from './components/dialog';

//================ Manual typings (all those exports should be removed one day) ==========
export {
  ActionBar, ActionSheet, Carousel, ConnectionStatusBar, ChipsInput, Drawer,
  FeatureHighlight, Hint, BaseInput, TextArea, TextField, MaskedInput, ListItem, PageControl,
  Picker, PickerProps, ProgressBar, Slider,
  GradientSlider, ColorSliderGroup, Stepper, TagsInput, SharedTransition, StackAggregator, Toast,
  WheelPickerDialog, Assets, BaseComponent, PureBaseComponent, UIComponent, forwardRef, AvatarHelper, Constants,
  LogService, LoaderScreen, StateScreen, WheelPicker, WheelPickerProps, ColorPicker
} from '../typings';
