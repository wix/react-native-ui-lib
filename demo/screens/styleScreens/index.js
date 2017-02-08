import {Navigation} from 'react-native-navigation';
import ColorsScreen from './ColorsScreen';
import TypographyScreen from './TypographyScreen';

Navigation.registerComponent('example.style.ColorsScreen', () => ColorsScreen);
Navigation.registerComponent('example.style.TypographyScreen', () => TypographyScreen);
