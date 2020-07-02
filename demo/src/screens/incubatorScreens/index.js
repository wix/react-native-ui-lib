import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export function registerScreens(registrar) {
  registrar('unicorn.incubator.TouchableOpacityScreen', () =>
    gestureHandlerRootHOC(require('./TouchableOpacityScreen').default)
  );
  registrar('unicorn.incubator.WheelPickerScreen', () =>
    gestureHandlerRootHOC(require('./WheelPickerScreen').default)
  );
}
