import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export function registerScreens(registrar) {
  registrar('unicorn.examples.AppleMusic', () => require('./AppleMusic').default);
  registrar('unicorn.examples.General', () => require('./General').default);
  registrar('unicorn.examples.General.Example1', () => require('./General/example1').default);
  registrar('unicorn.examples.Pinterest', () =>
    gestureHandlerRootHOC(require('./Pinterest').default));
  registrar('unicorn.examples.ListActionsScreen',
    () => require('./ListActions/ListActionsScreen').default);
}
