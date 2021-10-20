/**
 * This is a fake index.ts file, for auto-generating the types of all the inline required components.
 * The real index file that will be bundled is "src/index.js".
 * Please use this file for declaring all the exports, so they could be picked up by typescript's complier
 */

export * from './style';
export * from './services';
export * from '../lib/components';
export {
  BaseComponentInjectedProps,
  ForwardRefInjectedProps,
  ContainerModifiers,
  MarginModifiers,
  PaddingModifiers,
  TypographyModifiers,
  ColorsModifiers,
  BackgroundColorModifier
} from './commons/new';
export * as Incubator from './incubator';
export * as Hooks from './hooks';
export * as Modifiers from './commons/modifiers';
export {default as ActionBar, ActionBarProps} from './components/actionBar';
export {default as Avatar, AvatarProps} from './components/avatar';
export {AvatarHelper} from './helpers';
export {default as Badge, BadgeProps} from './components/badge';
export {default as Card, CardProps, CardSectionProps} from './components/card';
export {default as ConnectionStatusBar, ConnectionStatusBarProps} from './components/connectionStatusBar';
export {default as Constants} from './helpers/Constants';
export {default as HapticService, HapticType} from './services/HapticService';
export {default as View, ViewProps} from './components/view';
export {default as Text, TextProps} from './components/text';
export {default as TouchableOpacity, TouchableOpacityProps} from './components/touchableOpacity';
export {default as Button, ButtonProps, ButtonSize, ButtonAnimationDirection} from './components/button';
export {default as Checkbox, CheckboxProps} from './components/checkbox';
export {default as Stepper, StepperProps} from './components/stepper';
export {default as ChipsInput, ChipsInputProps} from './components/ChipsInput';
export {default as Chip, ChipProps} from './components/chip';
export {default as ColorPicker, ColorPickerProps} from './components/colorPicker';
export {default as ColorPalette, ColorPaletteProps} from './components/colorPicker/ColorPalette';
export {default as ColorSwatch, ColorSwatchProps} from './components/colorPicker/ColorSwatch';
export {default as FloatingButton, FloatingButtonProps} from './components/floatingButton';
export {default as GridListItem, GridListItemProps} from './components/gridListItem';
export {default as GridView, GridViewProps} from './components/gridView';
export {default as Icon, IconProps} from './components/icon';
export {default as Image, ImageProps} from './components/image';
export {default as Overlay, OverlayTypes} from './components/overlay';
export {default as RadioButton, RadioButtonProps} from './components/radioButton';
export {default as RadioGroup, RadioGroupProps} from './components/radioGroup';
export {default as SectionsWheelPicker, SectionsWheelPickerProps} from './components/sectionsWheelPicker';
export {default as SegmentedControl, SegmentedControlProps, SegmentedControlItemProps} from './components/segmentedControl';
export {default as Switch, SwitchProps} from './components/switch';
export {default as TabController, TabControllerProps, TabControllerItemProps} from './components/tabController';
export {default as TabBar, TabBarProps} from './components/TabBar'; //TODO: remove on V7
export {default as ScrollBar, ScrollBarProps} from './components/ScrollBar';
export {default as Fader, FaderProps, FaderPosition} from './components/fader';
export {default as ExpandableSection, ExpandableSectionProps} from './components/expandableSection';
export {default as Modal, ModalProps, ModalTopBarProps} from './components/modal';
export {default as PanGestureView, PanGestureViewProps} from './components/panningViews/panGestureView';
export {default as PanningContext} from './components/panningViews/panningContext';
export {default as asPanViewConsumer} from './components/panningViews/asPanViewConsumer';
export {default as ProgressBar, ProgressBarProps} from './components/progressBar';
export {default as FeatureHighlight, FeatureHighlightProps} from './components/featureHighlight';
export {default as ActionSheet} from './components/actionSheet';
export {default as Wizard, WizardProps, WizardStepProps, WizardStepStates, WizardStepConfig, WizardStepsConfig} from './components/wizard';
export {default as StackAggregator, StackAggregatorProps} from './components/stackAggregator';
export {default as SkeletonView, SkeletonViewProps} from './components/skeletonView';
export {
  default as PanningProvider,
  PanningDirections,
  PanLocationProps,
  PanAmountsProps,
  PanDirectionsProps
} from './components/panningViews/panningProvider';
export {default as PanListenerView, PanListenerViewProps} from './components/panningViews/panListenerView';
export {default as PanResponderView, PanResponderViewProps} from './components/panningViews/panResponderView';
export {default as PanDismissibleView, PanDismissibleViewProps, DismissibleAnimationProps} from './components/panningViews/panDismissibleView';
export {default as Dialog, DialogProps} from './components/dialog';
export {default as PageControl, PageControlProps} from './components/pageControl';
export {default as Carousel, CarouselProps, PageControlPosition} from './components/carousel';
export {default as Hint, HintProps} from './components/hint';
export {default as Slider, SliderProps} from './components/slider';
export {default as GradientSlider, GradientSliderProps} from './components/slider/GradientSlider';
export {default as ColorSliderGroup, ColorSliderGroupProps} from './components/slider/ColorSliderGroup';
export {default as LogService} from './services/LogService';
export {default as ListItem, ListItemProps} from './components/listItem';
export {default as StateScreen, StateScreenProps} from './components/stateScreen';
export {default as LoaderScreen, LoaderScreenProps} from './components/loaderScreen';


//================ Manual typings (all those exports should be removed one day) ==========
export {
  BaseInput, 
  TextArea, 
  TextField, 
  MaskedInput, 
  Picker,
  PickerProps, 
  SharedTransition, 
  Toast, 
  WheelPickerDialog, 
  Assets,
  BaseComponent, 
  PureBaseComponent, 
  UIComponent, 
  forwardRef
} from '../typings';
