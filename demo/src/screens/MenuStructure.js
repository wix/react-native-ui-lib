export const navigationData = {
  Foundation: {
    title: 'Foundation',
    screens: [
      {title: 'Border Radius', tags: 'corener border radius circle', screen: 'unicorn.style.BorderRadiusesScreen'},
      {title: 'Colors', tags: 'palette rgb hex', screen: 'unicorn.style.ColorsScreen'},
      {title: 'Shadows (iOS)', tags: 'shadow', screen: 'unicorn.style.ShadowsScreen'},
      {title: 'Spacings', tags: 'space margins paddings gutter', screen: 'unicorn.style.SpacingsScreen'},
      {title: 'Typography', tags: 'fonts text', screen: 'unicorn.style.TypographyScreen'}
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
      {title: ''},
      {title: 'Action Bar', tags: 'action bar floating bottom', screen: 'unicorn.components.ActionBarScreen'},
      {title: 'Avatars', tags: 'avatar contact', screen: 'unicorn.components.AvatarsScreen'},
      {title: 'Badges', tags: 'badge', screen: 'unicorn.components.BadgesScreen'},
      {title: 'Cards', tags: 'cards feed', screen: 'unicorn.components.CardsScreen'},
      {title: 'Connection Status Bar', tags: 'connection status bar', screen: 'unicorn.components.ConnectionStatusBar'},
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
      {title: 'Wheel Picker Dialog', tags: 'wheel picker dialog', screen: 'unicorn.components.WheelPickerDialogScreen'}
    ]
  },
  Form: {
    title: 'Form',
    screens: [
      {title: 'Checkbox', tags: 'checkbox toggle controls', screen: 'unicorn.components.CheckboxScreen'},
      {title: 'Color Picker', tags: 'color picker control', screen: 'unicorn.components.ColorPickerScreen'},
      {title: 'Color Swatch', tags: 'color swatch and palette', screen: 'unicorn.components.ColorSwatchScreen'},
      {title: 'TextField', tags: 'text input field form', screen: 'unicorn.components.TextFieldScreen'},
      {title: 'Picker', tags: 'picker form', screen: 'unicorn.components.PickerScreen'},
      {title: 'DateTimePicker', tags: 'date time picker form', screen: 'unicorn.components.DateTimePickerScreen'},
      {title: 'RadioButton', tags: 'radio button group controls', screen: 'unicorn.components.RadioButtonScreen'},
      {title: 'Stepper', tags: 'stepper form', screen: 'unicorn.components.StepperScreen'},
      {title: 'Slider', tags: 'slider', screen: 'unicorn.components.SliderScreen'},
      {title: 'Switch', tags: 'switch toggle', screen: 'unicorn.components.SwitchScreen'},
      {title: 'TagsInput', tags: 'tags input form', screen: 'unicorn.components.TagsInputScreen'},
      {title: 'Masked Inputs', tags: 'text input form mask', screen: 'unicorn.components.MaskedInputScreen'}
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
      {title: 'Drawer', tags: 'drawer', screen: 'unicorn.components.DrawerScreen'}
    ]
  },
  LayoutsAndTemplates: {
    title: 'Layouts & Templates',
    screens: [
      {title: 'Carousel', tags: 'carousel', screen: 'unicorn.components.CarouselScreen'},
      {title: 'LoadingScreen', tags: 'loading screen', screen: 'unicorn.screens.LoadingScreen'},
      {title: 'Modal', tags: 'modal topbar screen', screen: 'unicorn.screens.ModalScreen'},
      {title: 'StateScreen', tags: 'empty state screen', screen: 'unicorn.screens.EmptyStateScreen'},
      {title: 'TabController', tags: 'tabbar controller native', screen: 'unicorn.components.TabControllerScreen'},
      {title: 'TabBar', tags: 'tab bar', screen: 'unicorn.components.TabBarScreen'},
      {
        title: 'withScrollEnabler',
        tags: 'scroll enabled withScrollEnabler',
        screen: 'unicorn.components.WithScrollEnablerScreen'
      },
      {title: 'Wizard', tags: 'wizard', screen: 'unicorn.components.WizardScreen'}
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
        title: 'Highlight Overlay',
        tags: 'native overlay',
        screen: 'unicorn.nativeComponents.HighlightOverlayViewScreen'
      },
      {title: 'Wheel Picker', tags: 'wheel picker', screen: 'unicorn.nativeComponents.WheelPickerViewScreen'},
      {title: 'SafeArea Spacer', tags: 'native safe area', screen: 'unicorn.nativeComponents.SafeAreaSpacerViewScreen'},
      {
        title: 'KeyboardTracking (iOS)',
        tags: 'KeyboardTracking',
        screen: 'unicorn.nativeComponents.KeyboardTrackingViewScreen'
      },
      {title: 'KeyboardInput', tags: 'KeyboardInput', screen: 'unicorn.nativeComponents.KeyboardInputViewScreen'}
    ]
  },
  AnimationsAndGestures: {
    title: 'Animations & Gestures',
    screens: [
      {title: 'Animated Image', tags: 'animated image', screen: 'unicorn.components.AnimatedImageScreen'},
      {title: 'ProgressiveImage', tags: 'progressive image cover overlay', screen: 'unicorn.components.ProgressiveImageScreen'},
      {title: 'List Animations', tags: 'animated card', screen: 'unicorn.animations.ListAnimationsScreen'},
      {title: 'Card Animations', tags: 'animated card', screen: 'unicorn.animations.CardAnimationsScreen'},
      {title: 'Card Scanner', tags: 'card scanner process', screen: 'unicorn.animations.CardScannerScreen'},
      {title: 'Pan Dismissible', tags: 'pan swipe drag dismiss', screen: 'unicorn.components.PanDismissibleScreen'},
      {title: 'Pan Listener', tags: 'pan swipe drag listener', screen: 'unicorn.components.PanListenerScreen'},
      {title: 'Pan Responder', tags: 'pan swipe drag responder', screen: 'unicorn.components.PanResponderScreen'}
    ]
  },
  Incubator: {
    title: 'Incubator (Experimental)',
    screens: [
      {title: 'Native TouchableOpacity', tags: 'touchable native', screen: 'unicorn.incubator.TouchableOpacityScreen'}
    ]
  },
  Inspirations: {
    title: 'Inspirations',
    screens: [
      {title: 'Apple Music', tags: 'apple music demo screen', screen: 'unicorn.examples.AppleMusic'},
      {title: 'Pinterest', tags: 'pinterest demo screen', screen: 'unicorn.examples.Pinterest'},
      {title: 'List Actions', tags: 'list actions demo screen', screen: 'unicorn.examples.ListActionsScreen'}
    ]
  }
};
