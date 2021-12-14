/**
 * This is a fake index.ts file, for auto-generating the types of all the inline required components.
 * The real index file that will be bundled is "src/index.js".
 * Please use this file for declaring all the exports, so they could be picked up by typescript's complier
 */
export * from './src/style';
export * from './src/services';
export * from './lib/components';
export * as Incubator from './src/incubator';
export * as Hooks from './src/hooks';
export * as Modifiers from './src/commons/modifiers';
export {
  asBaseComponent,
  withScrollEnabler,
  withScrollReached,
  WithScrollEnablerProps,
  WithScrollReachedProps,
  BaseComponentInjectedProps,
  ForwardRefInjectedProps,
  ContainerModifiers,
  MarginModifiers,
  PaddingModifiers,
  TypographyModifiers,
  ColorsModifiers,
  BackgroundColorModifier
} from './src/commons/new';
export {default as ActionBar, ActionBarProps} from './src/components/actionBar';
export {default as Avatar, AvatarProps} from './src/components/avatar';
export {default as Badge, BadgeProps} from './src/components/badge';
export {default as Card, CardProps, CardSectionProps, CardSelectionOptions} from './src/components/card';
export {default as ConnectionStatusBar, ConnectionStatusBarProps} from './src/components/connectionStatusBar';
export {default as Constants} from './src/helpers/Constants';
export {default as GradientSlider, GradientSliderProps} from './src/components/slider/GradientSlider';
export {default as View, ViewProps} from './src/components/view';
export {default as Text, TextProps} from './src/components/text';
export {default as TouchableOpacity, TouchableOpacityProps} from './src/components/touchableOpacity';
export {default as Button, ButtonSize, ButtonProps} from './src/components/button';
export {default as Stepper, StepperProps} from './src/components/stepper';
export {default as Checkbox, CheckboxProps} from './src/components/checkbox';
export {default as ChipsInput, ChipsInputProps, ChipsInputChipProps} from './src/components/chipsInput';
export {default as Chip, ChipProps} from './src/components/chip';
export {default as ColorPicker, ColorPickerProps} from './src/components/colorPicker';
export {default as ColorPalette, ColorPaletteProps} from './src/components/colorPicker/ColorPalette';
export {default as ColorSwatch, ColorSwatchProps} from './src/components/colorPicker/ColorSwatch';
export {default as DateTimePicker, DateTimePickerProps} from './src/components/dateTimePicker';
export {default as Drawer, DrawerProps, DrawerItemProps} from './src/components/drawer';
export {default as ProgressBar, ProgressBarProps} from './src/components/progressBar';
export {default as FeatureHighlight, FeatureHighlightProps} from './src/components/featureHighlight';
export {default as FloatingButton, FloatingButtonProps} from './src/components/floatingButton';
export {default as GridListItem, GridListItemProps} from './src/components/gridListItem';
export {default as GridView, GridViewProps} from './src/components/gridView';
export {default as Hint, HintProps} from './src/components/hint';
export {default as Icon, IconProps} from './src/components/icon';
export {default as Image, ImageProps} from './src/components/image';
export {default as Overlay, OverlayTypes} from './src/components/overlay';
export {default as RadioButton, RadioButtonProps} from './src/components/radioButton';
export {default as RadioGroup, RadioGroupProps} from './src/components/radioGroup';
export {default as SectionsWheelPicker, SectionsWheelPickerProps} from './src/components/sectionsWheelPicker';
export {default as SegmentedControl, SegmentedControlProps, SegmentedControlItemProps} from './src/components/segmentedControl';
export {default as Slider, SliderProps} from './src/components/slider';
export {default as Switch, SwitchProps} from './src/components/switch';
export {default as TabController, TabControllerProps, TabControllerItemProps} from './src/components/tabController';
export {default as TabBar, TabBarProps} from './src/components/TabBar';
export {default as ScrollBar, ScrollBarProps} from './src/components/ScrollBar';
export {default as StackAggregator, StackAggregatorProps} from './src/components/stackAggregator';
export {default as Fader, FaderProps, FaderPosition} from './src/components/fader';
export {default as ExpandableSection, ExpandableSectionProps} from './src/components/expandableSection';
export {default as Modal, ModalProps, ModalTopBarProps} from './src/components/modal';
export {default as PanGestureView, PanGestureViewProps} from './src/components/panningViews/panGestureView';
export {default as PanningContext} from './src/components/panningViews/panningContext';
export {default as asPanViewConsumer} from './src/components/panningViews/asPanViewConsumer';
export {default as SkeletonView, SkeletonViewProps} from './src/components/skeletonView';
export {
  default as PanningProvider,
  PanningDirections,
  PanLocationProps,
  PanAmountsProps,
  PanDirectionsProps
} from './src/components/panningViews/panningProvider';
export {default as PanListenerView, PanListenerViewProps} from './src/components/panningViews/panListenerView';
export {default as PanResponderView, PanResponderViewProps} from './src/components/panningViews/panResponderView';
export {default as PanDismissibleView, PanDismissibleViewProps, DismissibleAnimationProps} from './src/components/panningViews/panDismissibleView';
export {default as Dialog, DialogProps} from './src/components/dialog';
export {default as PageControl, PageControlProps} from './src/components/pageControl';
export {default as Carousel, CarouselProps, PageControlPosition} from './src/components/carousel';
export {default as ActionSheet} from './src/components/actionSheet';
export {default as Wizard, WizardProps, WizardStepProps, WizardStepStates, WizardStepConfig, WizardStepsConfig} from './src/components/wizard';
export {default as ListItem, ListItemProps} from './src/components/listItem';
export {default as StateScreen, StateScreenProps} from './src/components/stateScreen';
export {default as LoaderScreen, LoaderScreenProps} from './src/components/loaderScreen';

/* All components with manual typings */
export {
  BaseInput,
  TextArea,
  MaskedInput,
  ColorSliderGroup,
  SharedTransition,
  Toast,
  WheelPickerDialog,
  Assets,
  BaseComponent,
  PureBaseComponent,
  UIComponent,
  forwardRef,
  AvatarHelper,
  Picker,
  PickerItemValue,
  PickerProps
} from '../typings';

/* All components that are missing either manual or auto generated typings */
export const AnimatedImage;
export const AnimatedScanner;
export const TextField;
