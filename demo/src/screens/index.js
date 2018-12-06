import {Navigation} from 'react-native-navigation';
import './componentScreens';
import './nativeComponentScreens';
import './interactableComponentScreens';
import './componentScreenScreens';
import './listScreens';
import './styleScreens';
import './animationScreens';
import './realExamples';
import './wrapperScreens';

import MainScreen from './MainScreen';
import Playground from './PlaygroundScreen';
import SettingsScreen from './SettingsScreen';


export function registerScreens() {
  Navigation.registerComponent('unicorn.MainScreen', () => MainScreen);
  Navigation.registerComponent('unicorn.PlaygroundScreen', () => Playground);
  Navigation.registerComponent('unicorn.Settings', () => SettingsScreen);
}
