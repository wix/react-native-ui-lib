import {Navigation} from 'react-native-navigation';
import './componentScreens';
import './componentScreenScreens';
import './listScreens';
import './styleScreens';
import './PlaygroundScreen';
import MainScreen from './MainScreen';

Navigation.registerComponent('example.MainScreen', () => MainScreen);
