import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export function registerScreens(registrar) {

  require('./commonScreens').registerScreens(registrar);
  require('./componentScreens').registerScreens(registrar);
  require('./foundationScreens').registerScreens(registrar);
  require('./nativeComponentScreens').registerScreens(registrar);
  require('./animationScreens').registerScreens(registrar);
  require('./realExamples').registerScreens(registrar);
  require('./incubatorScreens').registerScreens(registrar);

  registrar('unicorn.MainScreen', () => require('./MainScreen').default);
  registrar('unicorn.PlaygroundScreen', () => gestureHandlerRootHOC(require('./PlaygroundScreen').default));
  registrar('unicorn.Settings', () => require('./SettingsScreen').default);
  registrar('unicorn.CustomScreen', () => require('./CustomScreen').default);
}
