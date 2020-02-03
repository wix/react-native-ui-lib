import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

Navigation.registerComponent('unicorn.examples.AppleMusic', () => require('./AppleMusic').default);
Navigation.registerComponent('unicorn.examples.Pinterest', () => gestureHandlerRootHOC(require('./Pinterest').default));
Navigation.registerComponent('unicorn.examples.ListActionsScreen', () => require('./ListActions/ListActionsScreen').default);
