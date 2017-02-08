import {Navigation} from 'react-native-navigation';
import './styleScreens';
import MainScreen from './MainScreen';

Navigation.registerComponent('example.MainScreen', () => MainScreen);
