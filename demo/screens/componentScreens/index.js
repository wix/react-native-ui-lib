import {Navigation} from 'react-native-navigation';
import AvatarsScreen from './AvatarsScreen';
import ButtonsScreen from './ButtonsScreen';
import BadgesScreen from './BadgesScreen';
import ConnectionStatusBarScreen from './ConnectionStatusBarScreen';
import PageControlScreen from './PageControlScreen';

Navigation.registerComponent('example.components.AvatarsScreen', () => AvatarsScreen);
Navigation.registerComponent('example.components.ButtonsScreen', () => ButtonsScreen);
Navigation.registerComponent('example.components.BadgesScreen', () => BadgesScreen);
Navigation.registerComponent('example.components.ConnectionStatusBar', () => ConnectionStatusBarScreen);
Navigation.registerComponent('example.components.PageControlScreen', () => PageControlScreen);
