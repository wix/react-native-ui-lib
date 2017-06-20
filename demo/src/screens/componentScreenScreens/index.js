import {Navigation} from 'react-native-navigation';
import EmptyStateScreen from './EmptyStateScreen';
import LoadingScreen from './LoadingScreen';
import ModalScreen from './ModalScreen';

Navigation.registerComponent('unicorn.screens.EmptyStateScreen', () => EmptyStateScreen);
Navigation.registerComponent('unicorn.screens.LoadingScreen', () => LoadingScreen);
Navigation.registerComponent('unicorn.screens.ModalScreen', () => ModalScreen);
