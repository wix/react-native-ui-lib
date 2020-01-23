import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

Navigation.registerComponent('unicorn.incubator.TabControllerScreen', () => gestureHandlerRootHOC(require('./TabControllerScreen').default));
Navigation.registerComponent('unicorn.incubator.TouchableOpacityScreen', () =>
  gestureHandlerRootHOC(require('./TouchableOpacityScreen').default));
