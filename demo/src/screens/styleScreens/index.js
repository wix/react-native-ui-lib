import {Navigation} from 'react-native-navigation';
import ColorsScreen from './ColorsScreen';
import BorderRadiusesScreen from './BorderRadiusesScreen';
import TypographyScreen from './TypographyScreen';
import ShadowsScreen from './ShadowsScreen';

Navigation.registerComponent('unicorn.style.BorderRadiusesScreen', () => BorderRadiusesScreen);
Navigation.registerComponent('unicorn.style.ColorsScreen', () => ColorsScreen);
Navigation.registerComponent('unicorn.style.TypographyScreen', () => TypographyScreen);
Navigation.registerComponent('unicorn.style.ShadowsScreen', () => ShadowsScreen);
