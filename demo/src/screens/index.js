import {Navigation} from 'react-native-navigation';
import './componentScreens';
import './nativeComponentScreens';
import './componentScreenScreens';
import './listScreens';
import './styleScreens';
import './animationScreens';
import './realExamples';
import './wrapperScreens';

import Playground from './PlaygroundScreen';
import MainScreen from './MainScreen';

export function registerScreens() {
  Navigation.registerComponent('unicorn.MainScreen', () => MainScreen);
  Navigation.registerComponent('unicorn.PlaygroundScreen', () => Playground);
}
