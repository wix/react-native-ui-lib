export function registerScreens(registrar) {
  // load demo app presets
  require('../configurations').loadDemoConfigurations();

  require('./componentScreens').registerScreens(registrar);
  require('./foundationScreens').registerScreens(registrar);
  require('./nativeComponentScreens').registerScreens(registrar);
  require('./realExamples').registerScreens(registrar);
  require('./incubatorScreens').registerScreens(registrar);

  registrar('unicorn.MainScreen', () => require('./MainScreen').default);
  registrar('unicorn.PlaygroundScreen', () => require('./PlaygroundScreen').default);
  registrar('unicorn.Settings', () => require('./SettingsScreen').default);

  registrar('unicorn.MotionMainScreen', () => require('./MotionMainScreen').default);
  registrar('unicorn.MotionSpringsPlayground', () => require('./MotionSpringsPlayground').default);
}
