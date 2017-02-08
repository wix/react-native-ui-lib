import {Navigation} from 'react-native-navigation';
import './styleScreens';
import './componentScreens';
import MainScreen from './MainScreen';

Navigation.registerComponent('example.MainScreen', () => MainScreen);
