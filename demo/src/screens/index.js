import {Navigation} from 'react-native-navigation';
import './componentScreens';
import './componentScreenScreens';
import './listScreens';
import './styleScreens';
import './animationScreens';
import './PlaygroundScreen';
import MainScreen from './MainScreen';

Navigation.registerComponent('unicorn.MainScreen', () => MainScreen);
