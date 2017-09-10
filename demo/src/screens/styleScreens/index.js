import {Navigation} from 'react-native-navigation';
import ColorsScreen from './ColorsScreen';
import BorderRadiusesScreen from './BorderRadiusesScreen';
import TypographyScreen from './TypographyScreen';
import ShadowsScreen from './ShadowsScreen';
import SpacingsScreen from './SpacingsScreen';

Navigation.registerComponent('unicorn.style.BorderRadiusesScreen', () => BorderRadiusesScreen);
Navigation.registerComponent('unicorn.style.ColorsScreen', () => ColorsScreen);
Navigation.registerComponent('unicorn.style.TypographyScreen', () => TypographyScreen);
Navigation.registerComponent('unicorn.style.ShadowsScreen', () => ShadowsScreen);
Navigation.registerComponent('unicorn.style.SpacingsScreen', () => SpacingsScreen);
