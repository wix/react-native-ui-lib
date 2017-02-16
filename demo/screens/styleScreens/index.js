import {Navigation} from 'react-native-navigation';
import ColorsScreen from './ColorsScreen';
import BorderRadiusesScreen from './BorderRadiusesScreen';
import TypographyScreen from './TypographyScreen';
import ShadowsScreen from './ShadowsScreen';

Navigation.registerComponent('example.style.BorderRadiusesScreen', () => BorderRadiusesScreen);
Navigation.registerComponent('example.style.ColorsScreen', () => ColorsScreen);
Navigation.registerComponent('example.style.TypographyScreen', () => TypographyScreen);
Navigation.registerComponent('example.style.ShadowsScreen', () => ShadowsScreen);
