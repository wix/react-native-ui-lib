import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export function registerScreens(registrar) {
  registrar('unicorn.incubator.TouchableOpacityScreen', () =>
    gestureHandlerRootHOC(require('./TouchableOpacityScreen').default));
  registrar('unicorn.components.IncubatorExpandableOverlayScreen', () => require('./IncubatorExpandableOverlayScreen').default);
  registrar('unicorn.components.IncubatorTextFieldScreen', () => require('./IncubatorTextFieldScreen').default);
  registrar('unicorn.incubator.WheelPickerScreen', () => gestureHandlerRootHOC(require('./WheelPickerScreen').default));
  registrar('unicorn.incubator.PanViewScreen', () => require('./PanViewScreen').default);
}
