import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export function registerScreens(registrar) {
  registrar('unicorn.components.IncubatorChipsInputScreen', () => require('./IncubatorChipsInputScreen').default);
  registrar('unicorn.incubator.TouchableOpacityScreen', () =>
    gestureHandlerRootHOC(require('./TouchableOpacityScreen').default));
  registrar('unicorn.incubator.IncubatorDialogScreen', () => require('./IncubatorDialogScreen').default);
  registrar('unicorn.components.IncubatorExpandableOverlayScreen', () => require('./IncubatorExpandableOverlayScreen').default);
  registrar('unicorn.components.IncubatorTextFieldScreen', () => require('./IncubatorTextFieldScreen').default);
  registrar('unicorn.components.IncubatorToastScreen', () => require('./IncubatorToastScreen').default);
  registrar('unicorn.incubator.PanViewScreen', () => require('./PanViewScreen').default);
  registrar('unicorn.incubator.WheelPickerScreen', () => gestureHandlerRootHOC(require('./WheelPickerScreen').default));
}
