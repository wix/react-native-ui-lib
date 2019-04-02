import {Navigation} from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import './componentScreens';
import './nativeComponentScreens';
import './interactableComponentScreens';
import './componentScreenScreens';
import './listScreens';
import './styleScreens';
import './animationScreens';
import './realExamples';
import './wrapperScreens';
import './incubatorScreens';

import MainScreen from './MainScreen';
import Playground from './PlaygroundScreen';
import SettingsScreen from './SettingsScreen';
import CustomScreen from './CustomScreen';


export function registerScreens() {
  Navigation.registerComponent('unicorn.MainScreen', () => MainScreen);
  Navigation.registerComponent('unicorn.PlaygroundScreen', () => gestureHandlerRootHOC(Playground));
  Navigation.registerComponent('unicorn.Settings', () => SettingsScreen);
  Navigation.registerComponent('unicorn.CustomScreen', () => CustomScreen);
}
