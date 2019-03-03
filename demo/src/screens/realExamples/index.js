import {Navigation} from 'react-native-navigation';
import AppleMusic from './AppleMusic';
import ListActionsScreen from './ListActions/ListActionsScreen';


Navigation.registerComponent('unicorn.examples.AppleMusic', () => AppleMusic);
Navigation.registerComponent('unicorn.examples.ListActionsScreen', () => ListActionsScreen);
