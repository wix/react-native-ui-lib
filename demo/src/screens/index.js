import {Navigation} from 'react-native-navigation';
import './componentScreens';
import './nativeComponentScreens';
import './componentScreenScreens';
import './listScreens';
import './styleScreens';
import './animationScreens';
import './realExamples';
import './wrapperScreens';
import './PlaygroundScreen';
import MainScreen from './MainScreen';

Navigation.registerComponent('unicorn.MainScreen', () => MainScreen);
