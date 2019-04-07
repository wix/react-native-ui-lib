export const navigationData = {
  Presets: {
    title: 'Presets',
    screens: [
      {title: 'Border Radius', tags: 'corener border radius circle', screen: 'unicorn.style.BorderRadiusesScreen'},
      {title: 'Colors', tags: 'palette rgb hex', screen: 'unicorn.style.ColorsScreen'},
      {title: 'Shadows (iOS)', tags: 'shadow', screen: 'unicorn.style.ShadowsScreen'},
      {title: 'Spacings', tags: 'space margins paddings gutter', screen: 'unicorn.style.SpacingsScreen'},
      {title: 'Typography', tags: 'fonts text', screen: 'unicorn.style.TypographyScreen'},
    ],
  },
  Wrappers: {
    title: 'Wrappers',
    screens: [
      // {title: 'View', tags: 'view wrapper', screen: 'unicorn.wrappers.ViewScreen'},
      // {title: 'Text', tags: 'text wrapper', screen: 'unicorn.wrappers.TextScreen'},
      {title: 'TouchableOpacity', tags: 'touchableOpacity wrapper', screen: 'unicorn.wrappers.TouchableOpacityScreen'},
    ],
  },
  Components: {
    title: 'Components',
    screens: [
      {title: 'Action Bar', tags: 'action bar floating bottom', screen: 'unicorn.components.ActionBarScreen'},
      {title: 'Action Sheet', tags: 'action sheet cross-platform', screen: 'unicorn.components.ActionSheetScreen'},
      {title: 'Avatars', tags: 'avatar contact', screen: 'unicorn.components.AvatarsScreen'},
      {title: 'Badges', tags: 'badge', screen: 'unicorn.components.BadgesScreen'},
      {title: 'Buttons', tags: 'button cta', screen: 'unicorn.components.ButtonsScreen'},
      {title: 'Cards', tags: 'cards feed', screen: 'unicorn.components.CardsScreen'},
      {title: 'Carousel', tags: 'carousel', screen: 'unicorn.components.CarouselScreen'},
      {title: 'Connection Status Bar', tags: 'connection status bar', screen: 'unicorn.components.ConnectionStatusBar'},
      {title: 'Dialog', tags: 'dialog modal popup alert', screen: 'unicorn.components.DialogScreen'},
      {title: 'Feature Highlight', tags: 'feature overlay', screen: 'unicorn.components.FeatureHighlightScreen'},
      {title: 'Hint', tags: 'hints tooltip', screen: 'unicorn.components.HintsScreen'},
      {title: 'Page Control', tags: 'page', screen: 'unicorn.components.PageControlScreen'},
      {title: 'Shared Transition', tags: 'shared transition element', screen: 'unicorn.components.SharedTransitionScreen'},
      {title: 'TabBar', tags: 'tab bar', screen: 'unicorn.components.TabBarScreen'},
      {title: 'Toast', tags: 'toast top bottom snackbar', screen: 'unicorn.components.ToastsScreen'},
      {title: 'Wheel Picker Dialog', tags: 'wheel picker dialog', screen: 'unicorn.components.WheelPickerDialogScreen'},
    ],
  },
  Form: {
    title: 'Form',
    screens: [
      {title: 'Checkbox', tags: 'checkbox toggle controls', screen: 'unicorn.components.CheckboxScreen'},
      {title: 'TextField', tags: 'text input field form', screen: 'unicorn.components.InputsScreen'},
      {title: 'Picker', tags: 'picker form', screen: 'unicorn.components.PickerScreen'},
      {title: 'RadioButton', tags: 'radio button group controls', screen: 'unicorn.components.RadioButtonScreen'},
      {title: 'Stepper', tags: 'stepper form', screen: 'unicorn.components.StepperScreen'},
      {title: 'Switch', tags: 'switch toggle', screen: 'unicorn.components.SwitchScreen'},
      {title: 'TagsInput', tags: 'tags input form', screen: 'unicorn.components.TagsInputScreen'},
      {title: 'Masked Inputs', tags: 'text input form mask', screen: 'unicorn.components.MaskedInputScreen'},
    ],
  },
  Native: {
    title: 'Native',
    screens: [
      {title: 'Highlight Overlay', tags: 'native overlay', screen: 'unicorn.nativeComponents.HighlightOverlayViewScreen'},
      {title: 'Wheel Picker', tags: 'wheel picker', screen: 'unicorn.nativeComponents.WheelPickerViewScreen'},
      {title: 'SafeArea Sapcer', tags: 'native safe area', screen: 'unicorn.nativeComponents.SafeAreaSpacerViewScreen'},
    ],
  },
  Interactable: {
    title: 'Interactable',
    screens: [{title: 'Drawer', tags: 'interactable drawer', screen: 'unicorn.interactableComponents.DrawerScreen'}],
  },
  Screens: {
    title: 'Screens',
    screens: [
      {title: 'Loading Screen', tags: 'loading screen', screen: 'unicorn.screens.LoadingScreen'},
      {title: 'Modal Screen', tags: 'modal topbar screen', screen: 'unicorn.screens.ModalScreen'},
      {title: 'State Screen', tags: 'empty state screen', screen: 'unicorn.screens.EmptyStateScreen'},
    ],
  },
  Lists: {
    title: 'Lists',
    screens: [
      {title: 'Basic List', tags: 'basic list', screen: 'unicorn.lists.BasicListScreen'},
      {title: 'Contacts List', tags: 'list contacts', screen: 'unicorn.lists.ContactsListScreen'},
      {title: 'Conversation List', tags: 'list conversation', screen: 'unicorn.lists.ConversationListScreen'},
    ],
  },
  Animations: {
    title: 'Animations',
    screens: [
      {title: 'Animated Image', tags: 'animated image', screen: 'unicorn.components.AnimatedImageScreen'},
      {title: 'List Animations', tags: 'animated card', screen: 'unicorn.animations.ListAnimationsScreen'},
      {title: 'Card Animations', tags: 'animated card', screen: 'unicorn.animations.CardAnimationsScreen'},
      {title: 'Card Scanner', tags: 'card scanner process', screen: 'unicorn.animations.CardScannerScreen'},
      {title: 'ProgressBar', tags: 'progress bar animated', screen: 'unicorn.animations.ProgressBarScreen'},
    ],
  },
  Incubator: {
    title: 'Incubator',
    screens: [
      {title: 'TabBarController', tags: 'tabbar controller native', screen: 'unicorn.incubator.TabControllerScreen'},
    ]
  },
  Examples: {
    title: 'Examples',
    screens: [
      {title: 'Apple Music', tags: 'apple music demo screen', screen: 'unicorn.examples.AppleMusic'},
      {title: 'List Actions', tags: 'list actions demo screen', screen: 'unicorn.examples.ListActionsScreen'}
    ],
  },
};
