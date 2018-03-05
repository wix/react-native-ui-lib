import {Navigation} from 'react-native-navigation';
import HighlightOverlayViewScreen from './HighlightOverlayViewScreen';
import SafeAreaSpacerViewScreen from './SafeAreaSpacerViewScreen';

Navigation.registerComponent('unicorn.nativeComponents.HighlightOverlayViewScreen', () => HighlightOverlayViewScreen);
Navigation.registerComponent('unicorn.nativeComponents.SafeAreaSpacerViewScreen', () => SafeAreaSpacerViewScreen);
