import {Navigation} from 'react-native-navigation';

Navigation.registerComponent('unicorn.animations.CardScannerScreen', () => require('./CardScannerScreen').default);
Navigation.registerComponent('unicorn.animations.CardAnimationsScreen', () => require('./CardAnimationsScreen').default);
Navigation.registerComponent('unicorn.animations.ListAnimationsScreen', () => require('./ListAnimationsScreen').default);
Navigation.registerComponent('unicorn.animations.ProgressBarScreen', () => require('./ProgressBarScreen').default);
