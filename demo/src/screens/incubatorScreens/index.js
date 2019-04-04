import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import TabControllerScreen from './TabControllerScreen';

Navigation.registerComponent('unicorn.incubator.TabControllerScreen', () => gestureHandlerRootHOC(TabControllerScreen));
