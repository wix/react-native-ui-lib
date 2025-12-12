export function registerScreens(registrar) {
  registrar('unicorn.nativeComponents.DynamicFontsScreen', () => require('./DynamicFontsScreen').default);
  registrar('unicorn.nativeComponents.HighlightOverlayViewScreen', () => require('./HighlightOverlayViewScreen').default);
  registrar('unicorn.nativeComponents.SafeAreaSpacerViewScreen', () => require('./SafeAreaSpacerViewScreen').default);
  registrar('unicorn.nativeComponents.KeyboardTrackingViewScreen', () => require('./KeyboardTrackingViewScreen').default);
  registrar('unicorn.nativeComponents.KeyboardAccessoryViewScreen', () => require('./keyboardAccessory/KeyboardAccessoryViewScreen').default);
}
