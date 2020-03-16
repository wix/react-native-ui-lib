import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export function registerScreens(registrar) {
  registrar('unicorn.incubator.TouchableOpacityScreen', () =>
    gestureHandlerRootHOC(require('./TouchableOpacityScreen').default));
}
