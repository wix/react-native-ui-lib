import {Navigation} from 'react-native-navigation';
import EmptyStateScreen from './EmptyStateScreen';
import LoadingScreen from './LoaderScreen';

Navigation.registerComponent('example.screens.EmptyStateScreen', () => EmptyStateScreen);
Navigation.registerComponent('example.screens.LoadingScreen', () => LoadingScreen);
