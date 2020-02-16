import {Navigation} from 'react-native-navigation';

Navigation.registerComponent('unicorn.screens.EmptyStateScreen', () => require('./EmptyStateScreen').default);
Navigation.registerComponent('unicorn.screens.LoadingScreen', () => require('./LoadingScreen').default);
Navigation.registerComponent('unicorn.screens.ModalScreen', () => require('./ModalScreen').default);
