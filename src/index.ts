/* ===== General Stuff ===== */
export {default as Assets} from './assets';
export * from './style';
export * from './services';
export * from '../lib/components';
export {
  asBaseComponent,
  Config,
  Constants,
  forwardRef,
  withScrollEnabler,
  WithScrollEnablerProps,
  withScrollReached,
  WithScrollReachedProps,
  UIComponent,
  BaseComponentInjectedProps,
  ForwardRefInjectedProps,
  ContainerModifiers,
  MarginModifiers,
  PaddingModifiers,
  TypographyModifiers,
  ColorsModifiers,
  BackgroundColorModifier
} from './commons/new';
// @ts-expect-error
export {BaseComponent, PureBaseComponent} from './commons';

import * as Incubator from './incubator';
export {
  TextFieldProps,
  FieldContextType,
  ToastProps,
  ToastPresets,
  WheelPickerProps,
  WheelPickerItemProps,
  WheelPickerAlign,
  PanViewProps,
  PanViewDirections,
  PanViewDismissThreshold,
  TransitionViewProps,
  TransitionViewDirection,
  TransitionViewDirectionEnum,
  TransitionViewAnimationType
} from './incubator';
import * as Hooks from './hooks';
import * as Modifiers from './commons/modifiers';
export {default as LogService} from './services/LogService';
export {Incubator, Hooks, Modifiers};

/* ===== Components ===== */
export {default as ActionBar, ActionBarProps} from './components/actionBar';
export {default as ActionSheet} from './components/actionSheet';
// @ts-expect-error
export {default as AnimatedImage} from './components/animatedImage';
// @ts-expect-error
export {default as AnimatedScanner} from './components/animatedScanner';
export {default as Avatar, AvatarProps} from './components/avatar';
export {AvatarHelper} from './helpers';
export {default as Badge, BadgeProps} from './components/badge';
export {default as BaseInput} from './components/baseInput';
export {default as Button, ButtonProps, ButtonSize, ButtonAnimationDirection} from './components/button';
export {default as Card, CardProps, CardSectionProps, CardSelectionOptions} from './components/card';
export {default as Carousel, CarouselProps, PageControlPosition} from './components/carousel';
export {default as Checkbox, CheckboxProps} from './components/checkbox';
export {default as ChipsInput, ChipsInputProps, ChipsInputChipProps} from './components/chipsInput';
export {default as Chip, ChipProps} from './components/chip';
export {default as ColorPicker, ColorPickerProps} from './components/colorPicker';
export {default as ColorPalette, ColorPaletteProps} from './components/colorPalette';
export {default as ColorSliderGroup, ColorSliderGroupProps} from './components/slider/ColorSliderGroup';
export {default as ColorSwatch, ColorSwatchProps} from './components/colorSwatch';
export {default as ConnectionStatusBar, ConnectionStatusBarProps} from './components/connectionStatusBar';
export {default as DateTimePicker, DateTimePickerProps} from './components/dateTimePicker';
export {default as Dialog, DialogProps, DialogDirections, DialogDirectionsEnum} from './components/dialog';
export {default as Drawer, DrawerProps, DrawerItemProps} from './components/drawer';
export {default as ExpandableSection, ExpandableSectionProps} from './components/expandableSection';
export {default as Fader, FaderProps, FaderPosition} from './components/fader';
export {default as FeatureHighlight, FeatureHighlightProps} from './components/featureHighlight';
export {default as FloatingButton, FloatingButtonProps} from './components/floatingButton';
export {default as GradientSlider, GradientSliderProps} from './components/slider/GradientSlider';
export {default as GridListItem, GridListItemProps} from './components/gridListItem';
export {default as GridList, GridListProps} from './components/gridList';
export {default as GridView, GridViewProps} from './components/gridView';
export {default as HapticService, HapticType} from './services/HapticService';
export {default as Hint, HintProps} from './components/hint';
export {default as Icon, IconProps} from './components/icon';
export {default as Image, ImageProps} from './components/image';
// @ts-expect-error
export {default as KeyboardAwareScrollView} from './components/KeyboardAwareScrollView/KeyboardAwareScrollView';
// @ts-expect-error
export {default as KeyboardAwareFlatList} from './components/KeyboardAwareScrollView/KeyboardAwareFlatList';
export {default as ListItem, ListItemProps} from './components/listItem';
export {default as LoaderScreen, LoaderScreenProps} from './components/loaderScreen';
export {default as MaskedInput, MaskedInputProps} from './components/maskedInput';
export {default as Modal, ModalProps, ModalTopBarProps} from './components/modal';
export {default as Overlay, OverlayTypes} from './components/overlay';
export {default as PageControl, PageControlProps} from './components/pageControl';
export {
  default as PanDismissibleView,
  PanDismissibleViewProps,
  DismissibleAnimationProps
} from './components/panningViews/panDismissibleView';
export {default as PanGestureView, PanGestureViewProps} from './components/panningViews/panGestureView';
export {default as PanListenerView, PanListenerViewProps} from './components/panningViews/panListenerView';
export {default as PanningContext} from './components/panningViews/panningContext';
export {
  default as PanningProvider,
  PanningDirections,
  PanLocationProps,
  PanAmountsProps,
  PanDirectionsProps
} from './components/panningViews/panningProvider';
export {default as PanResponderView, PanResponderViewProps} from './components/panningViews/panResponderView';
export {default as asPanViewConsumer} from './components/panningViews/asPanViewConsumer';
export {
  default as Picker,
  PickerProps,
  PickerItemProps,
  PickerValue,
  PickerModes,
  PickerFieldTypes,
  PickerSearchStyle,
  PickerMethods
} from './components/picker';
export {default as ProgressBar, ProgressBarProps} from './components/progressBar';
export {default as RadioButton, RadioButtonProps} from './components/radioButton';
export {default as RadioGroup, RadioGroupProps} from './components/radioGroup';
export {default as ScrollBar, ScrollBarProps} from './components/scrollBar';
export {default as SectionsWheelPicker, SectionsWheelPickerProps} from './components/sectionsWheelPicker';
export {
  default as SegmentedControl,
  SegmentedControlProps,
  SegmentedControlItemProps
} from './components/segmentedControl';
// @ts-expect-error
export {default as SharedTransition} from './components/sharedTransition';
export {default as SkeletonView, SkeletonViewProps} from './components/skeletonView';
export {default as Slider, SliderProps} from './components/slider';
export {default as SortableGridList, SortableGridListProps} from './components/sortableGridList';
export {default as SortableList, SortableListProps} from './components/sortableList';
export {default as StackAggregator, StackAggregatorProps} from './components/stackAggregator';
export {default as StateScreen, StateScreenProps} from './components/stateScreen';
export {default as Stepper, StepperProps} from './components/stepper';
export {default as Switch, SwitchProps} from './components/switch';
export {default as TabController, TabControllerProps, TabControllerItemProps} from './components/tabController';
export {default as TabBar, TabBarProps} from './components/tabBar'; //TODO: remove on V7
export {default as Timeline, TimelineProps, TimelinePointProps, TimelineLineProps, TimelineStateTypes, TimelinePointTypes, TimelineLineTypes} from './components/timeline';
export {default as Text, TextProps} from './components/text';
// @ts-expect-error
export {default as TextArea} from './components/textArea';
export {default as TextField} from './components/textField/TextFieldMigrator';
// @ts-expect-error
export {default as Toast} from './components/toast';
export {default as TouchableOpacity, TouchableOpacityProps} from './components/touchableOpacity';
export {default as View, ViewProps} from './components/view';
export {
  default as Wizard,
  WizardProps,
  WizardStepProps,
  WizardStepStates,
  WizardStepConfig,
  WizardStepsConfig
} from './components/wizard';
// @ts-expect-error
export {default as WheelPickerDialog} from './components/wheelPickerDialog';

/* ===== TestKit ===== */
// export {default as TextTestKit} from './components/text/Text.driver';
// export {default as ImageTestKit} from './components/image/Image.driver';
// export {default as ButtonTestKit} from './components/button/Button.driver';
// export {default as TextFieldTestKit} from './incubator/TextField/TextField.driver';

// export {default as ButtonDriverFactory} from './components/button/Button.driver';
//================ Manual typings (all those exports should be removed one day) ==========
// export {
//   // BaseInput,
//   // TextArea,
//   // TextField,
//   // MaskedInput,
//   // SharedTransition,
//   // Toast,
//   // WheelPickerDialog,
//   // BaseComponent,
//   // PureBaseComponent
// } from '../typings';
