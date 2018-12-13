import {Navigation} from 'react-native-navigation';
import CardScannerScreen from './CardScannerScreen';
import ProgressBarScreen from './ProgressBarScreen';
import CardAnimationsScreen from './CardAnimationsScreen';

Navigation.registerComponent('unicorn.animations.CardScannerScreen', () => CardScannerScreen);
Navigation.registerComponent('unicorn.animations.CardAnimationsScreen', () => CardAnimationsScreen);
Navigation.registerComponent('unicorn.animations.ProgressBarScreen', () => ProgressBarScreen);
