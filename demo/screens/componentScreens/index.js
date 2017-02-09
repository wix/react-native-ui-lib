import {Navigation} from 'react-native-navigation';
import ButtonsScreen from './ButtonsScreen';
import BadgesScreen from './BadgesScreen';

Navigation.registerComponent('example.components.ButtonsScreen', () => ButtonsScreen);
Navigation.registerComponent('example.components.BadgesScreen', () => BadgesScreen);
