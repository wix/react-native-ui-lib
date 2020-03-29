export function registerScreens(registrar) {
  registrar('unicorn.nativeComponents.HighlightOverlayViewScreen', () => require('./HighlightOverlayViewScreen').default);
  registrar('unicorn.nativeComponents.SafeAreaSpacerViewScreen', () => require('./SafeAreaSpacerViewScreen').default);
  registrar('unicorn.nativeComponents.WheelPickerViewScreen', () => require('./WheelPickerViewScreen').default);
  registrar('unicorn.nativeComponents.KeyboardTrackingViewScreen', () => require('./KeyboardTrackingViewScreen').default);
  registrar('unicorn.nativeComponents.KeyboardInputViewScreen', () => require('./keyboardInput/KeyboardInputViewScreen').default);
}

