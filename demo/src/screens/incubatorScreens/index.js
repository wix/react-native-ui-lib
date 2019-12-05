import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import TabControllerScreen from './TabControllerScreen';
import TouchableOpacityScreen from './TouchableOpacityScreen';

Navigation.registerComponent('unicorn.incubator.TabControllerScreen', () => gestureHandlerRootHOC(TabControllerScreen));
Navigation.registerComponent('unicorn.incubator.TouchableOpacityScreen', () =>
  gestureHandlerRootHOC(TouchableOpacityScreen));
