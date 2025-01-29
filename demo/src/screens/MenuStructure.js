export const navigationData = {
  Foundation: {
    title: 'Foundation',
    screens: [
      {title: 'Border Radius', tags: 'corener border radius circle', screen: 'unicorn.style.BorderRadiusesScreen'},
      {title: 'Colors', tags: 'palette rgb hex', screen: 'unicorn.style.ColorsScreen'},
      {title: 'Dark Mode', tags: 'dark mode colors', screen: 'unicorn.style.DarkModeScreen'},
      {title: 'Shadows (iOS)', tags: 'shadow', screen: 'unicorn.style.ShadowsScreen'},
      {title: 'Spacings', tags: 'space margins paddings gutter', screen: 'unicorn.style.SpacingsScreen'},
      {title: 'Typography', tags: 'fonts text', screen: 'unicorn.style.TypographyScreen'},
      {title: 'RTL Support', tags: 'rtl', screen: 'unicorn.style.RTLScreen'}
    ]
  },
  // Wrappers: {
  //   title: 'Wrappers',
  //   screens: [
  //     // {title: 'View', tags: 'view wrapper', screen: 'unicorn.wrappers.ViewScreen'},
  //     // {title: 'Text', tags: 'text wrapper', screen: 'unicorn.wrappers.TextScreen'},
  //     {title: 'TouchableOpacity', tags: 'touchableOpacity wrapper', screen: 'unicorn.wrappers.TouchableOpacityScreen'}
  //   ]
  // },
  Components: {
    title: 'Components',
    screens: [
      {title: 'Text', tags: 'text', screen: 'unicorn.components.TextScreen'},
      {title: 'View', tags: 'view modifiers', screen: 'unicorn.components.ViewScreen'},
      {title: 'Image', tags: 'image cover overlay', screen: 'unicorn.components.ImageScreen'},
      {title: 'Button', tags: 'button cta', screen: 'unicorn.components.ButtonsScreen'},
      {title: 'Action Bar', tags: 'action bar floating bottom', screen: 'unicorn.components.ActionBarScreen'},
      {title: 'Avatars', tags: 'avatar contact', screen: 'unicorn.components.AvatarsScreen'},
      {title: 'Badges', tags: 'badge', screen: 'unicorn.components.BadgesScreen'},
      {title: 'Cards', tags: 'cards feed', screen: 'unicorn.components.CardsScreen'},
      {title: 'Connection Status Bar', tags: 'connection status bar', screen: 'unicorn.components.ConnectionStatusBar'},
      {title: 'Chip', tags: 'chip', screen: 'unicorn.components.ChipScreen'},
      {title: 'ExpandableSection', tags: 'expandable section', screen: 'unicorn.components.ExpandableSectionScreen'},
      {title: 'Icon', tags: 'image icon assets', screen: 'unicorn.components.IconScreen'},
      // {title: 'Overlays', tags: 'overlay image', screen: 'unicorn.components.OverlaysScreen'},
      {title: 'Page Control', tags: 'page', screen: 'unicorn.components.PageControlScreen'},
      {title: 'ProgressBar', tags: 'progress bar animated', screen: 'unicorn.animations.ProgressBarScreen'},
      {title: 'ScrollBar', tags: 'scroll bar gradient', screen: 'unicorn.components.ScrollBarScreen'},
      {
        title: 'Shared Transition',
        tags: 'shared transition element',
        screen: 'unicorn.components.SharedTransitionScreen'
      },
      {title: 'Stack Aggregator', tags: 'stack aggregator', screen: 'unicorn.components.StackAggregatorScreen'},
      {title: 'Marquee', tags: 'sliding text', screen: 'unicorn.components.MarqueeScreen'}
    ]
  },
  Form: {
    title: 'Form',
    screens: [
      {title: 'Checkbox', tags: 'checkbox toggle controls', screen: 'unicorn.components.CheckboxScreen'},
      {title: 'ColorPicker', tags: 'color picker control', screen: 'unicorn.components.ColorPickerScreen'},
      {title: 'Color Swatch', tags: 'color swatch and palette', screen: 'unicorn.components.ColorSwatchScreen'},
      {title: 'TextField', tags: 'text input field form', screen: 'unicorn.components.TextFieldScreen'},
      {title: 'NumberInput', tags: 'number input', screen: 'unicorn.components.NumberInputScreen'},
      {title: 'Picker', tags: 'picker form', screen: 'unicorn.components.PickerScreen'},
      {title: 'DateTimePicker', tags: 'date time picker form', screen: 'unicorn.components.DateTimePickerScreen'},
      {title: 'RadioButton', tags: 'radio button group controls', screen: 'unicorn.components.RadioButtonScreen'},
      {
        title: 'SectionsWheelPicker',
        tags: 'sections wheel picker form',
        screen: 'unicorn.components.SectionsWheelPickerScreen'
      },
      {
        title: 'SegmentedControl',
        tags: 'segmented control switch toggle',
        screen: 'unicorn.components.SegmentedControlScreen'
      },
      {title: 'Stepper', tags: 'stepper form', screen: 'unicorn.components.StepperScreen'},
      {title: 'Slider', tags: 'slider', screen: 'unicorn.components.SliderScreen'},
      {title: 'Slider (Incubator)', tags: 'slider', screen: 'unicorn.components.IncubatorSliderScreen'},
      {title: 'Switch', tags: 'switch toggle', screen: 'unicorn.components.SwitchScreen'},
      {title: 'Masked Inputs', tags: 'text input form mask', screen: 'unicorn.components.MaskedInputScreen'},
      {
        title: 'WheelPicker',
        tags: 'wheel picker spinner',
        screen: 'unicorn.components.WheelPickerScreen'
      }
    ]
  },
  Overlays: {
    title: 'Overlays',
    screens: [
      {title: 'Action Sheet', tags: 'action sheet cross-platform', screen: 'unicorn.components.ActionSheetScreen'},
      {title: 'Dialog', tags: 'dialog modal popup alert', screen: 'unicorn.components.DialogScreen'},
      {title: 'Feature Highlight', tags: 'feature overlay', screen: 'unicorn.components.FeatureHighlightScreen'},
      {title: 'Floating Button', tags: 'floating button', screen: 'unicorn.components.FloatingButtonScreen'},
      {title: 'Hint', tags: 'hints tooltip', screen: 'unicorn.components.HintsScreen'},
      {title: 'Toast', tags: 'toast top bottom snackbar', screen: 'unicorn.components.ToastsScreen'}
    ]
  },
  Lists: {
    title: 'Lists',
    screens: [
      {title: 'Basic List', tags: 'basic list', screen: 'unicorn.lists.BasicListScreen'},
      {title: 'Contacts List', tags: 'list contacts', screen: 'unicorn.lists.ContactsListScreen'},
      {title: 'Conversation List', tags: 'list conversation', screen: 'unicorn.lists.ConversationListScreen'},
      {title: 'Drawer', tags: 'drawer', screen: 'unicorn.components.DrawerScreen'},
      {title: 'SortableList', tags: 'sortable list drag', screen: 'unicorn.components.SortableListScreen'},
      {title: 'HorizontalSortableList', tags: 'sortable horizontal list drag', screen: 'unicorn.components.HorizontalSortableListScreen'},
      {title: 'GridList', tags: 'grid list', screen: 'unicorn.components.GridListScreen'},
      {title: 'SortableGridList', tags: 'sort grid list drag', screen: 'unicorn.components.SortableGridListScreen'}
    ]
  },
  Charts: {
    title: 'Charts',
    screens: [
      {title: 'PieChart', tags: 'pie chart data', screen: 'unicorn.components.PieChartScreen'}
    ]
  },
  LayoutsAndTemplates: {
    title: 'Layouts & Templates',
    screens: [
      {title: 'Carousel', tags: 'carousel', screen: 'unicorn.components.CarouselScreen'},
      {title: 'Carousel (Vertical)', tags: 'carousel', screen: 'unicorn.components.CarouselVerticalScreen'},
      {title: 'Skeleton (Shimmer)', tags: 'skeleton loading', screen: 'unicorn.components.SkeletonViewScreen'},
      {title: 'LoadingScreen', tags: 'loading screen', screen: 'unicorn.screens.LoadingScreen'},
      {title: 'Modal', tags: 'modal topbar screen', screen: 'unicorn.screens.ModalScreen'},
      {title: 'StateScreen', tags: 'empty state screen', screen: 'unicorn.screens.EmptyStateScreen'},
      {title: 'TabController', tags: 'tabbar controller native', screen: 'unicorn.components.TabControllerScreen'},
      {title: 'TabControllerWithStickyHeader', tags: 'tabbar controller native sticky header', screen: 'unicorn.components.TabControllerWithStickyHeaderScreen'},
      {title: 'Timeline', tags: 'timeline', screen: 'unicorn.components.TimelineScreen'},
      {
        title: 'withScrollEnabler',
        tags: 'scroll enabled withScrollEnabler',
        screen: 'unicorn.components.WithScrollEnablerScreen'
      },
      {
        title: 'withScrollReached',
        tags: 'scroll reach start end',
        screen: 'unicorn.components.WithScrollReachedScreen'
      },
      {
        title: 'Fader',
        tags: 'scroll fader',
        screen: 'unicorn.components.FaderScreen'
      },
      {title: 'Wizard', tags: 'wizard', screen: 'unicorn.components.WizardScreen'},
      {title: 'GridView', tags: 'grid view', screen: 'unicorn.components.GridViewScreen'}
    ]
  },
  Native: {
    title: 'Native',
    screens: [
      {
        title: 'KeyboardAwareScrollView',
        tags: 'KeyboardAwareScrollView',
        screen: 'unicorn.components.KeyboardAwareScrollViewScreen'
      },
      {
        title: 'Dynamic Fonts',
        tags: 'dynamic fonts load download',
        screen: 'unicorn.nativeComponents.DynamicFontsScreen'
      },
      {
        title: 'Highlight Overlay',
        tags: 'native overlay',
        screen: 'unicorn.nativeComponents.HighlightOverlayViewScreen'
      },
      {title: 'SafeArea Spacer', tags: 'native safe area', screen: 'unicorn.nativeComponents.SafeAreaSpacerViewScreen'},
      {
        title: 'KeyboardTracking (iOS)',
        tags: 'KeyboardTracking',
        screen: 'unicorn.nativeComponents.KeyboardTrackingViewScreen'
      },
      {
        title: 'KeyboardAccessoryView',
        tags: 'KeyboardInput',
        screen: 'unicorn.nativeComponents.KeyboardAccessoryViewScreen'
      }
    ]
  },
  AnimationsAndGestures: {
    title: 'Animations & Gestures',
    screens: [
      {title: 'Animated Image', tags: 'animated image', screen: 'unicorn.components.AnimatedImageScreen'},
      {title: 'Haptic feedback', tags: 'haptic feedback', screen: 'unicorn.components.HapticScreen'},
      {
        title: 'ProgressiveImage',
        tags: 'progressive image cover overlay',
        screen: 'unicorn.components.ProgressiveImageScreen'
      },
      {title: 'Card Scanner', tags: 'card scanner process', screen: 'unicorn.animations.CardScannerScreen'}
    ]
  },
  Incubator: {
    title: 'Incubator (Experimental)',
    screens: [
      {title: 'Calendar', tags: 'calendar', screen: 'unicorn.components.IncubatorCalendarScreen'},
      {title: 'ChipsInput', tags: 'chips input', screen: 'unicorn.components.ChipsInputScreen'},
      {title: 'Native TouchableOpacity', tags: 'touchable native', screen: 'unicorn.incubator.TouchableOpacityScreen'},
      {title: 'Toast (New)', tags: 'toast', screen: 'unicorn.components.IncubatorToastScreen'},
      {
        title: 'ExpandableOverlay',
        tags: 'text field expandable input picker',
        screen: 'unicorn.components.IncubatorExpandableOverlayScreen'
      },
      {title: 'PanView', tags: 'pan swipe drag', screen: 'unicorn.components.PanViewScreen'}
    ]
  },
  Inspirations: {
    title: 'Inspirations',
    screens: [
      {title: 'Apple Music', tags: 'apple music demo screen', screen: 'unicorn.examples.AppleMusic'},
      {title: 'Pinterest', tags: 'pinterest demo screen', screen: 'unicorn.examples.Pinterest'},
      {title: 'List Actions', tags: 'list actions demo screen', screen: 'unicorn.examples.ListActionsScreen'},
      {title: 'Product Page', tags: 'product page demo screen', screen: 'unicorn.examples.ProductPage'},
      {title: 'Twitter', tags: 'twitter demo screen', screen: 'unicorn.examples.Twitter'}
    ]
  }
};

if (__DEV__) {
  navigationData.Foundation.screens.unshift({title: 'Playground', screen: 'unicorn.PlaygroundScreen'});
}
