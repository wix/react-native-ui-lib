export function registerScreens(registrar) {
  registrar('unicorn.components.IncubatorCalendarScreen', () => require('./IncubatorCalendarScreen').default);
  registrar('unicorn.incubator.TouchableOpacityScreen', () => require('./TouchableOpacityScreen').default);
  registrar('unicorn.components.IncubatorExpandableOverlayScreen', () => require('./IncubatorExpandableOverlayScreen').default);
  registrar('unicorn.components.IncubatorToastScreen', () => require('./IncubatorToastScreen').default);
  registrar('unicorn.incubator.PanViewScreen', () => require('./PanViewScreen').default);
  registrar('unicorn.components.IncubatorSliderScreen', () => require('./IncubatorSliderScreen').default);
}
