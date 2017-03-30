import {Navigation} from 'react-native-navigation';
import EmptyStateScreen from './EmptyStateScreen';
import LoadingScreen from './LoaderScreen';

Navigation.registerComponent('unicorn.screens.EmptyStateScreen', () => EmptyStateScreen);
Navigation.registerComponent('unicorn.screens.LoadingScreen', () => LoadingScreen);
